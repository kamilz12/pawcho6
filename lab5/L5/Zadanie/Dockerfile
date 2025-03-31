# syntax=docker/dockerfile:1.3-labs

FROM node:18-alpine AS builder

ARG VERSION
ENV VERSION=$VERSION

RUN apk update && apk add --no-cache git openssh-client

WORKDIR /app

RUN mkdir -p /root/.ssh && ssh-keyscan github.com >> /root/.ssh/known_hosts

#change me
RUN --mount=type=ssh git clone git@github.com:your_github_name/pawcho6.git /tmp/pawcho6

RUN cp -r /tmp/pawcho6/lab5/L5/Zadanie/* /app/

RUN ls -la /app

RUN npm install

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
