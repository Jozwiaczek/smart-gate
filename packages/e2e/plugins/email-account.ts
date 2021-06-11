import imaps, { Message } from 'imap-simple';
import { simpleParser } from 'mailparser';

const makeEmailAccount = () => {
  const testAccount = {
    user: process.env.ETHEREAL_USER,
    password: process.env.ETHEREAL_PASSWORD,
  };

  if (!testAccount.user || !testAccount.password) {
    throw Error('Missing email account details');
  }

  const emailConfig = {
    imap: {
      user: testAccount.user,
      password: testAccount.password,
      host: 'imap.ethereal.email',
      port: 993,
      tls: true,
      authTimeout: 10000,
    },
  };

  const getMessages = async () => {
    const connection = await imaps.connect(emailConfig);

    await connection.openBox('INBOX');
    const searchCriteria = ['1:20'];
    const fetchOptions = {
      bodies: [''],
    };
    const messages = await connection.search(searchCriteria, fetchOptions);
    connection.end();

    if (!messages.length) {
      throw new Error('Cannot find any emails');
    }

    return messages;
  };

  const getFilteredMessage = async (
    cb: (importedMessages: Array<Message>) => Message | undefined,
  ) => {
    try {
      const messages = await getMessages();
      const filteredRawMsg = cb(messages);

      if (!filteredRawMsg) {
        console.log('cannot find matched email');
        return null;
      }

      const { subject, text, html } = await simpleParser(filteredRawMsg.parts[0].body);

      return {
        subject,
        text,
        html,
      };
    } catch (e) {
      console.error(e);
      return null;
    }
  };

  const getLastEmailBySubject = async (targetSubject: string) =>
    getFilteredMessage((messages) =>
      messages.reverse().find((mes) => mes.parts[0].body.split('\n')[5].includes(targetSubject)),
    );

  const getLastEmail = async () =>
    getFilteredMessage((messages) => messages[messages.length - 1].parts[0].body);

  return {
    email: testAccount.user,
    getLastEmail,
    getLastEmailBySubject,
  };
};

export default makeEmailAccount;
