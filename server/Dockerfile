FROM node:14.17.3

WORKDIR /app
COPY ["package.json", "package-lock.json", "./"]
RUN npm install
COPY . .
EXPOSE 3000
CMD ["node", "src/index.js"]