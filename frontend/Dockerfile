# Start with the official Node.js image
FROM node:16

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN yarn install

# Copy the rest of your app's source code
COPY . .

# Build the app
RUN yarn build

# Expose the port that Next.js will run on
EXPOSE 3000

# Start the app
CMD [ "yarn", "start" ]
