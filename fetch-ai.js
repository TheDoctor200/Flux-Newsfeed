const axios = require("axios");

module.exports = function (app) {
  app.command("/fluxnewsfeed-fetch-ai", async ({ ack, respond }) => {
    await ack();

    if (!process.env.GNEWS_API_KEY) {
      await respond({ text: "GNEWS_API_KEY is not configured." });
      return;
    }

    try {
      const { data } = await axios.get("https://gnews.io/api/v4/search", {
        params: { q: "AI", lang: "en", max: 5, apikey: process.env.GNEWS_API_KEY }
      });
      const text = (data.articles || [])
        .map((article) => `📰 *${article.title}*\n🔗 ${article.url}`)
        .join("\n\n");
      await respond({ text: text || "No AI news found." });
    } catch (error) {
      console.error("AI news request failed:", error.message);
      await respond({ text: "Unable to fetch AI news right now." });
    }
  });
};


