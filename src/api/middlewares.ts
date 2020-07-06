import logger from 'morgan';
import express, { Application } from 'express';

const initializeMiddlewares = (app: Application) => {
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  app.use(logger('dev'));
};

export default initializeMiddlewares;
