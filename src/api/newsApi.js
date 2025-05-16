export const fetchNewsData = async (
    count = 50,
    category = "all",
    page = null
) => {
    // Use your Vercel serverless function endpoint
    let url = `/api/news?category=${encodeURIComponent(category)}`;
    if (page) url += `&page=${encodeURIComponent(page)}`;
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch news");
        const data = await response.json();
        // Normalize for frontend
        return (data.articles || []).map((article) => ({
            title: article.title,
            description: article.excerpt,
            link: article.url,
            pubDate: article.date,
            thumbnail: article.image,
            categories: [article.category],
        }));
    } catch (error) {
        console.error("News API error:", error);
        return [];
    }
};
