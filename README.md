# Flux-Newsfeed

![GitHub stars](https://img.shields.io/github/stars/TheDoctor200/Flux-Newsfeed?style=for-the-badge&logo=github) ![GitHub forks](https://img.shields.io/github/forks/TheDoctor200/Flux-Newsfeed?style=for-the-badge&logo=github)

Flux-Newsfeed is a small Slack bot that fetches curated news headlines from the GNews API and posts them in Slack channels on demand. It's intended for research and experimental use and currently offers feeds for science, microcontrollers, AI, tech.

Demo: (private Slack test workspace) https://hackclub.enterprise.slack.com/archives/C0C18L17YBA

<img src="./preview.gif" alt="Flux-Newsfeed preview" width="700">

## Features

- Slash-command driven: fetch topic-specific news with a Slack slash command.
- Multiple topics supported out of the box: science, microcontrollers, AI, tech.
- Lightweight, modular command files (.js) so adding a new feed is easy.
- Configurable via environment variables (API keys, default topic, post formatting).
- Designed for local development and simple deployment (Heroku/other Node hosts).

## Prerquirements

- Node.js
- @slack/bolt (Slack app framework)
- dotenv for configuration
- gnews.io for news data (HTTP API)

## How it works (architecture)

1. Slack sends a POST to the app's slash-command endpoint when a user invokes a command.  
2. The app (index.js) routes the request to the matching command module (each command exported from a .js file).  
3. The command module calls the GNews API, formats results, and responds to Slack (either an immediate response or an ephemeral/post message).  
4. All configuration (Slack tokens, GNews API key, optional default topic) comes from environment variables in .env.

## Prerequisites

- Node.js 16+ (or current LTS)
- A Slack app with a Slash Command configured and Bot tokens generated
- A GNews API key (https://gnews.io)

## Environment variables

Create a .env file in the project root with:

```
SLACK_BOT_TOKEN=xoxb-...
SLACK_SIGNING_SECRET=abcdef...
GNEWS_API_KEY=your_gnews_api_key_here
PORT=3000
DEFAULT_TOPIC=science
```

## Installation & run (local)

```bash
# 1. Clone the repo
git clone https://github.com/TheDoctor200/Flux-Newsfeed.git
cd Flux-Newsfeed

# 2. Install dependencies
npm install

# 3. Create .env (see Environment variables above)

# 4. Start the app
node index.js
```

## Usage (slash commands)

Current Commands:

- /fluxnewsfeed help  
  - Shows a short help message with available topics.
- /fluxnewsfeed fetch science  
  - Fetches the latest science headlines.
- /fluxnewsfeed fetch mc  
  - Fetches microcontroller-related headlines.
- /fluxnewsfeed ping  
  - Quick latency/health check for the bot.

Each command is handled by a separate .js file in the commands folder (see Project structure). The command module is responsible for calling GNews, parsing results, and building the Slack response.

## Project structure

```
.
├── commands.js              # individual command modules (e.g., fetch-science.js)
├── node_modules/
├── .env.example             # example env
├── index.js                 # app entry (Slack listeners & routing)
├── package.json
├── preview.gif
└── README.md
```

## Development notes (how I made it)

- Commands are modular JS files that export a handler function. index.js imports / dynamically loads these command files and registers handlers with @slack/bolt
- GNews requests are simple HTTPS GETs with the API key included as a query parameter; responses are filtered to pick top headlines, then formatted as Slack blocks or simple text
- Error handling: commands catch API errors and return user-friendly messages to Slack. For rate limit or network errors, the bot tells the user to try again later (GNews API about 100 Request per day)

## Configuration & extending

To add a new feed/topic:

1. Create a new command file in commands/ (copy an existing fetch-* file).
2. Update index.js to register the new slash subcommand or detection.
3. Test locally using ngrok (a tunnel service, so you don't have to port forward) and add the command to your Slack app configuration if necessary

## Contributing

Pull requests welcome — please open an issue first if you're planning a larger change. Keep changes small and focused; run the app locally to verify behavior.

## License & authors

Just me :)

