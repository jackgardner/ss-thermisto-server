FROM quay.io/chronojam/nodejs:latest

ADD .        /thermisto
WORKDIR      /thermisto

# Debugging - Helpful for logs.
RUN node -v

ENTRYPOINT   ["node", "app.js"]
