# Cryplicity

### A Cool Crypto Tool

Cryplicity is a simple tool to track the market and your portfolio though it is still in very heavy development as of right now. Along with this support is being added for
multiple coins and cleaning up the application to stop performance degradation. This project is being developed with the mindset no one should ever pay for anything for tracking their
finances especially with something as volatile as today's crypto market. While still in a definite pre-release stage with important features needing to be fixed and added, 

Hopefully Cryplicity helps you in your goal of grabbing that lambo to the moon, but if that's not possible then it can at least help you with your assets.

## Screenshot

![Cryplicity Screenshot](https://i.imgur.com/UM0OlNq.png)


## Install

#### For Regular Use
  **Note:** This application will be under very heavy development until version 1.0.0 is released, but
  using it until then should be perfectly fine, if you have any issues, open an issue through github describing the issue(though make sure there is no
  existing issue similar to your already if possible)




#### For Developers

* **Note: requires a node version >= 7 and an npm version >= 4.**
* **If you have installation or compilation issues with this project, please see [our debugging guide](https://github.com/chentsulin/electron-react-boilerplate/issues/400)**

First, clone the repo via git:

```bash
git clone --depth=1 https://github.com/Kthulu120/mangle 
```

And then install dependencies with yarn.

```bash
$ cd mangle
$ yarn
```
**Note**: If you can't use [yarn](https://github.com/yarnpkg/yarn) for some reason, try `npm install`.

## Run

Start the app in the `dev` environment. This starts the renderer process in [**hot-module-replacement**](https://webpack.js.org/guides/hmr-react/) mode and starts a server that sends hot updates to the renderer process:

```bash
$ npm run dev
```

Alternatively, you can run the renderer and main processes separately. This way, you can restart one process without waiting for the other. Run these two commands **simultaneously** in different console tabs:

```bash
$ npm run start-renderer-dev
$ npm run start-main-dev
```

You can find the tabs on Chrome DevTools.

If you want to update extensions version, please set `UPGRADE_EXTENSIONS` env, just run:

```bash
$ UPGRADE_EXTENSIONS=1 npm run dev

# For Windows
$ set UPGRADE_EXTENSIONS=1 && npm run dev
```

:bulb: You can debug your production build with devtools by simply setting the `DEBUG_PROD` env variable:
```
DEBUG_PROD=true npm run package
```


## CSS Modules

Though a large part of this application is using inline styles the goal is to move to styled components.

## Packaging

To package apps for the local platform:

```bash
$ npm run package
```

To package apps for all platforms:

First, refer to [Multi Platform Build](https://www.electron.build/multi-platform-build) for dependencies.

Then,
```bash
$ npm run package-all
```

To package apps with options:

```bash
$ npm run package -- --[option]
```

### Current Issues
* The UI is slow often
* The Wallet Manager is buggy so this must be improved
* Validating and working with more currencies
* Fixing the horrid news feed
* Adding in aggregative portfolio tracking
* Add a logo or icon



## Further commands

To run the application without packaging run

```bash
$ npm run build
$ npm start
```

To run End-to-End Test

```bash
$ npm run build
$ npm run test-e2e
```

#### Options

See [electron-builder CLI Usage](https://github.com/electron-userland/electron-builder#cli-usage)

## How to add modules to the project

You will need to add other modules to this boilerplate, depending on the requirements of your project. For example, you may want to add [node-postgres](https://github.com/brianc/node-postgres) to communicate with PostgreSQL database, or 
[material-ui](http://www.material-ui.com/) to reuse react UI components.

⚠️ Please read the following section before installing any dependencies ⚠️

### Module Structure

This boilerplate uses a [two package.json structure](https://github.com/electron-userland/electron-builder/wiki/Two-package.json-Structure). This means, you will have two `package.json` files.

1. `./package.json` in the root of your project
1. `./app/package.json` inside `app` folder

### Which `package.json` file to use

**Rule of thumb** is: all modules go into `./package.json` except native modules. Native modules go into `./app/package.json`.

1. If the module is native to a platform (like node-postgres) or otherwise should be included with the published package (i.e. bcrypt, openbci), it should be listed under `dependencies` in `./app/package.json`.
2. If a module is `import`ed by another module, include it in `dependencies` in `./package.json`.   See [this ESLint rule](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-extraneous-dependencies.md). Examples of such modules are `material-ui`, `redux-form`, and `moment`.
3. Otherwise, modules used for building, testing and debugging should be included in `devDependencies` in `./package.json`.

### Further Readings

See the wiki page, [Module Structure — Two package.json Structure](https://github.com/chentsulin/electron-react-boilerplate/wiki/Module-Structure----Two-package.json-Structure) to understand what is native module, the rationale behind two package.json structure and more.

For an example app that uses this boilerplate and packages native dependencies, see [erb-sqlite-example](https://github.com/amilajack/erb-sqlite-example). This project was created using react-boilerplate so shout-out to them.

## Dispatching redux actions from main process

see discusses in [#118](https://github.com/chentsulin/electron-react-boilerplate/issues/118) and [#108](https://github.com/chentsulin/electron-react-boilerplate/issues/108)



## Backers

Support us with a donation and help us continue our efforts. Any ether you send feeds a starving talented developer. Don't let the devs time be for nothing
help out a little bit and donate to the developer fund fam.

Ethereum Address : 0x958764057a6f16F9972C0F6a5a06FcEEa822D25B
XRB Addy: xrb_1m4wshb86nyeua1etj6x11x5736son19aimwiayz4yrp5fe5b5jnf6zhhow6
Litecoin Addy: LNUj7y1459wC8ZdEMdDmPfobhX7jBi7JHG

Again thanks!!!

## Sponsors

Become a sponsor and get your logo on our README on Github with a link to your site.


## License
Thanks to electron-react-boilerplate for making life easy!
MIT © [Troy Smith](https://github.com/kthulu120)

