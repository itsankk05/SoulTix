import { Router } from 'express';
import authRouter from './auth/router';
import musicServiceRouter from './music-service/router';

const routes = [
  { path: '/auth', router: authRouter },
  { path: '/music-service', router: musicServiceRouter },
];

export default (): Router => {
  const app = Router();
  routes.forEach(route => {
    app.use(route.path, route.router);
  });

  return app;
};
