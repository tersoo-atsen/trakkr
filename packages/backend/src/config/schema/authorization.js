import { ForbiddenError } from 'apollo-server';
import { skip } from 'graphql-resolvers';

export const isAuthenticated = (root, args, { me }) => {
  return me ? skip : new ForbiddenError('Not authenticated as user.')
};

export const isItemOwner = async (root, { id }, { models, me }) => {
  const item = await models.Item.findByPk(id);
  if (!item) {
    throw new Error('Item not found!');
  }

  if (item.userId !== me.id) {
    throw new ForbiddenError('Not authenticated as owner.');
  }

  return skip;
};
