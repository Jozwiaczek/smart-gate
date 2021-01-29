// see types of prompts:
// https://github.com/enquirer/enquirer/tree/master/examples

const { prompt } = require('enquirer');

module.exports = {
  prompt: async () =>
    prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Enter model name:',
      },
      {
        type: 'multiselect',
        name: 'types',
        message: 'Pick all views types which fits your needs',
        choices: [{ name: 'List' }, { name: 'Create' }, { name: 'Edit' }, { name: 'Show' }],
      },
      {
        type: 'list',
        name: 'fields',
        message: 'Enter all comma-separated source names fields (will be displayed as a text)',
      },
    ]),
};
