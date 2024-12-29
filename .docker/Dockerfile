FROM node:18.19.0
ENV NODE_ENV=production HOST=0.0.0.0
RUN mkdir -p /nuxt3
COPY .output/ /nuxt3

WORKDIR /nuxt3
EXPOSE 3000
CMD ["node", "./server/index.mjs"]
