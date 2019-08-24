
const user = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING
  }, {});

  User.getByKey = (key) => User.findOne({
    where: key
  });
  return User;
};
export default user;
