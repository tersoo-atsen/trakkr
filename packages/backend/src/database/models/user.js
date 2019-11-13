import { generatePasswordHash } from '../../utils/password';

const user = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'First name cannot be empty.',
        },
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Last name cannot be empty.',
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Email cannot be empty.',
        },
        isEmail: {
          args: true,
          msg: 'You have provided an invalid email.',
        },
      },
    },
    userName: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Username cannot be empty.',
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Password cannot be empty.',
        },
        len: {
          args: [7, 20],
          msg: 'Password must be between 7 and 20 chars long.',
        },
      },
    },
  }, {});

  User.associate = (models) => {
    User.hasMany(models.Item, {
      foreignKey: 'userId',
      as: 'userItems',
    })
    User.hasMany(models.Activity, {
      foreignKey: 'userId',
      as: 'userActivities',
    })
  };

  User.findByLogin = async (login) => {
    let foundUser = await User.findOne({
      where: { userName: login },
    });
    if (!foundUser) {
      foundUser = await User.findOne({
        where: { email: login },
      });
    }
    return foundUser;
  };

  User.beforeCreate(async (newUser) => {
    newUser.password = generatePasswordHash(newUser.password);
  });

  return User;
};

export default user;
