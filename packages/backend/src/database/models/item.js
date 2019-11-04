const item = (sequelize, DataTypes) => {
  const Item = sequelize.define('Item', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Name cannot be empty.',
        },
      },
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Description cannot be empty.',
        },
      },
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Image URL cannot be empty.',
        },
      },
    },
    value: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: {
          args: true,
          msg: 'Value must be a valid integer.',
        },
        notEmpty: {
          args: true,
          msg: 'Value cannot be empty.',
        },
      },
    },
  }, {});

  Item.associate = (models) => {
    Item.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    })
    Item.hasMany(models.Activity, {
      foreignKey: 'itemId',
      as: 'itemActivities',
    })
  };

  return Item;
};

export default item;
