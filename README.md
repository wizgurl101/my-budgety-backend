# My Budgety API

My Budgety API is my personal project to help me manage my monthly budget.
This API serve the [My Budgety Web Admin Application](https://github.com/wizgurl101/my-budgety-admin-web-app)
In addition, to help me learn and practice the NestJS framework and typescript.

## Dev Setup

### Add a .env file to the root folder of the project with the following content:

- GOOGLE_APPLICATION_CREDENTIALS="{unknown}"
- PROJECT_ID="{unknown}"
- PROJECT_NAME="{unknown}"

## Compile and run project in dev mode

```bash
# development
$ npm run start
```

## API Documentation

### Run the project
```bash
$ npm run start
```

## Dev Setup with Docker

### Build the image
```bash
    docker build -t my-budgety-api .
```

### Run the image
```bash     
docker run -d \
  -p 5000:5000 \
  -e PROJECT_ID={project-id} \
  -e PROJECT_NAME={project-name} \
  -e GOOGLE_APPLICATION_CREDENTIALS={service-account-name.json} \
  -v {path to service account name json} \
  my-budgety-api
```

### Open the browser and go to the following URL: http://localhost:5000/api-doc

## How to run the tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```