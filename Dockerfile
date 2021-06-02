# Specify a base image
FROM node:14.5.0

# Create working directory and copy the app before running yarn install as the artifactory
WORKDIR /usr/src/app
COPY . ./

# Run yarn install
RUN yarn install

# Build the project
RUN yarn run build

# Install serve command for yarn package manager
RUN yarn global add serve

# Navigate to build folder
WORKDIR /usr/src/app/dist

# Start the application
CMD yarn start -p $PORT