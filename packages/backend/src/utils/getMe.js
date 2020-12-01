import jwt from 'jsonwebtoken';
import { AuthenticationError } from 'apollo-server-express';

export const getMe = async (request, secret) => {
  const token = request.headers['x-token'] || request.headers.authorization;
  if (token) {
    try {
      return await jwt.verify(token, secret);
    } catch (error) {
      throw new AuthenticationError(
        'Your session has expired. Sign in again.',
      )
    }
  }
};
