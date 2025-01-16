# Yoga

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.1.0, along with Java 11, NodeJS 16, MySQL.
Jest and Cypress are used to test in this project.

## Start the project

Git clone:

> git clone https://github.com/OpenClassrooms-Student-Center/P5-Full-Stack-testing

Go inside folder:

> cd yoga

Install dependencies:

> npm install

Launch Front-end:

> npm run start;

## Ressources

### Mockoon env

### Postman collection

For Postman import the collection

> ressources/postman/yoga.postman_collection.json

by following the documentation:

https://learning.postman.com/docs/getting-started/importing-and-exporting-data/#importing-data-into-postman

### MySQL

SQL script for creating the schema is available `ressources/sql/script.sql`

By default the admin account is:

- login: yoga@studio.com
- password: test!1234

### Test

#### E2E

Launching all e2e test:

> npx cypress run

Launching with interactive mode :

> npm run cypress:open

Generate coverage report (you should launch e2e test before):

> npm run e2e:coverage

Report is available here:

> front/coverage/lcov-report/index.html

i've encountered many issues with cypress, instrumented issues and coverage generating.
So if encountering same issues as me with code not instrumented and the coverage file is not displaying any informations.ps : i've already tried a lot of solutions, not working for me.
The only one which worked was :
I added a script to run the project in instrumented mode :

> npm run serve-coverage
> then run the tests :
> npx cypress run  
> And the coverage file should display informations and should be /coverage/icov-report/index.html

#### Unitary test

Launching test:

> npm run test

for following change:

> npm run test:watch

If coverage file not generate in /coverage/jest/icov-report/index.html :

> npm run test:coverage

If you encounter some issues with jest or cypress with syntaxe unknown issue, you can go to tsconfig.json and uncomment the exclude line at the end of the file.
