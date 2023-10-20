FROM node:latest
COPY . /opt/app
WORKDIR /opt/app
RUN adduser app
RUN npm install
RUN npm install --save pm2
RUN chown -R app /opt/app
USER app
EXPOSE 5000
CMD ["npm", "run", "pm2", "--watch"]
