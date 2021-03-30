FROM node:12.18-alpine

ENV NODE_ENV=production

# Install nyc to get coverage, this is part of Istambul 
RUN npm i -g nyc

WORKDIR /usr/src/workspace
COPY ./workspace /usr/src/workspace

EXPOSE 3000

# set user as node
RUN chown -R node:node /usr/src/workspace
USER node
