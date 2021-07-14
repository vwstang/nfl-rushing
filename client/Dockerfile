FROM node:14.17.3

WORKDIR /app
COPY ["package.json", "package-lock.json", "./"]
RUN npm install
COPY . .
RUN npm run build
EXPOSE 8888
CMD ["npm","start"]