# Check out https://hub.docker.com/_/node to select a new base image
FROM node:18-slim

# Set to a non-root built-in user `node`
USER node

# Create app directory (with user `node`)
RUN mkdir -p /home/node/app

WORKDIR /home/node/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY --chown=node package*.json ./

RUN npm install

# Bundle app source code
COPY --chown=node . .

RUN yarn build

ENV HOST=localhost
ENV PORT=8080
ENV DB_HOST=localhost
ENV DB_PORT=3306
ENV DB_USER=mike
ENV DB_PASSWORD=mike
ENV DB_DATABASE=bolsiyo
ENV JWT_SECRET=secret
ENV JWT_EXPIRES_IN=30d

EXPOSE 8080:8080
CMD [ "node", "." ]
