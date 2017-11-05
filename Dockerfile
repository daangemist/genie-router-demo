FROM node:6

RUN npm install -g genie-router@1.0.0; \
  useradd -s /bin/bash -d /home/app app; \
  mkdir /home/app; chown app:app /home/app

USER app
RUN mkdir /home/app/.genie-router; mkdir /home/app/rivescript
COPY package-demo.json /home/app/.genie-router/package.json
COPY config.json /home/app/.genie-router/
COPY eliza.rive /home/app/rivescript

WORKDIR /home/app/.genie-router
RUN npm install
ENV NODE_ENV=production
ENV DEBUG=genie-router:*

CMD ["genie-router", "-c", "config.json"]
