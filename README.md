genie-router-demo
=================

This repository contains both the _Dockerfile_ with the instructions to run the
demo setup, as the demo plugin, which generates a demo page.

# Building and running the demo setup using Docker

The demo uses several plugins (api-http, telegram-bot, facebook-messenger, dashbot,
rivescript, sentry and brain-mentions). Some of them have private tokens, they are
configured using an environment file when runing the container.

## Environment variables

Copy `.env.example` to `.env`, and fill in the values for each service:

- TELEGRAM_TOKEN, the telegram bot token
- DIALOGFLOW_TOKEN, the dialogflow api token for your agent
- MESSENGER_TOKEN, the Facebook Messenger page token
- TRACKING_ID, the Google Analytics tracking identifier
- DASHBOT_TOKEN, the dashbot bot token
- SENTRY_DSN, the DSN from the project at sentry.io

## Build image

Use the following command to build the image, the _node:6_ base image is used,
which supports different architectures. So you can run this on a desktop pc or server (amd64),
but also a Raspberry Pi or Odroid server (arm7/8 or aarch64).

    docker build -t matueranet/genie-router-demo .

## Running the container

This will run the container, and restart in the event that is crashes.

    docker run --restart=always -d --env-file=.env -p=8080:8080 --name=genie-router-demo matueranet/genie-router-demo

It is advised, because of the nature of the demo, to create a cron script which periodically
restarts kills and restart the container.

# Plugin Configuration

Add an attribute `demo` to the `plugins` section in the _genie-router_ configuration
section. The configuration options are:

- endpoint, the genie-router [HTTP API](https://github.com/matueranet/genie-router-plugin-api-http) endpoint prefix, with no trailing /
- tracking_id, the google analytics tracking-id to use.
