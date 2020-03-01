FROM node:alpine

COPY server .
RUN npm i
CMD ["node", "app.js"]
