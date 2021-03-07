FROM node:12.18-alpine

ENV NODE_ENV=production

WORKDIR /usr/src/app
COPY ./app /usr/src/app

EXPOSE 3000

CMD ["node", "/usr/src/app/index.js"]

