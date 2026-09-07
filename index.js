require("dotenv").config();

const { App } = require("@slack/bolt");

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true
});

// Load commands
require("./fetch-ai")(app);
require("./fetch-mc")(app);
require("./fetch-science")(app);

// Ping
app.command("/fluxnewsfeed-ping", async ({ ack, respond }) => {
  const start = Date.now();

  await ack();

  const latency = Date.now() - start;

  await respond({
    text: `Pong!\nLatency: ${latency}ms`
  });
});

// Help
app.command("/fluxnewsfeed-help", async ({ ack, respond }) => {
  await ack();

  await respond({
    text:
`*Flux News Feed Commands:*

/fluxnewsfeed-ping
→ Check bot latency

/fluxnewsfeed-help
→ List available commands

/fluxnewsfeed-fetch-ai
→ AI news feed

/fluxnewsfeed-fetch-mc
→ Microcontroller news feed

/fluxnewsfeed-fetch-science
→ Science and technology news feed`
  });
});

(async () => {
  try {
    await app.start();
    console.log("⚡ Flux News Feed bot is running!");
  } catch (error) {
    console.error("Failed to start Flux News Feed bot:", error);
    process.exit(1);
  }
})();
