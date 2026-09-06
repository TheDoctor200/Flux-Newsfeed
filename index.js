require("dotenv").config();

const axios = require("axios");
const { App } = require("@slack/bolt");

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true
});

app.command("/fluxnewsfeed-ping", async ({ command, ack, respond }) => {
  const start = Date.now();
  await ack();
  const latency = Date.now() - start;
  await respond({ text: `Pong!\nLatency: ${latency}ms` });
});

app.command("/fluxnewsfeed-help", async ({ ack, respond }) => {
  await ack();
  await respond({
    text:
`Available Commands:
/fluxnewsfeed-ping - Check bot latency
/fluxnewsfeed-help - List available commands
/fluxneewsfeed-fetch-ai - AI news feed
/fluxnewsfeed-fetch-mc - Microcontroller news feeed
/fluxnewsfeed-fetch-sciencex - Science and technology news feed

`
  });
});

(async () => {
  await app.start();
  console.log("bot is running!");
})();