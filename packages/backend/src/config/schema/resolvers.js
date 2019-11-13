import { AuthenticationError, UserInputError } from 'apollo-server';
import { combineResolvers } from 'graphql-resolvers';

import { createToken } from '../../utils/token';
import { validatePassword } from '../../utils/password';
import { isAuthenticated, isItemOwner } from './authorization';

const resolvers = {
  Activity: {
    async item(item) {
      return item.getItem()
    },
    async user(user) {
      return user.getUser()
    },
  },
  Item: {
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
    getUserItems: async (root, { userId }, { models }) => {
      return models.Item.findAll({
        where: { userId },
      })
    },
    getUserActivities: async (root, { userId }, { models }) => {
      return models.Activity.findAll({
        where: { userId },
      })
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
          'No user found with this login credentials.',
        );
      }

      const isValid = validatePassword(password, user.password);

      if (!isValid) {
        throw new AuthenticationError('Invalid password.');
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
      }, { models, me }) => {
        return models.Item.create({
          userId: me.id,
          name,
          description,
          value,
          imageUrl,
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
  },
};

export default resolvers
