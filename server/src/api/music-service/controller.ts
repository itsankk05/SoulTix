import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { handleFetchUserData, spotifyAPICall } from './service';
import { jwtReq } from '../../types';
import { StatusCodes } from 'http-status-codes';

export const handleSpotify = catchAsync(async (req: Request, res: Response) => {
  /**
   * Body Sample:
   * {
   *  code: "coding"
   * }
   */
  const { code } = req.body;
  const response = await spotifyAPICall(code);

  if (!response) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: true,
      message: 'Error when calling spotify API',
      data: {},
    });
  }

  const { access_token } = response.data;

  res.status(StatusCodes.OK).json({
    success: true,
    message: 'Spotify Connected Successfully',
    data: { accessToken: access_token },
  });
});
