FROM node:21

WORKDIR /labyrinth

COPY ["package.json", "package-lock.json", "./"]
COPY . .
RUN npm install

EXPOSE 8002

CMD ["npm", "run", "dev"]