import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import { env } from './utils/env.js';
// import { getAllContacts, getContactById } from './services/contacts.js';
import contactsRouter from './routers/contacts.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';

const port = Number(env('PORT', '3000'));

export const startServer = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());

  const logger = pino({
    transport: {
      target: 'pino-pretty',
    },
  });
  //   app.use(logger);

  app.get('/', (req, res) => {
    res.json({
      message: 'Start project',
    });
  });

  app.use(contactsRouter);

  // app.get('/contacts', async (req, res) => {
  //   const contacts = await getAllContacts();

  //   res.json({
  //     status: 200,
  //     message: 'Successfully found contacts!',
  //     data: contacts,
  //   });
  // });

  // app.get('/contacts/:contactId', async (req, res, next) => {
  //   const { contactId } = req.params;
  //   const contact = await getContactById(contactId);

  //   if (!contact) {
  //     res.status(404).json({
  //       message: `Contact with id=${contactId} not found`,
  //     });
  //     return;
  //   }

  //   res.json({
  //     status: 200,
  //     message: `Successfully found contact with id ${contactId}!`,
  //     data: contact,
  //   });
  // });

  app.use('*', notFoundHandler);

  app.use(errorHandler);

  app.listen(port, () => console.log(`Server is running on port ${port}`));
};
