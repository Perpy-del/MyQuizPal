# MyQuizPal

Welcome to the MyQuizPal Codebase!

This is a software built for students and teachers to create and take quizzes without hassles. Please refer to the documentation for further information.

This repository contains the source code for the MyQuizPal application. The server itself is implemented in node using express. Follow the instructions below to set up the codebase on your local machine.

### Here is the [API Documentation]()

# Table of Contents

- ### [Prerequisites]()

- ### [Installation]()

- ### [Configuration]()

- ### [Directory Structure]()

- ### [Usage]()

- ### [API Documentation]()    

- ### [Postman Documentation]()

- ### [Troubleshooting]()

- ### [Project Status]()

- ### [License]()

- ### [Credits]()

## Prerequisites

**[Back to Table of Contents]()**

Before setting up the codebase, make sure you have the following prerequisites installed:

- Node.js (version 12 or above)
- MongoDB (version 4 or above)
- Git

## Installation

**[Back to Table of Contents]()**

1. Clone the repository using Git:
   ```bash
   git clone https://github.com/Perpy-del/MyQuizPal.git
   ```
2. Change into the project directory:

```bash
   cd sca_ass_seven
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

**[Back to Table of Contents]()**

The codebase requires the following environment configurations:

1. Create a `.env` file in the root directory of the project.
2. Open the `.env` file and add the following configurations:

```bash

```

You can also copy the variables from the `.env.example` file.

## Directory Structure

**[Back to Table of Contents]()**

The codebase follows the following directory structure:

```bash
myquizpal/
└───app
    ├───controllers
    ├───errors
    ├───middlewares
    ├───model
    ├───routes
    ├───utils
    ├───services
    ├───utilities
└───config
└───storage
```

- `app/`:Contains the main source code files
- `config/`:Contains the config files for the codebase.
- `storage/`:Contains the data store files for the codebase.

## Usage

**[Back to Table of Contents]()**

To start the MyQuizPal application on your local environment, run the following command:

npm start

Visit `http://localhost:PORT` in your web browser to access the application.

## API Documentation

**[Back to Table of Contents]()**

API Documentation for the application

**Base URL**
Main URL
https://localhost:HOST

**NOTE**

- Client-Server data transfer (parameters as used in this documentation) should be via the standard JSON format

### ROUTES


## Postman Documentation

**[Back to Table of Contents]()**

- If you would rather use the postman documentation and find it easier to read and understand, here is the [PostmanDocs]()

## MyQuizPal Application

- This is the link of the deployed application on the frontend. [MyQuizPal]()

![Screenshot of MyQuizPal App]()

## Troubleshooting

**[Back to Table of Contents]()**

- If you encounter any issues during the setup process, please ensure that you have the latest versions of Node.js and MongoDB installed.
- If the application fails to start, make sure the MongoDB server is running and accessible.

## Project Status

**[Back to Table of Contents]()**

This app is currently developed and maintained by me. The project is primarily for personal use or demonstration purposes.

## License

**[Back to Table of Contents]()**

This codebase is released under the GNU General Public License(GPL). Please see the LICENSE.md file for more details.

## Credits

**[Back to Table of Contents]()**

The MyQuizPal App codebase is being developed by:
- [Perpetual Meninwa](https://github.com/Perpy-del)
