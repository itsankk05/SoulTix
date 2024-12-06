import ApiError from '../../utils/apiError';
import { StatusCodes } from 'http-status-codes';
import { randomUUID } from 'crypto';
import database from '../../loaders/database';

export const handleCreateUser = async userWalletAddress => {
  //Find if user already exists
  const userExist = await (await database()).collection('user').findOne({ address: userWalletAddress });

  if (userExist) {
    throw new ApiError('User already exists', StatusCodes.BAD_REQUEST);
  }

  const userJson = {
    address: userWalletAddress,
  };

  await (await database()).collection('users').insertOne(userJson);
  return {
    success: true,
    message: 'User created successfully',
    status: 200,
  };
};
