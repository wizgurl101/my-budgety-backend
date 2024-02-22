# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory in the container to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the project dependencies
RUN npm install

# If you are building your code for production
# RUN npm ci --only=production

# Copy the rest of the project files to the working directory
COPY . .

# Compile TypeScript to JavaScript
RUN npm run build

# Expose port 8080 for the app
EXPOSE 8080

# Define the command to run the app
CMD [ "node", "dist/index.js" ]