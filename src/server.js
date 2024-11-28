import express from 'express';
import cors from 'cors';

import { env } from './utils/env.js';
import contactsRouter from './routers/contacts.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { logger } from './middlewares/logger.js';

export const startServer = () => {
  const app = express();

  app.use(cors());
  app.use(express.json());

  //   app.use(logger);

  app.get('/', (req, res) => {
    res.json({
      message: 'Start project',
    });
  });

  app.use('/contacts', contactsRouter);

  app.use(notFoundHandler);

  app.use(errorHandler);

  const port = Number(env('PORT', '3000'));

  app.listen(port, () => console.log(`Server is running on port ${port}`));
};
