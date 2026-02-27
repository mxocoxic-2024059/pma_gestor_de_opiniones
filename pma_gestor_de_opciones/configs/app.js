'use strict';

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import { corsOptions } from './cors.configuration.js';
import { helmetOptions } from './helmet.configuration.js';
import { dbConnection } from './db.configurations.js';
import { apiRateLimiter } from './rateLimit.configuration.js';

import authRoutes from '../src/auth/auth.routes.js';
import userRoutes from '../src/user/user.routes.js';
import postRoutes from '../src/posts/post.routes.js';
import commentRoutes from '../src/comments/comment.routes.js';

import { errorHandler } from '../middlewares/error-handler.js';

const BASE_PATH = '/pma/v1';

/* ================= ROUTES ================= */
const routes = (app) => {
  app.use(`${BASE_PATH}/auth`, authRoutes);
  app.use(`${BASE_PATH}/users`, userRoutes);
  app.use(`${BASE_PATH}/posts`, postRoutes);
  app.use(`${BASE_PATH}/comments`, commentRoutes);

  // Health Check
  app.get(`${BASE_PATH}/health`, (req, res) => {
    res.status(200).json({
      status: 'Healthy',
      timeStamp: new Date().toISOString(),
      service: 'PMA Gestor de Opciones API',
    });
  });

  // 404 Handler
  app.use((req, res) => {
    res.status(404).json({
      success: false,
      message: 'Endpoint not found',
    });
  });
};

/* ================= MIDDLEWARES ================= */
const middlewares = (app) => {
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: false, limit: '10mb' }));

  app.use(cors(corsOptions));
  app.use(helmet(helmetOptions));
  app.use(morgan('dev'));

  app.use(apiRateLimiter);
};

/* ================= INIT SERVER ================= */
export const initServer = async () => {
  const app = express();
  const PORT = process.env.PORT || 3000;

  app.set('trust proxy', 1);

  try {
    middlewares(app);
    routes(app);

    await dbConnection();

    // Global Error Handler (siempre al final)
    app.use(errorHandler);

    app.listen(PORT, () => {
      console.log(`Server running on port: ${PORT}`);
      console.log(
        `Health check: http://localhost:${PORT}${BASE_PATH}/health`
      );
    });
  } catch (err) {
    console.error(`Error initializing server: ${err.message}`);
    process.exit(1);
  }
};