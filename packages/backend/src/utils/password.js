import bcrypt from 'bcrypt';

export const generatePasswordHash = (password) => {
  const saltRounds = 10;
  return bcrypt.hashSync(password, saltRounds);
};

export const validatePassword = (password, hash_password) => {
  return bcrypt.compareSync(password, hash_password);
};
