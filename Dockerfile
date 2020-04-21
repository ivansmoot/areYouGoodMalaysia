FROM node:13.13
ENV NODE_ENV=production
ENV HOST 0.0.0.0
RUN mkdir -p /app
COPY . /app
WORKDIR /app
EXPOSE 80
RUN npm install
# RUN npm run build
RUN npm run js
CMD ["npm", "start"]
