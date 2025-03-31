# Etap 1: Build aplikacji node.js
FROM node:18-alpine AS builder

ARG VERSION
ENV VERSION=$VERSION

WORKDIR /app

COPY package.json ./
COPY app.js ./

RUN npm install

# Etap 2: Uruchomienie aplikacji w kontenerze
FROM nginx:alpine

ARG VERSION
ENV VERSION=$VERSION

RUN apk add --no-cache nodejs npm && \
    mkdir -p /usr/share/nginx/html

COPY --from=builder /app /usr/share/nginx/html

WORKDIR /usr/share/nginx/html
RUN npm install

CMD ["node", "app.js"]

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost:3000 || exit 1
