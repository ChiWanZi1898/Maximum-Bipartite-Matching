# pull official base image
FROM node:lts-alpine3.10

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json yarn.lock ./
RUN yarn
COPY . ./
RUN yarn build

EXPOSE 3000
CMD ["serve", "-s", "build"]
