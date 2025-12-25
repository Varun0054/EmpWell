import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { Shield, Building, MessageSquare, Heart, Info, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';

const CHANNELS = [
    { id: 'stress', label: 'Workplace Stress', icon: '😩' },
    { id: 'culture', label: 'Company Culture', icon: '🏢' },
    { id: 'transition', label: 'Career Transition', icon: '🔄' },
    { id: 'burnout', label: 'Burnout & Recovery', icon: '🔋' },
    { id: 'leadership', label: 'Management & Leadership', icon: '⚖️' },
    { id: 'general', label: 'General Discussion', icon: '💬' },
];

export default function Community() {
    const [selectedOrg, setSelectedOrg] = useState('Tech Corp');
    const [activeChannel, setActiveChannel] = useState('stress');
    const [posts, setPosts] = useState<any[]>([]);
    const [newPostContent, setNewPostContent] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [submitting, setSubmitting] = useState(false);

    // Fetch Posts
    React.useEffect(() => {
        fetchPosts();
    }, [selectedOrg, activeChannel]);

    const fetchPosts = async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/posts?organization=${encodeURIComponent(selectedOrg)}&channel=${encodeURIComponent(activeChannel)}`);
            if (res.ok) {
                const data = await res.json();
                setPosts(data);
            }
        } catch (error) {
            console.error("Failed to fetch posts", error);
            setError("Failed to load posts. Please ensure the backend server is running.");
        } finally {
            setLoading(false);
        }
    };

    // Create Post
    const handleCreatePost = async () => {
        if (!newPostContent.trim() || newPostContent.length < 20) return;

        setSubmitting(true);
        try {
            const res = await fetch('/api/posts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    organization: selectedOrg,
                    channel: activeChannel,
                    content: newPostContent
                })
            });

            if (res.ok) {
                setNewPostContent('');
                fetchPosts(); // Refresh list
            }
        } catch (error) {
            console.error("Failed to create post", error);
        } finally {
            setSubmitting(false);
        }
    };

    // Handle Reaction
    const handleReaction = async (postId: string, type: 'notAlone' | 'helpful') => {
        try {
            const res = await fetch(`/api/posts/${postId}/react`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ type })
            });

            if (res.ok) {
                const updatedPost = await res.json();
                setPosts(posts.map(p => p._id === postId ? updatedPost : p));
            }
        } catch (error) {
            console.error("Failed to react", error);
        }
    };

    return (
        <Layout>
            <div className="max-w-6xl mx-auto">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 md:mb-8 gap-4">
                    <div>
                        <h1 className="text-2xl font-semibold text-calm-800 flex items-center gap-2 flex-wrap">
                            Anonymous Community
                            <span className="text-xs font-normal px-2 py-1 bg-calm-100 text-calm-600 rounded-full border border-calm-200">Beta</span>
                        </h1>
                        <p className="text-calm-500 text-sm mt-1">A psychologically safe space to share experiences, not identities.</p>
                    </div>

                    <div className="flex items-center gap-3 bg-sage-50 px-4 py-2 rounded-xl border border-sage-100 shadow-sm w-full md:w-auto">
                        <Shield className="w-4 h-4 text-sage-600 flex-shrink-0" />
                        <div className="flex flex-col">
                            <span className="text-xs font-semibold text-sage-800">AI Moderated Safe Space</span>
                            <span className="text-[10px] text-sage-600">Zero tolerance for harassment</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">

                    {/* Sidebar: Channels & Org */}
                    <div className="md:col-span-3 space-y-4 md:space-y-6 order-2 md:order-1">

                        {/* Org Selector */}
                        <div className="bg-white p-4 rounded-2xl border border-calm-200 shadow-sm">
                            <label className="text-xs text-calm-500 font-medium mb-2 block uppercase tracking-wide">Organization</label>
                            <div className="flex items-center gap-2 bg-calm-50 p-2 rounded-lg text-calm-800">
                                <Building size={16} className="text-calm-400" />
                                <select
                                    value={selectedOrg}
                                    onChange={(e) => setSelectedOrg(e.target.value)}
                                    className="bg-transparent text-sm font-medium w-full focus:outline-none"
                                >
                                    <option>Tech Corp</option>
                                    <option>Finance Global</option>
                                    <option>Health Plus</option>
                                </select>
                            </div>
                        </div>

                        {/* Channels */}
                        <div className="space-y-1">
                            <h3 className="px-2 text-xs font-medium text-calm-400 uppercase tracking-wider mb-2">Support Channels</h3>
                            {CHANNELS.map(channel => (
                                <button
                                    key={channel.id}
                                    onClick={() => setActiveChannel(channel.id)}
                                    className={cn(
                                        "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 text-left",
                                        activeChannel === channel.id
                                            ? "bg-white text-calm-900 shadow-md ring-1 ring-calm-100"
                                            : "text-calm-500 hover:bg-calm-100/50 hover:text-calm-700"
                                    )}
                                >
                                    <span className="text-lg">{channel.icon}</span>
                                    {channel.label}
                                </button>
                            ))}
                        </div>

                        {/* Safety Notice Sidebar */}
                        <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100">
                            <div className="flex gap-2">
                                <Info className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                                <div>
                                    <h4 className="text-xs font-bold text-blue-800 mb-1">Community Guidelines</h4>
                                    <ul className="text-xs text-blue-700 space-y-1 list-disc pl-3">
                                        <li>Be respectful and empathetic.</li>
                                        <li>No naming specific individuals.</li>
                                        <li>Support, don't debate.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Feed Area */}
                    <div className="md:col-span-9 space-y-6 order-1 md:order-2">

                        {/* Input Area */}
                        <div className="bg-white p-4 rounded-2xl border border-calm-200 shadow-sm flex flex-col gap-3">
                            <textarea
                                value={newPostContent}
                                onChange={(e) => setNewPostContent(e.target.value)}
                                placeholder={`Share your experience in #${CHANNELS.find(c => c.id === activeChannel)?.label}... (Anonymous)`}
                                className="w-full bg-calm-50 rounded-xl px-4 py-3 text-sm text-calm-800 placeholder:text-calm-400 focus:outline-none focus:ring-1 focus:ring-calm-300 resize-none"
                                rows={3}
                            />
                            <div className="flex justify-between items-center">
                                <span className={cn("text-xs", newPostContent.length > 0 && newPostContent.length < 20 ? "text-red-500" : "text-calm-400")}>
                                    {newPostContent.length < 20 && newPostContent.length > 0 ? "Keep writing... (min 20 chars)" : "Your identity is protected."}
                                </span>
                                <button
                                    onClick={handleCreatePost}
                                    disabled={submitting || newPostContent.length < 20}
                                    className="px-4 py-2 bg-sage-600 text-white text-sm font-medium rounded-lg hover:bg-sage-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    {submitting ? 'Posting...' : 'Post Anonymously'}
                                </button>
                            </div>
                        </div>

                        {/* Posts */}
                        <div className="space-y-4">
                            {loading && (
                                <div className="text-center py-10 text-calm-400">Loading community feed...</div>
                            )}

                            {!loading && error && (
                                <div className="bg-red-50 p-4 rounded-xl border border-red-100 text-center">
                                    <p className="text-red-600 text-sm mb-2">{error}</p>
                                    <button
                                        onClick={fetchPosts}
                                        className="text-xs text-red-700 font-medium underline hover:text-red-800"
                                    >
                                        Try Again
                                    </button>
                                </div>
                            )}

                            {!loading && (
                                <AnimatePresence mode='wait'>
                                    {posts.map((post) => (
                                        <motion.div
                                            key={post._id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            className="bg-white p-6 rounded-2xl border border-calm-200 shadow-sm hover:shadow-md transition-shadow"
                                        >
                                            <div className="flex items-center justify-between mb-4">
                                                <div className="flex items-center gap-2">
                                                    <div className="bg-sage-100 p-1.5 rounded-full text-sage-600">
                                                        <Shield size={14} />
                                                    </div>
                                                    <div>
                                                        <span className="text-xs font-bold text-calm-700 block">{post.author}</span>
                                                        <span className="text-[10px] text-calm-400">{post.organization} • {new Date(post.createdAt).toLocaleDateString()}</span>
                                                    </div>
                                                </div>
                                                <div className="px-2 py-1 bg-calm-50 text-calm-500 rounded-lg text-xs font-medium border border-calm-100">
                                                    {CHANNELS.find(c => c.id === post.channel)?.icon} {CHANNELS.find(c => c.id === post.channel)?.label}
                                                </div>
                                            </div>

                                            <p className="text-calm-800 leading-relaxed mb-6 text-sm md:text-base">
                                                {post.content}
                                            </p>

                                            <div className="flex items-center gap-4 pt-4 border-t border-calm-50">
                                                <button
                                                    onClick={() => handleReaction(post._id, 'notAlone')}
                                                    className="flex items-center gap-1.5 text-xs font-medium text-calm-500 hover:text-sage-600 transition-colors"
                                                >
                                                    <Heart size={14} className={post.reactions.notAlone > 0 ? "fill-sage-100 text-sage-500" : ""} />
                                                    You're not alone ({post.reactions.notAlone})
                                                </button>
                                                <button
                                                    onClick={() => handleReaction(post._id, 'helpful')}
                                                    className="flex items-center gap-1.5 text-xs font-medium text-calm-500 hover:text-sage-600 transition-colors"
                                                >
                                                    <ShieldCheck size={14} className={post.reactions.helpful > 0 ? "fill-sage-100 text-sage-500" : ""} />
                                                    Helpful ({post.reactions.helpful})
                                                </button>
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            )}

                            {!loading && posts.length === 0 && (
                                <div className="flex flex-col items-center justify-center py-20 text-center">
                                    <div className="w-16 h-16 bg-calm-50 rounded-full flex items-center justify-center mb-4 text-calm-300">
                                        <MessageSquare size={24} />
                                    </div>
                                    <h3 className="text-calm-800 font-medium">Quiet in here.</h3>
                                    <p className="text-calm-500 text-sm mt-1">Be the first to share safely in this channel.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
