FROM alpine:3.11 as builder
RUN apk --no-cache add gcc g++ make python nodejs npm

WORKDIR /randomapp
COPY package-lock.json ./package-lock.json
COPY package.json ./package.json
RUN npm ci
COPY . .
RUN npm run build && rm -rf node_modules && npm ci --production

FROM alpine:3.11
RUN apk --no-cache add nodejs
WORKDIR /randomapp
RUN mkdir /randomapp/dist
COPY --from=builder /randomapp/node_modules ./node_modules
COPY --from=builder /randomapp/dist ./dist
COPY --from=builder /randomapp/server.js .
CMD ["node", "server"]
