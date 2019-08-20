[![Reviewed by Hound](https://img.shields.io/badge/Reviewed_by-Hound-green.svg)](https://houndci.com)

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
    ├── database                 # database configuration
    ├── docs                          # serve static files used in the swagger documentation
    │   ├── swagger    
    │   │   ├── definitions     
    │   │   ├── paths     
    │   │   ├── swagger.js 
    ├── helpers                   # reusable functions across the project
    ├── middlewares                 # route validation functions
    ├── migrations                  # migration dump and script
    ├── seeders                    # seed dump and script
    ├── modules                     # modules for each feature
    │   ├── users                      # users module
    │   │   ├── login.controller.js       
    │   │   ├── login.model.js
    │   │   ├── login.test.js         
    ├── routes                       # API route files
    └── services                     # contains all external services
  ```
