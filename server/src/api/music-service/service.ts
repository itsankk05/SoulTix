import ApiError from '../../utils/apiError';
import { StatusCodes } from 'http-status-codes';
import database from '../../loaders/database';
import config from '../../config';
import axios from 'axios';

export const spotifyAPICall = async code => {
  const response = await axios.post('https://accounts.spotify.com/api/token', null, {
    params: {
      grant_type: 'authorization_code',
      code,
      redirect_uri: config.spotify.redirect_uri,
      client_id: config.spotify.client_id,
      client_secret: config.spotify.client_secret,
    },
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  return response;
};

export const handleFetchUserData = async userWalletAddress => {
  //Find if user already exists
  const user = await (await database()).collection('user').findOne({ address: userWalletAddress });

  if (!user) {
    throw new ApiError('User Not Found', StatusCodes.NOT_FOUND);
  }

  return user;
};
