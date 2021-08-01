import nodemailer from 'nodemailer';

export const createEmailTestAccount = async () => nodemailer.createTestAccount();
