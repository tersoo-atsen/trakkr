export default {
  up: (queryInterface/* , Sequelize */) => {
    return queryInterface.bulkInsert('Activities', [{
      name: 'Add',
      userId: 1,
      itemId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Update',
      userId: 1,
      itemId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Update',
      userId: 2,
      itemId: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  down: (queryInterface/* , Sequelize */) => {
    return queryInterface.bulkDelete('Activities', null, {});
  },
};
