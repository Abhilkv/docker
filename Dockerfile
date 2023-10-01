
FROM node:14

# Create and set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container's working directory
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy the rest of the application source code to the container's working directory
# COPY <src> <dest>
COPY . .

# Expose the port that your Node.js application will listen on
EXPOSE 3000

# Define the command to run your Node.js application
#CMD ["executable", "param1", "param2", ...]
CMD ["node", "server.js"]
    # runs the command node server.js

# docker build -t my-node-app .
# docker run -p 3000:3000 my-node-app

