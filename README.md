# PhdAngular

The Idea was to make an User Interface Angular 2+ for the management of PhD
Programs

This interface is based on a back-end already created - but not complete - that will
offer REST services

The development of the application was made following 2 basic steps:
Requirements Analysis and Implementation

## Run
1. Download the [repository](https://github.com/SestoAle/PhdAngular);

2. Go to project folder and execute 'node server.js' to start json-server and jsonwebtoken;

3. Go to project folder and execute 'ng serve' to start the Angular App (through Angular CLI);

4. To log the system, follow the table below:

| Role                                   | Username        | Password |
| ---------------------------------------|-----------------| ---------|
| **Staff Member**                       | staff           | staff    |
| **Coordinator**                        | coord           | coord    |
| **Faculty**                            | faculty         | faculty  |
| **Scholar**                            | scholar         | scholar  |
| **Student**                            | student         | student  |

## Example
Application example:

![Application example](/example/screen.png)

## Requirements
| Software                                                 | Link            | Required |
| ---------------------------------------------------------|-----------------| ---------|
| **json-server**                                          |[here](https://github.com/typicode/json-server)   |    Yes   |
| **jsonwebtoken**                                         |[here](https://github.com/auth0/node-jsonwebtoken)|    Yes   |
| **Angular: 6.0.5**                                       |[here](https://cli.angular.io)|    Yes   |
