FROM node:21

WORKDIR /overwatch

COPY ["package.json", "package-lock.json", "./"]
COPY . .
RUN npm install

EXPOSE 8004

CMD ["npm", "run", "dev"]