export default {
  up: (queryInterface/* , Sequelize */) => {
    return queryInterface.bulkInsert('Items', [{
      name: 'Statue',
      description: 'Statue of great value',
      imageUrl: 'trakkr/painting01',
      value: 1000000,
      quantity: 2,
      location: 'Lagos',
      userId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Painting',
      description: 'Painting of great value',
      imageUrl: 'trakkr/statue01',
      value: 50000,
      quantity: 1,
      location: 'Sokoto',
      userId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Sculpture',
      description: 'Sculpture of great value',
      imageUrl: 'trakkr/statue02',
      value: 1020000,
      quantity: 1,
      location: 'Ibadan',
      userId: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  down: (queryInterface/* , Sequelize */) => {
    return queryInterface.bulkDelete('Items', null, {});
  },
};
