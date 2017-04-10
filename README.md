Welcome to Wishtack's Websheep
=============================

Websheep is a willingly vulnerable set of applications and ReSTful APIs.

It is meant to demo and learn common vulnerabilities on frontend JavaScript applications and ReSTful APIs.
* Broken Authentication, Session Management and Access Control.
* CSRF (Cross-Site Request Forgery).
* Code Injection.
* OAuth2, OpenID Connect and JWT issues (Session Fixation and Token Forgery).

For the moment, it only covers CSRF.

[More about ReSTful APIs](https://blog.wishtack.com/rest-apis-best-practices-and-security/)

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

## Step 2: Code
Edit the code in `src/attacker/index.html` in order to the attack the vulnerable application.

Avoid looking at the code in `src/attacker/attack.html` that contains the working attack payloads.

## Step 3: Run
Run your attack by opening `http://localhost:8080` on your browser.

## Demo
You can run the attack demo by opening `http://localhost:8080/attack.html` on your browser.

# ReSTful APIs Security documentation
Here's a white paper that describes common ReSTful APIs vulnerabilities: [ReST APIs Best Practices and Security](https://blog.wishtack.com/rest-apis-best-practices-and-security/)

And remember that cookies are evil!

