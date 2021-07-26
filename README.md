## To-Do List

- [ ] Forgot Password
- [ ] Accept Only IITP Mails and RollNos
- [ ] LinkedIn SignIn & SignUp
- [ ] Profile Pic

## Local Development

- Make sure you have NodeJs Installed. If not, There are many tutorials out there. If you're still lazy, Refer [this](https://heynode.com/tutorial/install-nodejs-locally-nvm/) :)
- Make sure you have MongoDB Installed. Refer [this](https://docs.mongodb.com/manual/administration/install-community/).
- Install yarn (package manager). Refer [this](https://yarnpkg.com/lang/en/docs/install/).
- Install Vercel CLI. Refer [this](https://vercel.com/cli).
- Now you have the essentials, Let's move to actual instructions.

  - Clone this repository (Fork is preferred).
  - Install the dependencies.
    ```bash
    yarn
    ```
  - Create `.env` file. This is ignored by git. Copy contents of [.env_template](.env_template) into `.env`.
  - Change Email & Password variables. Contact **[@CITIZENDOT](https://github.com/CITIZENDOT)** for credentials.
  - Start Development Server with below command.
    ```bash
    vercel dev --listen 8000
    ```
  - This starts dev server at http://localhost:8000.

- Done 🎉🎉.
