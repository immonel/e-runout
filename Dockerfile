# Build frontend
FROM node:16-alpine as build_frontend
WORKDIR /app
COPY client/package.json ./
COPY client/package-lock.json ./
RUN npm ci --silent
COPY client ./
RUN npm run build

# Copy frontend and build backend
FROM node:16-alpine as dev
WORKDIR /app
COPY --from=build_frontend /app/build ./public
COPY server/package.json ./
COPY server/package-lock.json ./
RUN apk add --no-cache make gcc g++ python3 linux-headers udev
RUN npm ci --silent
COPY server ./

EXPOSE 3000
CMD ["npm", "run", "prod"]
