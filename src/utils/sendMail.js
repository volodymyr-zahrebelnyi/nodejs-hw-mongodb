import nodemailer from 'nodemailer';
import 'dotenv/config';

import { env } from '../utils/env.js';
import { SMTP } from '../constants/index.js';

const nodemailerConfig = {
  host: env(SMTP.SMTP_HOST),
  port: Number(env(SMTP.SMTP_PORT)),
  auth: {
    user: env(SMTP.SMTP_USER),
    pass: env(SMTP.SMTP_PASSWORD),
  },
};

const transporter = nodemailer.createTransport(nodemailerConfig);

export const sendEmail = async (options) => {
  return await transporter.sendMail(options);
};
