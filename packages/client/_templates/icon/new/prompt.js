// see types of prompts:
// https://github.com/enquirer/enquirer/tree/master/examples

const { prompt } = require('enquirer');

module.exports = {
  prompt: async () =>
    prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Enter icon name (without "Icon" in name):',
      },
    ]),
};
