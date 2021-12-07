# WordProgressor

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.1.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

Run `http-server-spa dist/wordProgressor index.html 4200` after an `ng build --prod` to simulate the production server (needed for notification and serviceWorker).

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Deploy to firebase

Bump version in package.json and package-lock.json.
Run `ng build --prod` to build the project for production. The build artifacts will be stored in the `dist/` directory.
Run `firebase deploy` to upload the freshly build version to the [webapp hosted by firebase](https://wordprogressor.web.app).
Make sure that firebase tools are installed and you run `firebase login` beforehand.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
