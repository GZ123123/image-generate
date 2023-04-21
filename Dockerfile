FROM node:18-alpine

COPY .production /src

COPY .next/standalone /src

COPY .next/static src/.next/static

COPY public /src/public

WORKDIR /src

ENV TZ="Asia/Ho_Chi_Minh"

EXPOSE 3000

CMD ["node", "server.js"]