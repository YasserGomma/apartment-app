FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install && npm install --save-dev @types/semver

COPY . .

RUN npm run build

CMD ["npm", "start"]
