# sTUMatch Frontend

This repository contains the source code of the sTUMatch frontend.

**Context about the project:**<br/>
sTUMatch is a social platform where students of a specific university can connect to others via
comments on university news, a dedicated matching system and a chat. sTUMatch allows university
employees to post about interesting events and advertisers to create and host advertisements
target specifically at students of the respective university.

The prototype was written as part of the SEBA Master course in a team of 4 students (Nhu, Manu, Khang, Jonas).
Prior experience with the technologies at hand was close to zero for most team members and the given time
frame for completion was about ~2 months only. Additionally, in classical student-project-fashion, a lot
of quick-and-dirty last minute work was done closely before the final submission.<br/>
The code reflects this situation in parts, so **don't expect best practices accross the board** -
nontheless, the final prototype overall works well and can certainly be looked at!


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

You can try logging in with the following credentials:

| E-Mail | Password | Roles |
| ------ | -------- | ----- |
| `nhu@stumatch.com` | `Admin123` | All roles. |
| `manu@stumatch.com` | `Admin123` | All roles. |
| `khang@stumatch.com` | `Admin123` | All roles. |
| `jonas@stumatch.com` | `Admin123` | All roles. |
| `student@stumatch.com` | `Student123` | Student role. |
| `educator@stumatch.com` | `Educator123` | Educator role. |
| `advertiser@stumatch.com` | `Advertiser123` | Advertiser role. |
| `admin@stumatch.com` | `Admin123` | Admin role. |



### Debugging the Application with VS Code

The repository contains a launch configuration for [VS Code](https://code.visualstudio.com/)
and *Google Chrome*/*Microsoft Edge*. The configuration allows you to set breakpoints and debug
the code from VS Code.

To use the debugger, start the development server normally via `npm start`.
You can then, at any point in time, start a debugging session using `F5`.

You can select the browser which you want to use by selecting the respective debug configuration
in VS Code's debug workspace:

![VS Code Debug Configuration](assets/readme-vs-code-debugger-configuration.png)
