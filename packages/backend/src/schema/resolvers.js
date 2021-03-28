import { AuthenticationError, UserInputError } from 'apollo-server';
import { combineResolvers } from 'graphql-resolvers';
import Sequelize from 'sequelize';
import cloudinary from 'cloudinary';

import {
  createToken, validatePassword, find, getDate,
} from '../utils';
import { isAuthenticated, isItemOwner } from './authorization';
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
      return find(models.Item, userId, page, perPage);
    },
    getUserActivities: async (root, { userId, page = 0, perPage = 5 }, { models }) => {
      return find(models.Activity, userId, page, perPage);
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
    getSignature: async (root, { publicId }) => {
      const timestamp = Math.round(getDate() / 1000);
      const signature = cloudinary.v2.utils.api_sign_request({
        folder: process.env.CLOUDINARY_FOLDER,
        public_id: publicId,
        upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET,
        timestamp,
        invalidate: true,
      }, process.env.CLOUDINARY_API_SECRET);

      return { signature, timestamp }
    },
    getUserStats: async (root, args, { models, me }) => {
      const items = await models.Item.findAll({
        where: { userId: me.id },
        attributes: [
          [Sequelize.fn('sum', Sequelize.col('value')), 'totalValue'],
          [Sequelize.fn('sum', Sequelize.col('quantity')), 'totalQuantity'],
          [Sequelize.fn('count', Sequelize.col('name')), 'itemCount']],
        group: ['userId'],
        raw: true,
      });
      const hasItems = items.length > 0;

      return {
        itemCount: hasItems ? items[0].itemCount : 0,
        totalQuantity: hasItems ? items[0].totalQuantity : 0,
        totalValue: hasItems ? items[0].totalValue : 0,
      };
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
        avatarUrl: 'trakkr/default-avatar',
      })

      return { token: createToken(user, secret, '240h'), user };
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
      return { token: createToken(user, secret, '240h'), user };
    },
    updateUser: combineResolvers(
      isAuthenticated,
      async (root, {
        firstName, lastName, userName, avatarUrl,
      }, { models, me }) => {
        const user = await models.User.findByPk(me.id);
        return user.update({
          userName, firstName, lastName, avatarUrl,
        });
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
