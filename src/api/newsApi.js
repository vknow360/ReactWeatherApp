export const fetchNewsData = async (
    count = 50,
    query = "weather",
    country = "us"
) => {
    // Example RSS feeds for weather, climate, and environment
    const feeds = [
        `https://rss.nytimes.com/services/xml/rss/nyt/Climate.xml`,
        `https://www.sciencedaily.com/rss/earth_climate.xml`,
        `https://www.theguardian.com/environment/climate-crisis/rss`,
        `https://feeds.bbci.co.uk/news/science_and_environment/rss.xml`,
        `https://www.reutersagency.com/en/reuters-best/environment/feed/`,
        `https://www.climatechangenews.com/feed/`,
        `https://www.ecowatch.com/rss`,
    ];
    // Try multiple RSS-to-JSON endpoints for better coverage and thumbnails
    const rssToJsonEndpoints = [
        (feed) =>
            `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(
                feed
            )}`,
        (feed) =>
            `https://feed2json.org/v1/convert?url=${encodeURIComponent(feed)}`,
    ];
    try {
        // Fetch all feeds from all endpoints in parallel
        const allItems = (
            await Promise.all(
                feeds.flatMap((feed) =>
                    rssToJsonEndpoints.map(async (toJsonUrl) => {
                        try {
                            const url = toJsonUrl(feed);
                            const response = await fetch(url);
                            if (!response.ok) return [];
                            const data = await response.json();
                            const items = data.items || data.entries || [];
                            return items;
                        } catch {
                            return [];
                        }
                    })
                )
            )
        ).flat();
        // Filter by query/category if needed
        const filtered = allItems.filter(
            (item) =>
                (item.title &&
                    item.title.toLowerCase().includes(query.toLowerCase())) ||
                (item.description &&
                    item.description
                        .toLowerCase()
                        .includes(query.toLowerCase()))
        );
        // Sort and limit
        const sorted = filtered.sort(
            (a, b) =>
                new Date(b.pubDate || b.published || b.date_published || 0) -
                new Date(a.pubDate || a.published || a.date_published || 0)
        );
        // Normalize and improve thumbnail selection
        return sorted.slice(0, count).map((item) => ({
            title: item.title,
            description: item.description || item.summary || "",
            link: item.link || item.url,
            pubDate: item.pubDate || item.published || item.date_published,
            thumbnail:
                item.thumbnail ||
                item.media_thumbnail?.[0]?.url ||
                item.media_content?.[0]?.url ||
                item.enclosure?.url ||
                item.image ||
                // Try to extract first image from description/summary
                (() => {
                    const html = item.description || item.summary || "";
                    const match = html.match(/<img[^>]+src=["']([^"'>]+)["']/i);
                    return match ? match[1] : null;
                })(),
            categories: item.categories || item.category || [],
        }));
    } catch (error) {
        console.error("RSS scraping error:", error);
        return [];
    }
};
