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

### Login with Google Credentials
```bash
    gcloud auth application-default login
```

Upon successful login, the path to the service account name json will be displayed in the terminal. Copy the path to be stored in GOOGLE_APPLICATION_CREDENTIALS environment variable.

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
  -e BIG_QUERY_LOCATION={location can be found in google cloud console for the dataset} \
  -e GOOGLE_APPLICATION_CREDENTIALS={path to service-account-name.json in container} \
  -v {path to service account name json on host machine}:{path to service-account-name.json in container} \
  my-budgety-api
```

### If having issues, use this command to access the container shell
```bash
  docker exec -it {container-name} sh
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