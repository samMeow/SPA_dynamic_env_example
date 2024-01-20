# SPA dynamic environment in runtime

TL;DR This repository aims to provide vite + webpack example on how to serve environment variables using es6 module in browser runtime.
So developer can easily swap environment variables without building again, or using other API / global variables in window.

## Background

Frontend deployment usually involve generating static assets and placing them into file server like S3, GCP bucket, nginx, etc.
SPA (Single Page Application) and SSG (Static Site Generation) nowadays got tools to pack environment variables into static assets,
but didn't explicitly provide a way to inject env var after built.  
Over years, developer may seek different ways, e.g. using an API endpoint which calls at application start time,
regex replace placeholder text, expose env variables to global with Object.freeze.
These methods may not be feasible depends on hosting and pipeline setup, thus, with aid of ES module, a relatively convenient way is presented in this repository.

## Mechanism

ES Module allow javascript to depends on other assets with a much simple syntax in browser runtime. With more and more browser supporting import / export syntax, 
developer can safely split scripts into chunks without worrying too much on fetching sequence. At the same time, most bundlers (e.g. rollup, webpack) support external dependencies.
We can import environment variables from an alias target `@/env`, while telling bundler to resolve this alias to external `/env.js` during build time. 
This will change `import env from '@/env'` to `import env from '/env.js'` after combine. When browser read this line, it will then try to fetch `/env.js` from script domain. 
Thus it leave us some room to replace `env.js` after build time.  
Limitations: It would be more easy to use `assert { type: 'json' }` and replace it with `env.json` instead. As most CD tools (shell script) can produce JSON easier without complicated steps.
However, currently it is only supported by chrome, so this demo is using js as example.  

## Getting start

Before stating local server, please copy `.env.example` as `.env` in project directory.

### Prerequisite

```
Node JS >= 20
NPM >= 10
VITE >= 5
WEBPACK >= 5
```

### List of commands

```sh
# Starting local development
npm run start:vite
npm run start:webpack

# Building local assets
npm run build:vite
npm run build:webpack

# Serving local assets
npx serve dist

# Recommend way of creating env.js
echo "export default" > /dist/env.js
node -e 'console.log(Object.fromEntries(Object.entries(process.env).filter(o => o[0].startsWith("VITE_"))))' >> dist/env.js
# Although this project directly include env.js in public/ folder and copy for demo purpose

```


## Reference
- Webpack Docs [https://webpack.js.org/configuration/externals/]
- Rollup Docs [https://rollupjs.org/configuration-options/#external]
- MDN ES Module [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules]