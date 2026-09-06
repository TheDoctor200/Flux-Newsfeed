const API_KEY = "366c0d54748d6f108575f3ccbac820fd";

const url = 
  `https://gnews.io/api/v4/search?q=microcontrollers&lang=en&max=5&apikey=${API_KEY}`;

async function getNews() {
  const response = await fetch(url);

  if (!response.ok) {
    console.log("Something went wrong:", response.status);
    return;
  }

  const data = await response.json();

  console.log("\nLATEST MICROCONTROLLER NEWS\n");

  for (const article of data.articles) {
    console.log("📰 " + article.title);
    console.log("🔗 " + article.url);
    console.log("📅 " + article.publishedAt);
    console.log("");
  }
}

getNews();
