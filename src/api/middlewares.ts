import morgan from 'morgan';
import express, { Application } from 'express';
import cors from 'cors';

/**
 * @description This initializes the application middlewares
 *
 * @param {Application} app
 * @returns {void}
 */
const initializeMiddlewares = (app: Application): void => {
  app.use(cors());
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  app.use(morgan('dev'));
};

export default initializeMiddlewares;
