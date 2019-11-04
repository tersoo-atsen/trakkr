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
    createUser: async (root, {
      firstName,
      lastName,
      email,
      password,
    }, { models }) => {
      return models.User.create({
        firstName,
        lastName,
        email,
        password,
      })
    },
    createItem: async (root, {
      userId,
      name,
      description,
      value,
      imageUrl,
    }, { models }) => {
      return models.Item.create({
        userId,
        name,
        description,
        value,
        imageUrl,
      })
    },
    deleteItem: async (root, { id }, { models }) => {
      return models.Item.destroy({ where: { id } });
    },
  },
};

export default resolvers
