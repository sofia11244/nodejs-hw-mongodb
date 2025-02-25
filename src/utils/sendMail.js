import nodemailer from 'nodemailer';
import { env } from '../utils/env.js';

const transporter = nodemailer.createTransport({
  host: env('SMTP_HOST'), // DÜZELTİLDİ
  port: Number(env('SMTP_PORT')), // DÜZELTİLDİ
  auth: {
    user: env('SMTP_USER'), // DÜZELTİLDİ
    pass: env('SMTP_PASSWORD'), // DÜZELTİLDİ
  },
});

export const sendEmail = async (options) => {
  return await transporter.sendMail(options);
};
