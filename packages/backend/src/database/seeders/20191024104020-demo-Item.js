export default {
  up: (queryInterface/* , Sequelize */) => {
    return queryInterface.bulkInsert('Items', [{
      name: 'Statue',
      description: 'Statue of great value',
      imageUrl: 'some/path/to/image',
      value: 1000000,
      location: 'Lagos',
      userId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Painting',
      description: 'Painting of great value',
      imageUrl: 'some/path/to/painting',
      value: 50000,
      location: 'Sokoto',
      userId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Sculpture',
      description: 'Sculpture of great value',
      imageUrl: 'some/path/to/sculpture',
      value: 1020000,
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
