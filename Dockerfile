FROM node:21-alpine
WORKDIR /app
COPY package*.json .
RUN npm i
EXPOSE 3000

CMD [ "npm","run","dev" ]