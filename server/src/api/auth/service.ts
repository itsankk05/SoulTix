import ApiError from '../../utils/apiError';
import { StatusCodes } from 'http-status-codes';
import database from '../../loaders/database';
import { generateToken } from '../../shared/tokenService';
import { UserJwtPayload } from '../../types/index';

export const handleCreateUser = async userWalletAddress => {
  //Find if user already exists
  const userExist = await (await database()).collection('user').findOne({ address: userWalletAddress });

  const payload: UserJwtPayload = {
    walletAddress: userWalletAddress,
    lastLogin: new Date(Date.now()),
  };

  const jwtToken = await generateToken(payload);

  if (!userExist) {
    await (await database()).collection('users').insertOne({
      wallet_address: userWalletAddress,
    });

    return {
      isSignUp: true,
      token: jwtToken,
    };
  }

  return {
    isSignUp: false,
    token: jwtToken,
  };
};

export const handleFetchUserData = async userWalletAddress => {
  //Find if user already exists
  const user = await (await database()).collection('users').findOne({ wallet_address: userWalletAddress });

  console.log(user);
  if (!user) {
    throw new ApiError('User Not Found', StatusCodes.NOT_FOUND);
  }

  return user;
};
