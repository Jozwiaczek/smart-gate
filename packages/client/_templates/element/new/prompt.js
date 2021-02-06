// see types of prompts:
// https://github.com/enquirer/enquirer/tree/master/examples

const { prompt } = require('enquirer');

module.exports = {
  prompt: async () =>
    prompt([
      {
        type: 'input',
        name: 'name',
        message: 'New element name:',
      },
      {
        type: 'toggle',
        name: 'isStories',
        message: 'Add stories?',
        enabled: 'Yes',
        disabled: 'No',
        initial: 'enabled',
      },
    ]),
};
