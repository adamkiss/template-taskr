const superb = require('superb')
const slug = require('speakingurl')

const testCommands = {
  tape: 'tape test/*.js | tap-spec',
  jasmine: 'jasmine test',
  mocha: 'mocha test',
  ava: 'ava test'
}

module.exports = {
  enforceNewFolder: true,
  templateOptions: {
    context: { slug }
  },
  prompts: {
    name: {
      message: 'What is the (unprefixed) name of the plugin?',
      default: ':folderName:'
    },
    description: {
      message: 'How would you describe the plugin?',
      default: `my ${superb()} plugin for Taskr`
    },
    author: {
      message: 'What is your name?',
      default: ':gitUser:',
      store: true
    },
    email: {
      message: 'What is your email?',
      default: ':gitEmail:',
      store: true
    },
    username: {
      message: 'What is your GitHub username or organization?',
      default(answers) {
        return slug(answers.author) || ':gitUser:'
      },
      store: true
    },
    website: {
      message: 'The URL of your website?',
      default({username}) {
        return `github.com/${username}`
      },
      store: true
    },
    repo: {
      message: "What is your GitHub repository's URL?",
      default(answers) {
        return `https://github.com/${answers.username}/${slug(slug(answers.name))}`;
      },
      store: true
    },
    testTool: {
      type: 'list',
      default: 'tape',
      message: 'Set up default test?',
      choices: [
        { name: 'Tape', value: 'tape' },
        { name: 'AVA', value: 'ava' },
        { name: 'Jasmine', value: 'jasmine' },
        { name: 'Mocha', value: 'mocha' }
      ]
    }
  },
  data(answers) {
    const slugName = slug(answers.name)
    return add = {
      slugName,
      prefixedName: `taskr-${slugName}`,
      testCommand: testCommands[answers.testTool]
    }
  },
  move: {
    'gitignore': '.gitignore',
    'package': 'package.json',
    'readme': 'readme.md',
    'node_modules/**': false,
    '.env': false,
  },
  filters: {
    'test/test-tape.js': 'testTool === "tape"',
    'test/test-ava.js': 'testTool === "ava"',
    'test/test-jasmine.js': 'testTool === "jasmine"',
    'test/test-mocha.js': 'testTool === "mocha"',
  },
  showTip: true,
  gitInit: true,
  installDependencies: true
}
