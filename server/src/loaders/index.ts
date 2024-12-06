import { PinataSDK } from 'pinata-web3';
import config from '../config';
import database from './database';
import express from './express';
import Logger from '../utils/logger';
import Express from 'express';

export default async ({ expressApp }: { expressApp: Express.Application }): Promise<void> => {
  await database();
  Logger.info(`✌️ Connection to database successful`);

  await express({ app: expressApp });
  Logger.info('✌️ Express loaded');

  const pinata = await new PinataSDK({
    pinataJwt: process.env.PINATA_JWT,
    pinataGateway: process.env.GATEWAY_URL,
  });
  Logger.info('✅ All modules loaded!');
};
