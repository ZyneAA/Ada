FROM node:20

WORKDIR /bridge

COPY ["package.json", "package-lock.json", "./"]
COPY . .
RUN npm install

EXPOSE 8000

CMD ["npm", "run", "dev"]