// Types of prompts:
// https://github.com/enquirer/enquirer/tree/master/examples

const { prompt } = require('enquirer');

module.exports = {
  prompt: async () =>
    prompt([
      {
        type: 'input',
        name: 'name',
        message: 'New helper function name:',
      },
      {
        type: 'toggle',
        name: 'withTest',
        message: 'Add unit test?',
        enabled: 'Yes',
        disabled: 'No',
        initial: 'enabled',
      },
      {
        type: 'select',
        name: 'fileExtension',
        message: 'Pick file extension',
        choices: ['.tsx', '.ts']
      }
    ]),
};
