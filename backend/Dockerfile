# Dockerfile
FROM node:14

ENV nodegroup=node

ENV nodeuser=node

WORKDIR /usr/src/app

COPY package*.json yarn.lock ./
COPY ace /usr/src/app/ace

RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt-get update -qq && apt-get install -y nodejs postgresql-client yarn

# RUN adduser -g ${nodegroup} -s /bin/sh -D ${nodeuser}

RUN chmod -R 754 /usr/src/app/


RUN yarn install

RUN node ace db:seed

COPY . .

EXPOSE 3333

CMD [ "node", "ace", "serve", "--watch" ]
