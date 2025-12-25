import React, { useState, useEffect } from 'react';
import { Layout } from '../components/Layout';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Globe, ChevronRight, Clock, Building, X, AlertCircle, Loader2, ExternalLink } from 'lucide-react';

// Types
interface Article {
    source: { id: string | null; name: string };
    author: string | null;
    title: string;
    description: string;
    url: string;
    urlToImage: string | null;
    publishedAt: string;
    content: string;
}

const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const BASE_URL = 'https://newsapi.org/v2/everything';

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

export default function News() {
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [searchCity, setSearchCity] = useState('');
    const [page, setPage] = useState(1);
    const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
    const [totalResults, setTotalResults] = useState(0);

    // Initial Fetch
    useEffect(() => {
        fetchNews(1, searchCity, true);
    }, []);

    const buildQuery = (city: string) => {
        const baseQuery = `(${CORPORATE_KEYWORDS.join(' OR ')})`;
        if (city.trim()) {
            return `${baseQuery} AND "${city.trim()}"`;
        }
        return baseQuery;
    };

    const fetchNews = async (pageNum: number, city: string, isReset: boolean = false) => {
        if (isReset) {
            setLoading(true);
            setError(null);
        } else {
            setLoadingMore(true);
        }

        try {
            const query = buildQuery(city);
            // Construct URL with params manually to ensure correct formatting
            const url = new URL(BASE_URL);
            url.searchParams.append('q', query);
            url.searchParams.append('language', 'en');
            url.searchParams.append('sortBy', 'publishedAt');
            url.searchParams.append('pageSize', '10');
            url.searchParams.append('page', pageNum.toString());
            url.searchParams.append('apiKey', API_KEY);
            // Optional: Filter by trusted domains if needed, but 'everything' endpoint is broad.
            // url.searchParams.append('domains', 'reuters.com,bloomberg.com,...'); 

            const res = await fetch(url.toString());
            const data = await res.json();

            if (data.status === 'error') {
                throw new Error(data.message || 'Failed to fetch news');
            }

            if (isReset) {
                setArticles(data.articles);
            } else {
                setArticles(prev => [...prev, ...data.articles]);
            }
            setTotalResults(data.totalResults);

        } catch (err: any) {
            setError(err.message || 'Unable to load news right now. Please try again later.');
        } finally {
            setLoading(false);
            setLoadingMore(false);
        }
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setPage(1);
        fetchNews(1, searchCity, true);
    };

    const handleLoadMore = () => {
        const nextPage = page + 1;
        setPage(nextPage);
        fetchNews(nextPage, searchCity, false);
    };

    // Helper to format date
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    return (
        <Layout>
            <div className="max-w-6xl mx-auto px-4 md:px-0">
                {/* Header Section */}
                <div className="mb-10 text-center md:text-left">
                    <h1 className="text-3xl font-semibold text-calm-800 mb-3 flex items-center justify-center md:justify-start gap-3">
                        <Globe className="text-sage-600" size={28} />
                        Corporate News & Insights
                    </h1>
                    <p className="text-calm-500 max-w-2xl">
                        Stay informed with the latest developments in the corporate world.
                        Curated for transparency and awareness.
                    </p>

                    {/* Mandatory Disclaimer */}
                    <div className="mt-4 inline-block bg-amber-50 border border-amber-100 px-4 py-2 rounded-lg">
                        <p className="text-xs text-amber-700 flex items-center gap-2">
                            <AlertCircle size={14} />
                            Corporate news reflects real-world events. Different individuals may interpret this information differently.
                        </p>
                    </div>
                </div>

                {/* Search Section */}
                <div className="bg-white p-4 md:p-6 rounded-2xl border border-calm-200 shadow-sm mb-8">
                    <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4 items-center">
                        <div className="relative flex-1 w-full">
                            <Building className="absolute left-4 top-1/2 -translate-y-1/2 text-calm-400" size={18} />
                            <input
                                type="text"
                                value={searchCity}
                                onChange={(e) => setSearchCity(e.target.value)}
                                placeholder="Enter city (e.g., Pune, Bangalore)"
                                className="w-full pl-12 pr-4 py-3 bg-calm-50 border border-calm-200 rounded-xl text-calm-800 focus:outline-none focus:ring-2 focus:ring-sage-200 focus:border-sage-400 transition-all text-sm md:text-base"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full md:w-auto px-8 py-3 bg-sage-600 text-white font-medium rounded-xl hover:bg-sage-700 transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
                        >
                            {loading && searchCity ? <Loader2 className="animate-spin" size={18} /> : <Search size={18} />}
                            {searchCity ? 'Search Region' : 'Search News'}
                        </button>
                    </form>
                </div>

                {/* Content Area */}
                {loading && !articles.length ? (
                    <div className="flex flex-col items-center justify-center py-20 text-calm-400">
                        <Loader2 className="animate-spin mb-4" size={32} />
                        <p>Fetching corporate news...</p>
                    </div>
                ) : error ? (
                    <div className="text-center py-20">
                        <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <AlertCircle className="text-red-500" size={24} />
                        </div>
                        <h3 className="text-lg font-medium text-calm-800 mb-2">Message from News Provider</h3>
                        <p className="text-red-600 max-w-md mx-auto bg-red-50 p-4 rounded-xl text-sm border border-red-100">
                            {error}
                        </p>
                        <button
                            onClick={() => fetchNews(1, searchCity, true)}
                            className="mt-6 text-sage-600 hover:text-sage-700 font-medium text-sm underline"
                        >
                            Try Again
                        </button>
                    </div>
                ) : (
                    <>
                        {articles.length === 0 ? (
                            <div className="text-center py-20 text-calm-500">
                                <p className="text-lg">No corporate news found matching your criteria.</p>
                                <p className="text-sm mt-2">Try searching for a different city or clearing the search.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                                {articles.map((article, idx) => (
                                    <motion.div
                                        key={`${article.url}-${idx}`}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.05 }}
                                        onClick={() => setSelectedArticle(article)}
                                        className="bg-white p-6 rounded-2xl border border-calm-200 shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col h-full"
                                    >
                                        <div className="flex justify-between items-start mb-3">
                                            <span className="text-xs font-semibold px-2 py-1 bg-calm-100 text-calm-600 rounded-md">
                                                {article.source.name || 'Unknown Source'}
                                            </span>
                                            <span className="text-xs text-calm-400 flex items-center gap-1">
                                                <Clock size={12} />
                                                {formatDate(article.publishedAt)}
                                            </span>
                                        </div>

                                        <h2 className="text-lg font-bold text-calm-900 mb-3 leading-snug group-hover:text-sage-700 transition-colors line-clamp-2">
                                            {article.title}
                                        </h2>

                                        <p className="text-calm-600 text-sm leading-relaxed mb-4 line-clamp-3">
                                            {article.description || 'No description available for this article.'}
                                        </p>

                                        <div className="mt-auto flex items-center text-sage-600 text-sm font-medium">
                                            Read More <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        )}

                        {/* Pagination */}
                        {articles.length > 0 && articles.length < totalResults && (
                            <div className="mt-12 text-center">
                                <button
                                    onClick={handleLoadMore}
                                    disabled={loadingMore}
                                    className="px-6 py-3 bg-white border border-calm-200 text-calm-600 font-medium rounded-xl hover:bg-calm-50 transition-colors disabled:opacity-50"
                                >
                                    {loadingMore ? (
                                        <span className="flex items-center gap-2">
                                            <Loader2 className="animate-spin" size={16} /> Loading more...
                                        </span>
                                    ) : (
                                        "See More News"
                                    )}
                                </button>
                                <p className="text-xs text-calm-400 mt-2">
                                    Displaying {articles.length} of {totalResults} articles
                                </p>
                            </div>
                        )}
                    </>
                )}

                {/* Article Modal */}
                <AnimatePresence>
                    {selectedArticle && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setSelectedArticle(null)}
                                className="absolute inset-0 bg-calm-900/60 backdrop-blur-sm"
                            />

                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                                className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
                            >
                                {/* Modal Header */}
                                <div className="p-6 border-b border-calm-100 flex justify-between items-start bg-calm-50/50">
                                    <div className="pr-8">
                                        <div className="flex items-center gap-3 mb-3">
                                            <span className="text-sm font-bold text-sage-700 bg-sage-50 px-3 py-1 rounded-full border border-sage-100">
                                                {selectedArticle.source.name}
                                            </span>
                                            <span className="text-sm text-calm-500">
                                                {formatDate(selectedArticle.publishedAt)}
                                            </span>
                                        </div>
                                        <h2 className="text-2xl font-bold text-calm-900 leading-tight">
                                            {selectedArticle.title}
                                        </h2>
                                    </div>
                                    <button
                                        onClick={() => setSelectedArticle(null)}
                                        className="p-2 hover:bg-calm-100 rounded-full text-calm-500 transition-colors"
                                    >
                                        <X size={24} />
                                    </button>
                                </div>

                                {/* Modal Content - Scrollable */}
                                <div className="p-8 overflow-y-auto">
                                    {selectedArticle.urlToImage && (
                                        <img
                                            src={selectedArticle.urlToImage}
                                            alt={selectedArticle.title}
                                            className="w-full h-64 object-cover rounded-xl mb-6 border border-calm-100"
                                            onError={(e) => (e.currentTarget.style.display = 'none')}
                                        />
                                    )}

                                    <div className="prose prose-calm max-w-none text-calm-700 leading-relaxed text-lg">
                                        <p className="font-medium text-xl mb-4 text-calm-900">
                                            {selectedArticle.description}
                                        </p>
                                        <p>
                                            {selectedArticle.content?.replace(/\[\+\d+ chars\]/, '')}
                                        </p>
                                        <div className="mt-8 p-6 bg-calm-50 rounded-2xl border border-calm-100 text-center">
                                            <p className="text-calm-500 mb-4 text-sm">
                                                To read the full in-depth story, please visit the source.
                                            </p>
                                            <a
                                                href={selectedArticle.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 px-6 py-3 bg-calm-800 text-white font-medium rounded-xl hover:bg-calm-900 transition-colors"
                                            >
                                                Read full article on {selectedArticle.source.name}
                                                <ExternalLink size={16} />
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                {/* Modal Footer */}
                                <div className="p-4 border-t border-calm-100 bg-white flex justify-end">
                                    <button
                                        onClick={() => setSelectedArticle(null)}
                                        className="px-6 py-2.5 text-calm-600 font-medium hover:bg-calm-50 rounded-lg transition-colors"
                                    >
                                        Back to News
                                    </button>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </Layout>
    );
}
