# template-taskr  [![Build Status][travis-img]][travis-link]

> Sao Generator for Taskr plugins, based on [generator-taskr][generator-taskr] for Yo

## Usage

Install [SAO](https://github.com/egoist/sao) first.

```bash
yarn global add sao
# or
npm i -g sao
```

### From npm

```bash
sao taskr my-project
```

### From git

```bash
sao adamkiss/template-taskr my-project
```

## Features

- Choice of test runners: AVA, Jasmine, Mocha, Tape
- Automatic Git Repo initialization
- JavaScript Linting via XO
- TravisCI config

> :warning: Don't forget to add a [remote origin](https://help.github.com/articles/adding-a-remote/) to your repo!

## License

MIT &copy; [Adam Kiss](https://adamkiss.com), [Luke Edwards](https://lukeed.com) and [Oleh Kuchuk](https://github.com/hzlmn)

[travis-link]: https://travis-ci.org/adamkiss/template-taskr
[travis-img]: https://travis-ci.org/adamkiss/template-taskr.svg?branch=master
[generator-taskr]: https://github.com/lukeed/generator-taskr