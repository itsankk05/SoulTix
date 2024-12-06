import { Response, NextFunction } from 'express';
import catchAsync from '../../utils/catchAsync';
import { handleCreateUser } from './service';
import { jwtReq } from '../../types';
import { StatusCodes } from 'http-status-codes';

export const CreateEvent = catchAsync(async (req: jwtReq, res: Response, next: NextFunction) => {
  const walletAddress: string = req.user.walletAddress;
  await handleCreateUser(walletAddress);

  res.status(StatusCodes.CREATED).json({
    success: true,
    message: 'User created successfully',
  });
});
