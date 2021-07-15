<a href="https://yourdoge.netlify.app">
  <p align="center">
    <img height=150 src="assets/yourdogeAppleIcon.svg"/>
  </p>
  <p align="center">
    <img height=70 src="assets/textLogo.svg">
  </p>
</a>

<p align="center">
  <a href="https://yourdoge.netlify.app">
    <img src="https://img.shields.io/badge/status-development-green" alt="status" />
  </a>
  <a href="https://yourdoge.netlify.app">
    <img src="https://img.shields.io/badge/license-GPL--3.0--or--later-yellow" />
  </a>
  
  <a href="https://open.vscode.dev/timthedev07/Your-Doge">
    <img src="https://open.vscode.dev/badges/open-in-vscode.svg">
  </a>
  
</p>

<p align="center">
  <strong>Doge Themed Homework Manager 💻</strong>
</p>

<h3 align="center">
  <a href="CONTRIBUTING.md">Contribute</a>
  <span> · </span>
  <a href="https://yourdoge.netlify.app">Production</a>
</h3>

---

## Run the project

Visit [here](https://yourdoge.netlify.app) for live production or you can clone the repo and run it locally on your machine as follows.

### Requirements for running locally

- at least 1GB ram for running the tasks simultaneously
- [node](https://nodejs.org/en/download/)
- [yarn](https://classic.yarnpkg.com/en/docs/install/)
- [redis](https://redis.io/topics/quickstart)
- [postgresql](https://www.postgresql.org/download/) installed and set up, which then must contain an empty database named exactly `homework-manager`.

```bash
# Note that you need at least 3 terminals or tabs to run it

$ git clone https://github.com/timthedev07/Your-Doge.git
$ cd Your-Doge/client && yarn # install dependencies in the client directory
yarn install v1.22.10
[1/4] 🔍  Resolving packages...

       ...

$ cd ../server && yarn # the same for the server
yarn install v1.22.10
[1/4] 🔍  Resolving packages...

       ...

$ yarn devstart # start our api first
```

Open up another terminal in the root directory of the project and:

```bash
$ cd client && yarn start # then start our client side server

```

Afterward, in wherever your want, open up another terminal and:

```bash
$ redis-server # start the redis server

```

## About Your Doge

Your Doge is a doge themed online homework manager built for the ones who are struggling with organizing their homework, although it also fits other sorts of tasks. Your Doge provides personalized statistics on how well you are doing based on your activities.

## Contributing

We are open to any issues, pull requests, and comments on how we can make Your Doge better.

## [Code of Conduct](/CODE_OF_CONDUCT.md)

## Branches

- production -> don't make any changes here
- staging -> open to pull requests

## License

Your Doge is [GPLv3 Licensed](LICENSE)

## Attributions

Avatars(excluding doge): [Laura Reen](https://www.iconfinder.com/laurareen)
