FROM node:10 as build
RUN mkdir /usr/src/app
WORKDIR /usr/src/app
COPY package*.json /usr/src/app/
RUN npm install --silent
COPY . /usr/src/app/
RUN npm run build

# The second stage
FROM nginx:stable-alpine
COPY --from=build /usr/src/app/build /usr/share/nginx/html
CMD ["nginx", "-ag", "daemon off;"]
# RUN rm -rf /etc/nginx/conf.d
