import { Router, Request } from 'express';

// * Types

export type RouteType = {
  path: string;
  router: Router;
};

export type RequestPart = 'body' | 'query' | 'params';

export interface UserJwtPayload {
  walletAddress: string;
  lastLogin: Date;
}

export interface ChainData {
  chainId: string;
  chainName: string;
  chainType: string;
  chainSymbol: string;
  chainDecimals: number;
}

export interface WalletData {
  address: string;
  chain: ChainData;
}

export interface jwtReq extends Request {
  user: UserJwtPayload;
}
