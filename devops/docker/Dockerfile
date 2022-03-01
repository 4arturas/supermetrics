FROM node:14 AS build-backend-nodejs
COPY                                server/package.json             backend/package.json
COPY                                server/package-lock.json        backend/package-lock.json
WORKDIR backend
RUN npm ci

FROM node:14 AS build-frontend-nodejs
COPY                                client/package.json            frontend/package.json
COPY                                client/package-lock.json       frontend/package-lock.json
WORKDIR frontend
RUN npm ci

FROM node:14 AS build-frontend
COPY --from=build-frontend-nodejs   frontend/node_modules           frontend/node_modules
COPY                                client/public                   frontend/public
COPY                                client/src                      frontend/src
COPY                                client/package.json             frontend/package.json
COPY                                client/package-lock.json        frontend/package-lock.json
WORKDIR frontend
RUN npm run build

FROM gcr.io/distroless/nodejs:14
COPY --from=build-backend-nodejs    backend/node_modules            server/node_modules
COPY                                server/package.json             server/package.json
COPY                                server/server.js                server/server.js
COPY                                server/randomPosts.js           server/randomPosts.js
COPY                                server/root.js                  server/root.js
COPY                                server/schema.js                server/schema.js
COPY                                server/statistics.js            server/statistics.js
COPY                                server/supermetricsAPI.js       server/supermetricsAPI.js

COPY --from=build-frontend          frontend/build                  client/build

WORKDIR server
EXPOSE 80
CMD ["server.js"]