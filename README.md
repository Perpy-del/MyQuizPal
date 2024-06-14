# MyQuizPal

Welcome to the MyQuizPal Codebase!

This is a software built for students and teachers to create and take quizzes without hassles. Please refer to the documentation for further information.

This repository contains the source code for the MyQuizPal application. The server itself is implemented in node using express. Follow the instructions below to set up the codebase on your local machine.

### Here is the [API Documentation](https://documenter.getpostman.com/view/26756602/2sA3XMj3dx)

# Table of Contents

- ### [Prerequisites](https://github.com/Perpy-del/MyQuizPal?tab=readme-ov-file#prerequisites-1)

- ### [Installation](https://github.com/Perpy-del/MyQuizPal?tab=readme-ov-file#installation-1)

- ### [Configuration](https://github.com/Perpy-del/MyQuizPal?tab=readme-ov-file#configuration-1)

- ### [Directory Structure](https://github.com/Perpy-del/MyQuizPal?tab=readme-ov-file#directory-structure-1)

- ### [Usage](https://github.com/Perpy-del/MyQuizPal?tab=readme-ov-file#usage-1)

- ### [Troubleshooting](https://github.com/Perpy-del/MyQuizPal?tab=readme-ov-file#troubleshooting-1)

- ### [Project Status](https://github.com/Perpy-del/MyQuizPal?tab=readme-ov-file#project-status-1)

- ### [License](https://github.com/Perpy-del/MyQuizPal?tab=readme-ov-file#license-1)

- ### [Credits](https://github.com/Perpy-del/MyQuizPal?tab=readme-ov-file#credits-1)

## Prerequisites

**[Back to Table of Contents](https://github.com/Perpy-del/MyQuizPal?tab=readme-ov-file#table-of-contents)**

Before setting up the codebase, make sure you have the following prerequisites installed:

- Node.js (version 12 or above)
- MongoDB (version 4 or above)
- Git

## Installation

**[Back to Table of Contents](https://github.com/Perpy-del/MyQuizPal?tab=readme-ov-file#table-of-contents)**

1. Clone the repository using Git:
   ```bash
   git clone https://github.com/Perpy-del/MyQuizPal.git
   ```
2. Change into the project directory:

```bash
   cd MyQuizPal
```

3. Install the required dependencies:

```bash
   npm install
```

4. Run the application

```bash
   npm start
```

## Configuration

**[Back to Table of Contents](https://github.com/Perpy-del/MyQuizPal?tab=readme-ov-file#table-of-contents)**

The codebase requires the following environment configurations:

1. Create a `.env` file in the root directory of the project.
2. Open the `.env` file and add the following configurations:

```bash

PORT=my_port


# ==================================== DATABASE ================================================

# DEVELOPMENT
DEV_MONGODB_URL=my_dev_mongo_url
DEV_BCRYPT_SALT_ROUND=my_dev_bcrypt_salt_round

# STAGING
STAGING_MONGODB_URL=my_staging_mongo_url


# ==================================== JWT ==================================================

JWT_EXPIRATION=my_jwt_expiration

# DEVELOPMENT
DEV_APP_SECRET=my_dev_app_secret
DEV_JWT_ISSUER=my_dev_jwt_issuer

# STAGING
STAGING_APP_SECRET=my_staging_app_secret
STAGING_JWT_PUBLIC_FILE=my_staging_jwt_public_file
STAGING_JWT_PRIVATE_FILE=my_staging_jwt_private_file
STAGING_JWT_ISSUER=my_staging_jwt_issuer


# ==================================== NODEMAILER ================================================

NODEMAILER_SERVICE=my_nodemailer_service
NODEMAILER_HOST=my_nodemailer_host
NODEMAILER_PORT=my_nodemailer_port
NODEMAILER_USER=my_nodemailer_user
NODEMAILER_APP_PASSWORD=my_nodemailer_app_passwd

# ==================================== AUTH ==================================

PASSWORD_SECRET_KEY=my_password_secret_key

```

You can also copy the variables from the `.env.example` file.

## Directory Structure

**[Back to Table of Contents](https://github.com/Perpy-del/MyQuizPal?tab=readme-ov-file#table-of-contents)**

The codebase follows the following directory structure:

```bash
myquizpal/
└───app
    ├───http
        ├───controllers
        ├───middlewares
        ├───routes
    ├───errors
    ├───services
    ├───models
    ├───utilities
        ├───templates
    ├───services
    ├───utilities
└───config
└───storage
```

- `app/`:Contains the main source code files
- `config/`:Contains the config files for the codebase.
- `storage/`:Contains the data store files for the codebase.

## Usage

**[Back to Table of Contents](https://github.com/Perpy-del/MyQuizPal?tab=readme-ov-file#table-of-contents)**

To start the MyQuizPal application on your local environment, run the following command:

npm start

Visit `http://localhost:PORT` in your web browser to access the application.

**Base URL**
Main URL
https://myquizpal.onrender.com/api

## MyQuizPal Application

- This is the link of the deployed application on the frontend. [MyQuizPal](https://my-quiz-pal.vercel.app/)

![Screenshot of MyQuizPal App](./image/quizpal.png)

## Troubleshooting

**[Back to Table of Contents](https://github.com/Perpy-del/MyQuizPal?tab=readme-ov-file#table-of-contents)**

- If you encounter any issues during the setup process, please ensure that you have the latest versions of Node.js and MongoDB installed.
- If the application fails to start, make sure the MongoDB server is running and accessible.

## Project Status

**[Back to Table of Contents](https://github.com/Perpy-del/MyQuizPal?tab=readme-ov-file#table-of-contents)**

This app is currently developed and maintained by me. The project is primarily for personal use or demonstration purposes.

## License

**[Back to Table of Contents](https://github.com/Perpy-del/MyQuizPal?tab=readme-ov-file#table-of-contents)**

This codebase is released under the GNU General Public License(GPL). Please see the LICENSE.md file for more details.

## Credits

**[Back to Table of Contents](https://github.com/Perpy-del/MyQuizPal?tab=readme-ov-file#table-of-contents)**

The MyQuizPal App codebase is being developed by:
- [Perpetual Meninwa](https://github.com/Perpy-del)
- [Perpetual Meninwa's Portfolio](https://pm-portfolio-drab.vercel.app/)
- [Perpetual Meninwa's LinkedIn](https://linkedin.com/in/perpydev/)
