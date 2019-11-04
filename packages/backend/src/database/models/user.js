const user = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    userName: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
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
      where: { username: login },
    });
    if (!foundUser) {
      foundUser = await User.findOne({
        where: { email: login },
      });
    }
    return foundUser;
  };

  return User;
};

export default user;
