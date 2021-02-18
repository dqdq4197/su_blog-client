FROM node:10 as builder
RUN mkdir /usr/src/app
WORKDIR /usr/src/app
ENV PATH /usr/src/app/node_modules/.bin:${PATH}
COPY package*.json /usr/src/app/package.json
RUN npm install --silent
COPY . /usr/src/app
RUN npm run build
FROM nginx:stable-alpine
COPY --from=build /usr/src/app/build /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
RUN rm -rf /etc/nginx/conf.d
