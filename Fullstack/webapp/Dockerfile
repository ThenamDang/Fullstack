FROM node:latest
COPY . /opt/app
COPY create-env-file.sh /opt/app/create-env-file.sh
WORKDIR /opt/app

ARG REACT_APP_BACKEND_PORT
RUN sh create-env-file.sh REACT_APP_BACKEND_PORT=$REACT_APP_BACKEND_PORT

RUN npm install
CMD ["npm", "start"]