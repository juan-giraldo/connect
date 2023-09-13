# fetch container template
FROM node:16.16.0-bullseye

# Create app directory
WORKDIR /usr/src/app

# copy packages
COPY package.json ./
COPY package-lock.json ./

# copy project files
COPY ./ ./

# run npm install
RUN npm install --force --legacy-peer-deps

# expose ports
EXPOSE 5001

# run app
CMD ["npm","run", "start"]