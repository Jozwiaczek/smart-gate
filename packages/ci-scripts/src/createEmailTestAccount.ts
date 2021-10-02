import nodemailer from 'nodemailer';

export const createEmailTestAccount = async () =>
  nodemailer.createTestAccount().catch((err) => console.error('Error: ', err));
