import jwt from 'jsonwebtoken';

export const createToken = async (user, secret, expiresIn) => {
  const {
    id, email,
  } = user;
  return jwt.sign(
    { id, email },
    secret,
    { expiresIn },
  );
};
