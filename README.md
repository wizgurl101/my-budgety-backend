# My Budget Web Application Backend

## Prerequisites

Before you begin, ensure you have Docker installed on your machine. If not, you can download it from [Docker's official website](https://www.docker.com/products/docker-desktop).

## Dev Setup

1. **Build the Docker image**

   Navigate to the project directory in your terminal and run the following command to build a Docker image for your project:

   ```bash
   docker build -t my-budget-backend .
   ```

   This command builds a new Docker image and tags it as `my-budget-backend:latest`. The `.` at the end of the command tells Docker to look for a `Dockerfile` in the current directory.

2. **Run the Docker container**

   After the image has been built, you can run it as a container with the following command:

   ```bash
   docker run -p 8000:3000 my-budget-backend:latest
   ```

   This command tells Docker to run a new container from the `my-budget-backend:latest` image. The `-p 8000:3000` option tells Docker to map port 8000 on your machine to port 8000 on the container.

   Now, your application should be running at `http://localhost:8000`.

## Stopping the Container

To stop the Docker container, you can use the `docker stop` command followed by the container ID or name. You can find the container ID by running `docker ps`.

```bash
docker stop <container-id>
```
