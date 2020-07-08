const activity = (sequelize, DataTypes) => {
  const Activity = sequelize.define('Activity', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Activity name cannot be empty.',
        },
      },
    },
    fields: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: null,
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
    })
  };

  return Activity;
};

export default activity;
