import { GraphQLScalarType } from 'graphql';

const serializeISO8601 = (value) => {
  return value.toISOString(); // value comes from resolvers
};

export default new GraphQLScalarType({
  name: 'Date',
  description: 'Date type',
  serialize: serializeISO8601,
});
