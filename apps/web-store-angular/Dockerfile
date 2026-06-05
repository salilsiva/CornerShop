FROM node:20-alpine

WORKDIR /src

# install deps first 
COPY package*.json ./
RUN npm install

# copy the rest
COPY . .

EXPOSE 4200
CMD ["npm", "start", "--", "--host", "0.0.0.0", "--poll", "2000"]
