FROM node:20-alpine

WORKDIR /src

# install deps first 
COPY package*.json ./
<<<<<<< HEAD
RUN npm ci
=======
RUN npm install
>>>>>>> 40a0df5d5595e752474779c051428989b1308d28

# copy the rest
COPY . .

EXPOSE 4200
CMD ["npm", "start", "--", "--host", "0.0.0.0", "--poll", "2000"]
