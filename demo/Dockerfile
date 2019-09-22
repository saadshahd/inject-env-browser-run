# Serving stage
FROM node:10.16.0-alpine as production-stage

# Install serve
RUN npm install -g serve
RUN npm install -g inject-env-browser-run

EXPOSE 5000

CMD ["inject-env-browser-run --dest src/foo/bar && serve"]
