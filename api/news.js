import fetch from "node-fetch";

const categoryConfig = {
    extreme: {
        query: "extreme weather",
    },
    climate: {
        query: "climate change",
    },
    research: {
        query: "weather research",
    },
    global: {
        query: "global weather events",
    },
};

export default async function handler(req, res) {
    const { category = "all", page = null } = req.query;
    const apiKey = process.env.NEWS_API_KEY;

    if (!apiKey) {
        return res.status(500).json({ error: "News API key not configured" });
    }

    try {
        const categoriesToFetch =
            category === "all" ? Object.keys(categoryConfig) : [category];
        const articles = [];
        const nextPageMap = {};

        for (const cat of categoriesToFetch) {
            const config = categoryConfig[cat];
            const baseUrl = "https://newsdata.io/api/1/news";
            const url = page
                ? `${baseUrl}?apikey=${apiKey}&q=${encodeURIComponent(
                      config.query
                  )}&language=en&page=${page}`
                : `${baseUrl}?apikey=${apiKey}&q=${encodeURIComponent(
                      config.query
                  )}&language=en`;

            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Failed to fetch news for ${cat}`);
            }

            const data = await response.json();
            if (data.status === "success" && data.results) {
                const mappedArticles = data.results.map((article, index) => ({
                    id: `${cat}-${Date.now()}-${index}`,
                    title: article.title || "Untitled Article",
                    excerpt:
                        article.description ||
                        (article.content
                            ? article.content.substring(0, 100)
                            : "No description available"),
                    category: cat,
                    date: article.pubDate
                        ? new Date(article.pubDate).toISOString().split("T")[0]
                        : "Unknown",
                    url: article.link || "#",
                    image:
                        article.image_url || "https://via.placeholder.com/150",
                }));

                articles.push(...mappedArticles);
                if (data.nextPage) {
                    nextPageMap[cat] = data.nextPage;
                }
            }
        }

        res.json({
            articles,
            nextPage: nextPageMap,
        });
    } catch (error) {
        console.error("News API error:", error.message);
        res.status(500).json({ error: error.message });
    }
}
