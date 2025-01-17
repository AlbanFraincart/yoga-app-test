# Yoga App !

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.1.0 and Java 11, NodeJS 16, MySQL.

Junit5, mockito and jacoco are used to test in this project.

Database script and postman collection are in Ressources folder

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

Configure database in file src/main/resources/application.properties :

spring.datasource.url=jdbc:mysql://localhost:3306/yoga_db
spring.datasource.username=root
spring.datasource.password=secret

To install :

> mvn clean install

For launch and generate the jacoco code coverage:

> mvn clean verify

3 coverage report (unit, integration and merged) :
back/target/site/...
