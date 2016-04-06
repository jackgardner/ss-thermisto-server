FROM quay.io/chronojam/nodejs:latest

ADD .        /thermisto
WORKDIR      /thermisto
RUN          npm install


# Debugging - Helpful for logs.
RUN node -v

RUN ls -lrt
ENTRYPOINT   ["node", "app.js"]
