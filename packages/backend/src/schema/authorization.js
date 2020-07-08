import { ForbiddenError } from 'apollo-server';
import { skip } from 'graphql-resolvers';

export const isAuthenticated = (root, args, { me }) => {
  return me ? skip : new ForbiddenError('You are not signed in.')
};

export const isItemOwner = async (root, { id }, { models, me }) => {
  const item = await models.Item.findByPk(id);
  if (!item) {
    throw new Error('Item not found!');
  }
  if (item.userId !== me.id) {
    throw new ForbiddenError('You are cannnot perform this action.');
  }
  return skip;
};
