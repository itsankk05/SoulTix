import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { handleCreateUser, handleFetchUserData } from './service';
import { jwtReq } from '../../types';
import { StatusCodes } from 'http-status-codes';

export const createUserOrLogin = catchAsync(async (req: Request, res: Response) => {
  /**
   * Body Sample:
   * {
   *  walletAddress: "0x1234"
   * }
   */
  const walletAddress: string = req.body.walletAddress;

  if (!walletAddress) {
    res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: 'Wallet Address is NULL',
      data: {},
    });
  }

  const newUser = await handleCreateUser(walletAddress);

  res.status(StatusCodes.CREATED).json({
    success: true,
    message: newUser.isSignUp ? 'User Signup successfully' : 'User Login Successful',
    data: {
      token: newUser.token,
    },
  });
});

export const getUserData = catchAsync(async (req: jwtReq, res: Response) => {
  const walletAddress: string = req.user.walletAddress;
  const userData = await handleFetchUserData(walletAddress);

  if (!userData) {
    res.status(StatusCodes.NOT_FOUND).json({
      success: true,
      message: 'User Not Found',
      data: {
        user: {},
      },
    });
  }

  res.status(StatusCodes.OK).json({
    success: true,
    message: 'User Data fetched successfully',
    data: {
      user: userData,
    },
  });
});
