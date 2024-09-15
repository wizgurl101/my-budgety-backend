# My Budgety Web Application Backend

## Prerequisites

Before you begin, ensure you have Docker installed on your machine. If not, you can download it from [Docker's official website](https://www.docker.com/products/docker-desktop).

## Dev Setup

1. **Build the Docker image**

   Navigate to the project directory in your terminal and run the following command to build a Docker image for your project:

   ```bash
   docker build -t my-budget-backend .
   ```

2. **Run the Docker container**

   After the image has been built, you can run it as a container with the following command:

   ```bash
   docker run -p 5000:5000 my-budget-backend:latest
   ```
