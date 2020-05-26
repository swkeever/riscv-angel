# riscv-angel-extended

![Angel statue](public/assets/images/statue.jpg)

_Photo by [Simon Birt](https://unsplash.com/@simonbirt)._

This project is an extension of [riscv-angel](https://github.com/riscv/riscv-angel) containing additional UI features like showing the internal state of the OS and CPU in real time.

## Setup

First, make sure you have [NPM](https://www.npmjs.com/get-npm) installed.

Once NPM is installed, you can install the project dependencies with:

```bash
npm install
```

The project has been configured to work like [create-react-app](https://reactjs.org/docs/create-a-new-react-app.html).

### How to run a dev server

You can start a development server with:

```bash
npm run start
```

This should open your browser containing the project. Any changes you make in the code will automatically reload the browser.

### How to build the site

From the project root, run

```bash
npm run build
```

This will create a `build/` directory.
The production server should use this directory to serve the site.

## Code style

This project is using [ESLint](https://eslint.org/) to enforce good style.

To see style errors for a particular file, run:

```bash
npm run lint <file.js>
```

To see style errors for all files, run:

```bash
npm run lint:all
```

Additionally, you can have the linter attempt to correct style issues with the following two commands:

```bash
npm run lint:fix <file.js> # fixes individual js files
npm run lint:fix-all # fixes all js files
```
