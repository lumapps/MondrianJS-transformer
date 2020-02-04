FROM node:latest
MAINTAINER laurentmox
COPY . /src

WORKDIR /src
RUN yarn install
ENV PATH /src/node_modules/.bin:$PATH
EXPOSE 6916

CMD yarn start && yarn serve
