import ApiError from '../../utils/apiError';
import { StatusCodes } from 'http-status-codes';
import { randomUUID } from 'crypto';
import database from '../../loaders/database';

export const handleCreateEvent = async (eventData) => {
  // Validate eventData inputs
  const { name, date, location, price, userWalletAddress } = eventData;

  if (!name || !date || !location) {
    throw new ApiError('Missing required event fields', StatusCodes.BAD_REQUEST);
  }

  // Find if user already exists
  const userExist = await (await database()).collection('user').findOne({ address: userWalletAddress });

  if (userExist) {
    throw new ApiError('User already exists', StatusCodes.BAD_REQUEST);
  }

  const userJson = {
    address: userWalletAddress,
  };

  await (await database()).collection('users').insertOne(userJson);

  // Create concert event object
  const concertEvent = {
    id: randomUUID(),
    name,
    date,
    location,
    createdBy: artistWalletAddress,
  };

  // Insert concert event into the database
  await (await database()).collection('events').insertOne(concertEvent);

  return {
    success: true,
    message: 'Concert event created successfully',
    status: 200,
  };
};
