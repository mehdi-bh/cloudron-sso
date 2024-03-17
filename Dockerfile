FROM cloudron/base:4.2.0@sha256:46da2fffb36353ef714f97ae8e962bd2c212ca091108d768ba473078319a47f4

RUN mkdir -p /app/code
WORKDIR /app/code

ADD react /app/code/react
WORKDIR /app/code/react
RUN npm i
RUN npm run build

ADD api /app/code/api
WORKDIR /app/code/api
RUN npm i

COPY start.sh /app/pkg/

CMD [ "/app/pkg/start.sh" ]

