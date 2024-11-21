# My Budgety Web Application Backend

## Prerequisites

Before you begin, ensure you have Docker installed on your machine. If not, you can download it from [Docker's official website](https://www.docker.com/products/docker-desktop).

## Dev Setup

1. **Build the Docker image**

   Navigate to the project directory in your terminal and run the following command to build a Docker image for your project:

   ```bash
   docker build -t my-budget-backend .
   ```
2. **Setup GCP service user credentials locally**

   Application Default Credentials (ADC)
   ```bash
   gcloud auth application-default login
   ```

   ```bash
   
      ADC=~/.config/gcloud/application_default_credentials.json \
         docker run \
         <YOUR PARAMS> \
         -e GOOGLE_APPLICATION_CREDENTIALS=/tmp/keys/FILE_NAME.json \
         -v ${ADC}:/tmp/keys/FILE_NAME.json:ro \
         <IMAGE_URL>

   ```

3. **Run the Docker container**

   After the image has been built, you can run it as a container with the following command:

   ```bash
   docker run -p 5000:5000 my-budget-backend:latest
   ```
## Using Swagger UI to see API endpoints

1. Run project in dev mode
   ```bash
   npm run program
   ```
2. Open your browser and navigate to `http://localhost:5000/api-docs`