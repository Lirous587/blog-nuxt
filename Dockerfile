FROM node:18.19.0
MAINTAINER Lirous
ENV NODE_ENV=production
ENV HOST 0.0.0.0
RUN mkdir -p /nuxt3
COPY .output/.  /nuxt3
WORKDIR /nuxt3
EXPOSE 80
CMD ["node","./server/index.mjs"]