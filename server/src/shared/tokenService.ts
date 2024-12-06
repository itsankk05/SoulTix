import jwt from 'jsonwebtoken';
import env from '../config';
import { UserJwtPayload } from '../types';

export const generateToken = (payload: UserJwtPayload) => {
  return jwt.sign(payload, env.jwtSecret as string, {
    expiresIn: '3d',
  });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, env.jwtSecret as string);
};

export const generateUniquePrivateKey = () => {
  return jwt.sign({ id: Math.random() }, env.jwtSecret as string, {
    expiresIn: '1d',
  });
};
