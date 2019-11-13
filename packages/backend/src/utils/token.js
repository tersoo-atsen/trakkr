import jwt from 'jsonwebtoken';

export const createToken = async (user, secret, expiresIn) => {
  const {
    id, email, username, role,
  } = user;
  return jwt.sign(
    {
      id, email, username, role,
    },
    secret,
    {
      expiresIn,
    },
  );
};
