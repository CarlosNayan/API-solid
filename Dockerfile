FROM node:20-alpine3.20 AS builder

WORKDIR /app

RUN apk add --no-cache openssl

COPY package*.json yarn.lock ./

RUN yarn install

COPY src ./src

COPY prisma ./prisma

COPY tsconfig.json tsconfig.build.json ./

RUN npx prisma generate

RUN yarn build

# Api apenas com os pacotes de produção
FROM node:20-alpine3.20 AS stage

RUN apk add --no-cache openssl

WORKDIR /app

RUN npm install -g @vercel/ncc@0.38.2

COPY --from=builder /app/dist .
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/package*.json .
COPY --from=builder /app/yarn.lock .

RUN yarn install --production --frozen-lockfile && yarn cache clean

RUN npx prisma generate

RUN ncc build src/main.js -o ./dist/

# Use uma imagem base leve do Node.js 20
FROM node:22-alpine3.20


# RUN apk update && apk add --no-cache openssl
RUN apk add --no-cache openssl

# Set the working directory to /app
WORKDIR /app

COPY --from=stage /app/dist .
COPY --from=stage /app/dist/client .

RUN rm -rf ./dist/client

# Expose port 3000
EXPOSE 3000

# Start the application
CMD [ "node", "./index.js" ]