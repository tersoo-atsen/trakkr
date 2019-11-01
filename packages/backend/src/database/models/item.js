const item = (sequelize, DataTypes) => {
  const Item = sequelize.define('Item', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING,
    },
    value: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
