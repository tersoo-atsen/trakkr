import jwt from 'jsonwebtoken';
import { AuthenticationError } from 'apollo-server-express';

export const getMe = async (request, secret) => {
  const auth = request.headers.authorization;
  if (!auth) return;
  const token = auth.split('Bearer ')[1];

  /* istanbul ignore else */
  if (token) {
    try {
      return await jwt.verify(token, secret);
    } catch (error) {
      throw new AuthenticationError('Your session has expired. Sign in again.');
    }
  }
};
