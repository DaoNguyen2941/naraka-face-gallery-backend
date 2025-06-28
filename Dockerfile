FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

COPY wait-for-it.sh .
COPY entrypoint.sh .
RUN chmod +x ./wait-for-it.sh ./entrypoint.sh

EXPOSE 3001

ENV NODE_ENV=development

ENTRYPOINT ["./entrypoint.sh"]
