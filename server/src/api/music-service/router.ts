import { Router } from 'express';
import { auth } from '../../shared/middleware';
import { handleSpotify } from './controller';

const musicServiceRouter = Router();

musicServiceRouter.post('/spotify-api', handleSpotify);

export default musicServiceRouter;
