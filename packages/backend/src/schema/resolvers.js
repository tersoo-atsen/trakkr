import { AuthenticationError, UserInputError } from 'apollo-server';
import { combineResolvers } from 'graphql-resolvers';
import Sequelize from 'sequelize';

import { createToken } from '../utils/token';
import { validatePassword } from '../utils/password';
import { isAuthenticated, isItemOwner } from './authorization';
import { find } from '../utils/requests';
import Date from './scalar/Date';

const { Op } = Sequelize;

const resolvers = {
  Date,
  Activity: {
    async item(item) {
      return item.getItem()
    },
    async user(user) {
      return user.getUser()
    },
  },
  User: {
    async items(items) {
      return items.getUserItems()
    },
  },
  Query: {
    getItem: async (root, { id }, { models }) => {
      return models.Item.findByPk(id)
    },
    getUser: async (root, { id }, { models }) => {
      return models.User.findByPk(id)
    },
    getUserItems: async (root, { userId, page = 0, perPage = 5 }, { models }) => {
      const searchQuery = {
        where: { userId },
      };
      const limit = perPage + 1;
      const offset = (page - 1) < 1 ? 0 : ((page - 1) * perPage);
      const { count, rows } = await models.Item.findAndCountAll({
        order: [['createdAt', 'DESC']],
        limit,
        offset,
        ...searchQuery,
      });
      const pages = Math.ceil(count / perPage);
      const hasNextPage = rows.length > perPage;
      const hasPrevPage = page > 1 && page <= pages;
      const items = hasNextPage ? rows.slice(0, -1) : rows;

      return {
        items,
        pageInfo: {
          pages,
          hasNextPage,
          hasPrevPage,
        },
      };
    },
    getUserActivities: async (root, { userId }, { models }) => {
      return find(models.Activity, userId)
    },
    searchItems: async (root, { search }, { models }) => {
      return models.Item.findAll({
        where: {
          [Op.or]: [
            {
              name: {
                [Op.like]: `${search.charAt(0).toUpperCase() + search.slice(1)}%`,
              },
            },
            {
              name: {
                [Op.like]: `${search}%`,
              },
            },
            {
              name: {
                [Op.like]: `%${search}%`,
              },
            },
          ],
        },
      });
    },
  },
  Mutation: {
    signUp: async (
      root,
      {
        firstName, lastName, email, password, userName,
      },
      { secret, models }) => {
      const user = models.User.create({
        firstName,
        lastName,
        userName,
        email,
        password,
      })

      return { token: createToken(user, secret, '1h'), user };
    },
    signIn: async (root, { login, password }, { secret, models }) => {
      const user = await models.User.findByLogin(login);

      if (!user) {
        throw new UserInputError(
          'Invalid login. Please try again.',
        );
      }

      const isValid = validatePassword(password, user.password);

      if (!isValid) {
        throw new AuthenticationError('Login failed. Please try again.');
      }
      return { token: createToken(user, secret, '1h'), user };
    },
    updateUser: combineResolvers(
      isAuthenticated,
      async (root, { firstName, lastName, userName }, { models, me }) => {
        const user = await models.User.findByPk(me.id);
        return user.update({ userName, firstName, lastName });
      },
    ),
    createItem: combineResolvers(
      isAuthenticated,
      async (root, {
        name,
        description,
        value,
        imageUrl,
        location,
        quantity,
      }, { models, me }) => {
        return models.Item.create({
          userId: me.id,
          name,
          description,
          value,
          imageUrl,
          location,
          quantity,
        })
      },
    ),
    deleteItem: combineResolvers(
      isAuthenticated,
      isItemOwner,
      async (root, { id }, { models }) => {
        return models.Item.destroy({ where: { id } });
      },
    ),
    updateItem: async (root, {
      id, name, description, quantity, value, location,
    }, { models }) => {
      const item = await models.Item.findByPk(id);
      if (!item) {
        return new Error('Item not found!');
      }
      return item.update(
        {
          name, description, quantity, value, location,
        },
      );
    },
  },
};

export default resolvers
