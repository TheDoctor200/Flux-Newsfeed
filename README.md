# Flux-Newsfeed

![GitHub stars](https://img.shields.io/github/stars/TheDoctor200/Flux-Newsfeed?style=for-the-badge\&logo=github) ![GitHub forks](https://img.shields.io/github/forks/TheDoctor200/Flux-Newsfeed?style=for-the-badge\&logo=github)

A small Slack bot that grabs news from the [GNews API](https://gnews.io) and posts it to Slack.

It's mainly a little research/experimental project. Right now it has feeds for **science, microcontrollers, AI, and tech**.

## What it does

* `/fluxnewsfeed help` — show available commands
* `/fluxnewsfeed fetch science` — get science news
* `/fluxnewsfeed fetch mc` — get microcontroller news
* `/fluxnewsfeed ping` — check if the bot is alive

Adding another topic is pretty easy — feeds are kept in separate JS files.

## Setup

You'll need:

* Node.js 16+
* A Slack app with a slash command
* A [GNews API key](https://gnews.io)

Clone the repo and install the dependencies:

```bash
git clone https://github.com/TheDoctor200/Flux-Newsfeed.git
cd Flux-Newsfeed
npm install
```

Then create a `.env` file:

```env
SLACK_BOT_TOKEN=xoxb-...
SLACK_SIGNING_SECRET=...
GNEWS_API_KEY=...
PORT=3000
DEFAULT_TOPIC=science
```

Start it with:

```bash
node index.js
```

For local Slack testing, I used **ngrok** to expose the local server.

## Project structure

```text
.
├── commands/
├── index.js
├── .env.example
├── package.json
└── preview.gif
```

`index.js` handles Slack and routes commands, while the files in `commands/` handle the individual feeds.

## Notes

GNews has a daily request limit, so don't spam the commands.

This project is mostly for experimenting with Slack bots and news APIs. Contributions are welcome!

**Made by me :)**

