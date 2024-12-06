import config from '../config';
import ApiError from '../utils/apiError';
import catchAsync from '../utils/catchAsync';
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import { verifyToken } from './tokenService';

export const auth = catchAsync(async (req: Request & { user: any }, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) throw new ApiError('Unauthorized', httpStatus.UNAUTHORIZED);

  const decoded = verifyToken(token);

  if (!decoded) throw new ApiError('Unauthorized', httpStatus.UNAUTHORIZED);

  req.user = decoded;

  next();
});

const handleTokenError = (err: any) => {
  if (err.name === 'TokenExpiredError') return 'Login Expired';

  return 'Invalid Token';
};
