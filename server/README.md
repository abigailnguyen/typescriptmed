## To start the typescript compiler in watch mode:
```
tsc
```

## To start the server in dev watch mode
```
npm run dev
```
nodemon config is saved in `nodemon.json`

## General topics I came across during development
1. Nested node modules: you can have package.json file in sub folders, for packages only available to that project
   1. Can use `npm-run-all` package to control build steps in a sequence. For example
        ```
        "postinstall": "npm run install:a && npm run install:b"
        ```
## The repo setup

1. Frontend folder has all files related to the frontend. Using `webpack` to generate the files.
    - mapping `/static/` to `frontend` folder
2. Server using `express`
3. Always install the `@types\express.ts` for eg to use ts for that module
4. using ejs for simple UI instead of ReactJS
5. Looking to understand how to incorporate [security credentials to browser](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-credentials.html) from AWS website
   1. [Web Federated Identity](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/loading-browser-credentials-federated-id.html)
   2. [AWS Incognito](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/loading-browser-credentials-cognito.html)
6. Using [STS client](https://github.com/aws/aws-sdk-js/blob/307e82673b48577fce4389e4ce03f95064e8fe0d/lib/credentials/chainable_temporary_credentials.js) with identity provider to setup authentication for AWS
7. Nodemon setup here: https://github.com/remy/nodemon
   1. if you want to additonally clean up other processes when Nodemon restart, you can intercept and do those actions yourself. More reference in this [article](http://www.benjiegillam.com/2011/08/node-js-clean-restart-and-faster-development-with-nodemon/)
8. Understanding more about OpenAPI - [Redocly OpenAPI starter](https://github.com/Redocly/openapi-starter)
9. Use federated web token https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/loading-browser-credentials-federated-id.html
10. https://developers.google.com/identity/gsi/web/guides/display-button
11. https://developers.google.com/identity/sign-in/web/sign-in#:~:text=%20Integrating%20Google%20Sign-In%20into%20your%20web%20app,site%20is%20to%20use%20an%20automatically...%20More%20

## Problem facing:
- Following the example to [display the S3 bucket in browser](https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/s3-example-photos-view.html)
- Following the example of Okta to set up a website with [node express and typescript](https://developer.okta.com/blog/2018/11/15/node-express-typescript)
- Understand more of [webpack configuration](https://webpack.js.org/configuration/entry-context/)
- Have you tried to view the circular dependency? Golang automatically detects this but in nodeJS you need to install a custom package [Madge](https://github.com/pahen/madge)
- To allow web development to access the items in S3 bucket, we need to configure [CORS](https://docs.aws.amazon.com/AmazonS3/latest/userguide/cors.html)
- Can create a policy for an S3 bucket using policy generator
- Sample [nodemon.json](https://github.com/remy/nodemon/blob/master/doc/sample-nodemon.md)
- Issues with different module types you can configure with Typescript
  - [Module resolution](https://www.typescriptlang.org/docs/handbook/module-resolution.html)
  - [Understanding modules ](https://www.typescriptlang.org/tsconfig/#module)
  - [Why ESM and CJS don't get along](https://redfin.engineering/node-modules-at-war-why-commonjs-and-es-modules-cant-get-along-9617135eeca1)
- AWS S3 - Javascript SDK - [Example codes](https://github.com/awsdocs/aws-doc-sdk-examples/blob/master/javascriptv3/example_code/s3/README.md)
