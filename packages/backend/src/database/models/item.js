import { event } from '../../utils/event';

const buildParams = (action, instance, sequelize, options) => {
  let fields = null;
  if (options !== null && options.fields) {
    options.fields.pop();
    fields = options.fields;
  }
  const parameters = {
    action,
    model: instance,
    sequelize,
    fields,
  };
  return parameters;
}
const saveAuditLog = async (parameters) => {
  const {
    action, model, sequelize, fields,
  } = parameters;
  await sequelize.models.Activity.create({
    userId: model.userId,
    itemId: model.id,
    name: action,
    fields,
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
    location: {
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
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: {
          args: true,
          msg: 'Quantity must be a valid integer.',
        },
        notEmpty: {
          args: true,
          msg: 'Quantity cannot be empty.',
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

  // DEV: We don't support bulk actions due to not knowing previous/current info for models
  Item.beforeBulkCreate(() => {
    throw new Error('Audit logging not supported for bulk creation; either add support or use `create` directly');
  });

  Item.beforeBulkUpdate(() => {
    throw new Error('Audit logging not supported for bulk updates; either add support or use `create` directly');
  });

  Item.afterCreate(async (newItem, options) => {
    const parameters = buildParams(event.ADD, newItem, sequelize, options);
    await saveAuditLog(parameters);
  });

  Item.afterUpdate(async (updatedItem, options) => {
    const parameters = buildParams(event.UPDATE, updatedItem, sequelize, options);
    await saveAuditLog(parameters);
  });

  Item.beforeBulkDestroy(async (options) => {
    const foundItem = await sequelize.models.Item.findByPk(options.where.id);
    const parameters = buildParams(event.DELETE, foundItem, sequelize, options);
    saveAuditLog(parameters);
  });
  return Item;
};

export default item;
