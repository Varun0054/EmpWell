export default async function handler(req, res) {
    // Vercel Serverless Function to proxy NewsAPI requests
    // This hides the API key from the browser in production

    const { city, page } = req.query;
    const apiKey = process.env.NEWS_API_KEY;

    if (!apiKey) {
        return res.status(500).json({
            status: 'error',
            message: 'Server configuration error: API Key missing'
        });
    }

    // Replicate the Corporate Keywords logic from frontend
    const CORPORATE_KEYWORDS = [
        'layoffs',
        'restructuring',
        'hiring freeze',
        'return to office',
        'corporate policy',
        'workforce',
        'company earnings',
        'business leadership'
    ];

    const baseQuery = `(${CORPORATE_KEYWORDS.join(' OR ')})`;
    const query = city ? `${baseQuery} AND "${city.trim()}"` : baseQuery;

    const url = new URL('https://newsapi.org/v2/everything');
    url.searchParams.append('q', query);
    url.searchParams.append('language', 'en');
    url.searchParams.append('sortBy', 'publishedAt');
    url.searchParams.append('pageSize', '10');
    url.searchParams.append('page', page || '1');
    url.searchParams.append('apiKey', apiKey);

    try {
        const apiRes = await fetch(url.toString());
        const data = await apiRes.json();

        // Forward the status and data
        res.status(apiRes.status).json(data);
    } catch (error) {
        console.error('NewsAPI Proxy Error:', error);
        res.status(500).json({
            status: 'error',
            message: 'Failed to fetch news from upstream provider'
        });
    }
}
