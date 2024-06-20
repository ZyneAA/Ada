FROM node:20

WORKDIR /client

COPY ["package.json", "package-lock.json", "./"]
COPY . .
RUN npm install

EXPOSE 8001

CMD ["npm", "run", "dev"]