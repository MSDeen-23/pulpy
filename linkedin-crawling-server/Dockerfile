FROM node:lts-alpine

WORKDIR /app

RUN apk update && apk add --no-cache nmap && \
    echo @edge http://nl.alpinelinux.org/alpine/edge/community >> /etc/apk/repositories && \
    echo @edge http://nl.alpinelinux.org/alpine/edge/main >> /etc/apk/repositories && \
    apk update && \
    apk add --no-cache \
    bash \
    g++ \ 
    gcc \
    libgcc \
    make \
    python3 \ 
    chromium \
    harfbuzz \
    "freetype>2.8" \
    ttf-freefont \
    nss

COPY . /app

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

RUN npm install

EXPOSE 8080

CMD ["npm", "start"]