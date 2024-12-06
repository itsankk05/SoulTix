import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import config from '../config';
import ApiError from './apiError';

const enumerateErrorFormat = winston.format(info => {
  if (info instanceof Error || info instanceof ApiError) {
    Object.assign(info, { message: info.stack });
  }
  return info;
});

const transports: Array<winston.transports.ConsoleTransportInstance | DailyRotateFile> = [
  new winston.transports.Console({
    stderrLevels: ['error'],
  }),
];

if (config.node_env === 'production') {
  const date = new Date();

  const extraTransports: DailyRotateFile[] = [
    new DailyRotateFile({
      level: 'error',
      filename: `logs/${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}-error.log`,
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
    }),
    new DailyRotateFile({
      filename: `logs/${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}-combined.log`,
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
    }),
  ];

  transports.push(...extraTransports);
}

const logger = winston.createLogger({
  level: config.node_env === 'development' ? 'debug' : 'info',
  format: winston.format.combine(
    enumerateErrorFormat(),
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.splat(),
    winston.format.printf(({ level, message }) => `${level}: ${message}`),
  ),
  transports,
});

export default logger;
