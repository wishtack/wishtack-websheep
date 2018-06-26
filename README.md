Welcome to Wishtack's Websheep
=============================

Websheep is a willingly vulnerable set of applications and ReSTful APIs.

It is meant to demo and learn common vulnerabilities on frontend JavaScript applications and ReSTful APIs.
* Broken Authentication, Session Management and Access Control.
* CSRF (Cross-Site Request Forgery). [Learn more about CORS & CSRF](https://blog.wishtack.com/rest-apis-best-practices-and-security/#11.5)
* JWT (Json Web Token) issues. [Learn more about JWT security](https://blog.wishtack.com/rest-apis-best-practices-and-security/#11.10.5)
* ReDoS issues.
* Code Injection.
* OAuth2, OpenID Connect (Session Fixation). *[not implemented yet]*

[Learn more about ReSTful APIs Best Pratcices & Security](https://blog.wishtack.com/rest-apis-best-practices-and-security/)

# Quickstart

```shell
git clone https://github.com/wishtack/wishtack-websheep.git
npm install // or yarn install
npm start // or yarn start
```

You will end up with two severs running locally:
* The vulnerable application running on `http://localhost:3000`.
* The attacking application running on `http://localhost:8080`.

## Step 1: Discover
Visit the vulnerable application `http://localhost:3000` to discover the available endpoints.

## Step 2: Attack

### Step 2.A (C.S.R.F. attacks only)
Edit the code in `src/attacker/index.html` in order to the attack the vulnerable application.

Avoid looking at the code in `src/attacker/attack.html` that contains the working attack payloads.

### Step 2.B (Other attacks)
You can run your attack from the browser using the console or snippets feature.
There are some helpful tools out there:
* [Postman](https://www.getpostman.com/)
* [Postman Chrome Extension](https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop?hl=en)

## Step 3: Run
Run your attack by opening `http://localhost:8080` on your browser.

## Demo
You can see the solution demo by running `npm run start:solution`.
You can run the C.S.R.F. attack demo by opening `http://localhost:8080/attack.html` on your browser.

# ReSTful APIs Security documentation
Here's a white paper that describes common ReSTful APIs vulnerabilities: [ReST APIs Best Practices and Security](https://blog.wishtack.com/rest-apis-best-practices-and-security/)

And remember that cookies are evil!
