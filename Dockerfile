FROM node:16-alpine as builder

COPY . .

RUN rm -rf node_modules && \
    yarn install --frozen-lockfile && \
    yarn run build

FROM node:16-alpine as runner

WORKDIR /app

COPY --from=builder dist ./dist
COPY --from=builder package.json .
COPY --from=builder yarn.lock .

RUN yarn install --production

ENV HOST=0.0.0.0
EXPOSE 4000

CMD [ "npm", "run", "start:prod" ]