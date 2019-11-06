import { AuthenticationError, UserInputError, ForbiddenError } from 'apollo-server';

import { createToken } from '../../utils/token';
import { validatePassword } from '../../utils/password';

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
    createItem: async (root, {
      name,
      description,
      value,
      imageUrl,
    }, { me, models }) => {
      if (!me) {
        throw new ForbiddenError('Not authenticated as user.');
      }
      return models.Item.create({
        userId: me.id,
        name,
        description,
        value,
        imageUrl,
      })
    },
    deleteItem: async (root, { id }, { models/* , me */ }) => {
      // if (!me) {
      //   throw new ForbiddenError('Not authenticated as user.');
      // }
      // const item = await models.Item.findById(id)

      // if (!item) {
      //   throw new Error('No item found')
      // }

      // if (me.id !== item.userId) {
      //   throw new Error('You can only edit the posts you created!')
      // }

      return models.Item.destroy({ where: { id } });
    },
  },
};

export default resolvers
