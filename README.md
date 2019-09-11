[![Reviewed by Hound](https://img.shields.io/badge/Reviewed_by-Hound-green.svg)](https://houndci.com) [![Build Status](https://travis-ci.com/andela/nightcrawler-backend.svg?branch=develop)](https://travis-ci.com/andela/nightcrawler-backend) [![Coverage Status](https://coveralls.io/repos/github/andela/nightcrawler-backend/badge.svg?branch=develop)](https://coveralls.io/github/andela/nightcrawler-backend?branch=develop)

# Barefoot Nomad - Making company travel and accomodation easy and convinient.

## Vision

Make company global travel and accommodation easy and convenient for the strong workforce of savvy members of staff, by leveraging the modern web.

---
# Setup Dotenv

#### A .env file is used to store configuration files especialy about development and testing.

#### Guide to use dotenv in this project

- Install dotenv package as a project dependency using "npm install dotenv" or "yarn add dotenv"
- Create .env file in project root directory.
- Add environment variables to .env file as seen in the .env.example file in the root folder.

## Project top-level directory structure

```    
src
    ├── config
    │   ├── constants.js           #  constants and environment variables
    ├── controllers               
    ├── database
        ├── config                  # database configuration file
        ├── migrations                  # migration dump and script
        ├── seeders                       # API route files
    ├── docs                          # serve static files used in the swagger documentation
    │   ├── swagger    
    │   │   ├── definitions     
    │   │   ├── paths     
    │   │   ├── swagger.js
    ├── helpers                   # reusable functions across the project
    ├── middlewares                 # route validation functions
    ├── models                      # tables models
    ├── routes.js               # general routes for all modules
        ├── api   
            ├── example.routes.js    # example route
        ├── index.js               # entry file for all routes
    ├── services
    └── tests                       # integration test files
  ```





















