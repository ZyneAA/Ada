FROM node:22-alpine

WORKDIR /express_server

COPY ["package.json", "package-lock.json", "./"]
COPY . .
RUN npm install

EXPOSE 8000

CMD ["npm", "run", "dev"]