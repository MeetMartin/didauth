# DID Authentication

![npm](https://img.shields.io/npm/v/didauth.svg)
![NpmLicense](https://img.shields.io/npm/l/didauth.svg)
![npm bundle size (minified)](https://img.shields.io/bundlephobia/min/didauth.svg)
![npm bundle size (minified + gzip)](https://img.shields.io/bundlephobia/minzip/didauth.svg)

didauth is a JavaScript NPM libray for building DID authentication. Library uses JSDoc and Typescript typings for your convinience.

## Example Demo Website
[DID Authentication didauth.meet-martin.com](https://didauth.meet-martin.com/)
[Demo Website Github Repository](https://github.com/MeetMartin/did-authentication)

## Get Started

### Installation
To use with Node.js:

```
$ npm install --save didauth
```

### MATTR Platform Dependency
To use the library, you will need to have an account at [MATTR](https://mattr.global/), which provides
all the necessary plumbing to support decentralized identifiers and a digital wallet.

### Authentication

authentication is a pure function that creates an authentication request URL for DID Authentication with your MATTR tenant. The resulting URL
is intended to be used to redirect the user.

As a result, MATTR platform calls supplied callback URL with the result that connects to your request by a supplied Request ID.

We return a monad @7urtle/lambda.AsyncEffect as the output of the function: https://www.7urtle.com/documentation-7urtle-lambda#lambda-AsyncEffect

```
import { authentication } from 'didauth';

const payload = {
    clientId: 'client id', // client id provided by MATTR
    clientSecret: 'client secret', // client secret provided by MATTR
    tenant: 'your-tenant.vii.mattr.global', // your tenant provided by MATTR
    did: 'did:method:code', // your verifier DID representing your application created in MATTR platform
    requestId: 'your-request-id', // custom ID provided by your application to connect request internally
    templateId: 'presentation template id', // presentation template ID created in MATTR platform
    callbackURL: 'https://your-domain.tld/didauth/callback' // callback url of your website that the digital wallet will call
};

authentication(payload)
.trigger
(errors => console.log(errors) || ({
    statusCode: 500,
    body: 'Internal Server Error'
}))
(JWSURL => ({
    statusCode: 301,
    headers: {
        locations: JWSURL
    }
}));
```

### Push Authentication

pushAuthentication is a pure function that creates an authentication digital wallet push request for DID Authentication with your MATTR tenant. It uses the recipientDID stored in your system to find the user's digital wallet and ask them for authentication through a push request on their phone.

As a result, MATTR platform calls supplied callback URL with the result that connects to your request by a supplied Request ID.

We return a monad @7urtle/lambda.AsyncEffect as the output of the function: https://www.7urtle.com/documentation-7urtle-lambda#lambda-AsyncEffect

```
import { pushAuthentication } from 'didauth';

const payload = {
    clientId: 'client id', // client id provided by MATTR
    clientSecret: 'client secret', // client secret provided by MATTR
    tenant: 'your-tenant.vii.mattr.global', // your tenant provided by MATTR
    did: 'did:method:code', // your verifier DID representing your application created in MATTR platform
    recipientDid: 'did:method:code', // users DID store by your application
    requestId: 'your-request-id', // custom ID provided by your application to connect request internally
    templateId: 'presentation template id', // presentation template ID created in MATTR platform
    callbackURL: 'https://your-domain.tld/didauth/callback' // callback url of your website that the digital wallet will call
};

pushAuthentication(payload)
.trigger
(errors => console.log(errors) || ({
    statusCode: 500,
    body: 'Internal Server Error'
}))
(() => ({
    statusCode: 204
}));
```

## Run Tests
The library has 100 % test coverage with unit tests and integration tests.

To run unit tests locally, call:

```
npm run unit-test
```

To run integration tests locally as well you will need `.env` file setup connected to your website and using
your MATTR credentials. Please either reach out directly to MATTR to obtain them or open an issue in this repository
to get help.

```
npm test
```

## How Is The Library Built

didauth is built using functional programming principles on top of [7urtle/lambda](https://www.7urtle.com/).
The library internally uses functional monads and therefor the output of the function calls are monads as well.

The library itself is written in pure JavaScript and uses Babel and Webpack to build. However, for your convinience
Typescript typings and JSDoc are provided with the library.

## Contributors

[![Contributors](https://contributors-img.firebaseapp.com/image?repo=MeetMartin/lambda)](https://github.com/MeetMartin/lambda/graphs/contributors)

Made with [contributors-img](https://contributors-img.firebaseapp.com).