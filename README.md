# WebDriverIO Demo

A demo project that demonstrates how to use WebDriverJs and how to run it using CircleCI.

Build status: ![Build Status](https://circleci.com/gh/KorolevskyMax/js-mocha-tests.svg?style=shield)

## Setup

1. Install [node.js version 8+](https://nodejs.org/). This project uses modern Javascript features, that will not work in older versions.
2. Clone this repository `git clone git+git@github.com:KorolevskyMax/js-mocha-tests.git && cd js-mocha-tests`
3. Install dependencies for each project backend/ frontend/ tests/ `npm install`
4. Run frontend & backend via `npm start` in corresponding dirs
5. Run tests via `npm test`. It will start Selenium server and perform some tests
6. Run `npm run report` to build `html` report from results and it will be
opened in your browser

## APP structure
* **frontend/** - directory with frontend.
* **backend/** - directory with backend application: api, 3rdPartyService, dbAccess module.
* **tests/** - directory with tests.

## Tests structure

* **pageobjects/** – directory with page objects. Page object is an convenient way to create reusable actions to interact with page .
* **specs/** – test files. Our setup uses [Mocha].
    * **simple.spec.js** – simple test example that uses only pure Allure, without webdriver
    * **webdriver-io.spec.js** – tests with selenium and [webdriver.io], one of the popular libraries
* **utils/** - additional helpers
    * **config.js** – configuration file where specified base options for tests. Here you can change target browser or page urls
    * **browser.js** - browser provider for your tests

Also, check out files content, they are also well-commented.

[allure-cli]: https://github.com/allure-framework/allure-cli
[Mocha]: http://mochajs.org
[webdriver.io]: http://webdriver.io/