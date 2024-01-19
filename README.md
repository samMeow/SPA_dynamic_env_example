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

## Getting start

### Prerequisite

```
Node JS >= 20
NPM >= 10
```

### List of commands

```sh
# Starting local development
npm run start:vite

# Building local assets
npm run build:vite

# Serving local assets
npx serve dist

# Recommend way of creating env.js
echo "export default" > /dist/env.js
node -e 'console.log(Object.fromEntries(Object.entries(process.env).filter(o => o[0].startsWith("VITE_"))))' >> dist/env.js

```