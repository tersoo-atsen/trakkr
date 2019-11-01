const activity = (sequelize, DataTypes) => {
  const Activity = sequelize.define('Activity', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {});

  Activity.associate = (models) => {
    Activity.belongsTo(models.User, {
      foreignKey: {
        name: 'userId',
        allowNull: false,
      },
      onDelete: 'CASCADE',
    })
    Activity.belongsTo(models.Item, {
      foreignKey: {
        name: 'itemId',
        allowNull: false,
      },
      onDelete: 'CASCADE',
    })
  };

  return Activity;
};

export default activity;
