FROM node:18

WORKDIR /app

COPY package*.json ./

COPY . .

RUN npm run build

CMD ["npm", "start"]
