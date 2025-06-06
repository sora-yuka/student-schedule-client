FROM node:23-slim

WORKDIR /app

COPY package.json .

RUN npm i

COPY . .

EXPOSE 8080

CMD ["npm", "run", "dev", "--", "--host"]