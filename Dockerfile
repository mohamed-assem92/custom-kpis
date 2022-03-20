FROM node:14-alpine AS compiler

LABEL maintainer="Mohamed Assem <mohamed.abdullatief92@gmail.com>"

WORKDIR /app

COPY ./package.json yarn.lock ./

RUN yarn install

COPY ./ ./

RUN yarn build

FROM node:14-alpine

ENV BUILD_PACKAGES="libgcc libstdc++ python3 linux-headers make gcc g++ git libuv bash curl tar bzip2 build-base"

WORKDIR /app

COPY --from=compiler /app/package.json /app/yarn.lock ./

RUN apk --update --no-cache add --virtual .builds-deps ${BUILD_PACKAGES} && \
    apk add ca-certificates && \
    # node_modules
    yarn global add node-gyp && \
    yarn install --prod && \
    chown -R node:node /app && \
    yarn global remove node-gyp && \
    yarn cache clean && \
    apk del .builds-deps && \
    rm -rf /var/cache/apk/* && \
    apk add --no-cache tzdata

COPY --from=compiler --chown=node:node /app/dist ./dist

USER node

CMD node .