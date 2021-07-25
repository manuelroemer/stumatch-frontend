# sTUMatch Frontend

This repository contains the source code of the sTUMatch frontend.


## Getting Started

## ⚠ IMPORTANT ⚠

![Adblocker Notice](./assets/readme-adblocker-notice.png)

One of our use-cases introduces self-written advertisments. A lot of **ad-blockers** will **block**
the endpoints in the backend.
We consider ad-blocker evasion a topic that goes way beyond the scope of a prototype (in fact,
that's a topic that whole teams of developers are paid for - that's too much for students 😉).
Therefore the simplest solution is to:

➡ **Disable your ad-blocker** when using the page!


### Installing Packages

Ensure that [NodeJS](https://nodejs.org/en/) is installed on your machine.
Clone the repository and install the packages:

```sh
git clone https://gitlab.lrz.de/seba-master-2021/team-29/frontend.git stumatch-frontend

cd stumatch-frontend
npm i
```


### Running the Application

Clone and **run** the [**sTUMatch Backend**](https://gitlab.lrz.de/seba-master-2021/team-29/backend)
repository (follow the instructions in its README for details).
Once the backend is running locally, you can start the frontend part of the application using your terminal:

```sh
# Recommended: Run in Development mode:
npm start

# Or alternatively, run in Production mode:
npm run watch-production
```

The command will start a local development server on port `8080`. To access the frontend, open
your favorite browser and navigate to [`localhost:8080`](http://localhost:8080).


### Debugging the Application with VS Code

The repository contains a launch configuration for [VS Code](https://code.visualstudio.com/)
and *Google Chrome*/*Microsoft Edge*. The configuration allows you to set breakpoints and debug
the code from VS Code.

To use the debugger, start the development server normally via `npm start`.
You can then, at any point in time, start a debugging session using `F5`.

You can select the browser which you want to use by selecting the respective debug configuration
in VS Code's debug workspace:

![VS Code Debug Configuration](assets/readme-vs-code-debugger-configuration.png)
