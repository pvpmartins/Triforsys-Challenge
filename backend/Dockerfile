# Dockerfile
FROM node:14

WORKDIR /usr/src/app

COPY package*.json yarn.lock ./

RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt-get update -qq && apt-get install -y nodejs postgresql-client yarn

RUN yarn install

COPY . .

EXPOSE 3333

CMD [ "node", "ace", "serve", "--watch" ]
