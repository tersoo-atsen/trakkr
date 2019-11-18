import { activityNames } from '../../utils/activityNames';

const saveAuditLog = async (action, model, sequelize) => {
  await sequelize.models.Activity.create({
    userId: model.userId,
    itemId: model.id,
    name: action,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
};

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
  };

  Item.afterCreate(async (newItem) => {
    await saveAuditLog(activityNames.ADD, newItem, sequelize);
  });

  Item.afterUpdate(async (updatedItem) => {
    await saveAuditLog(activityNames.UPDATE, updatedItem, sequelize);
  });

  Item.beforeBulkDestroy(async (res) => {
    const foundItem = await sequelize.models.Item.findByPk(res.where.id);
    saveAuditLog(activityNames.DELETE, foundItem, sequelize);
  });
  return Item;
};

export default item;
