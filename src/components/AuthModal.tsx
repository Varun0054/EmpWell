import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { X, Lock, Mail, User, Building, ArrowRight, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AuthModal = () => {
    const { isAuthModalOpen, closeAuthModal, login, signup } = useAuth();
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        organization: ''
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Close modal if user clicks outside content
    if (!isAuthModalOpen) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        const endpoint = isLogin ? '/api/auth/login' : '/api/auth/signup';
        const url = `http://localhost:5000${endpoint}`;

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Something went wrong');
            }

            if (isLogin) {
                login(data.token, data.user);
            } else {
                signup(data.token, data.user);
            }

            // Clear form
            setFormData({ name: '', email: '', password: '', organization: '' });

        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={closeAuthModal}
                    className="absolute inset-0 bg-calm-900/40 backdrop-blur-sm"
                />

                {/* Modal Content */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-calm-200"
                >
                    {/* Header / Brand */}
                    <div className="bg-sage-50 px-8 py-6 text-center border-b border-sage-100">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm text-sage-600">
                            <Lock size={20} />
                        </div>
                        <h2 className="text-xl font-semibold text-calm-800">
                            {isLogin ? 'Welcome Back' : 'Join EmpWell'}
                        </h2>
                        <p className="text-calm-500 text-sm mt-1">
                            {isLogin ? 'Access your personalized wellbeing space.' : 'Create your secure, private account.'}
                        </p>
                    </div>

                    <button
                        onClick={closeAuthModal}
                        className="absolute top-4 right-4 p-2 text-calm-400 hover:text-calm-600 hover:bg-calm-100 rounded-full transition-colors"
                    >
                        <X size={20} />
                    </button>

                    <div className="p-8">
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl mb-6 text-sm flex items-center"
                            >
                                <span className="mr-2">⚠️</span> {error}
                            </motion.div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            {!isLogin && (
                                <div className="space-y-1">
                                    <label className="text-xs font-semibold text-calm-500 uppercase tracking-wider ml-1">Full Name</label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-3 text-calm-400" size={18} />
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            placeholder="e.g. Alex Johnson"
                                            className="w-full pl-10 pr-4 py-2.5 bg-calm-50 border border-calm-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sage-200 focus:bg-white transition-all text-calm-800 placeholder:text-calm-400"
                                        />
                                    </div>
                                </div>
                            )}

                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-calm-500 uppercase tracking-wider ml-1">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-3 text-calm-400" size={18} />
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        placeholder="name@company.com"
                                        className="w-full pl-10 pr-4 py-2.5 bg-calm-50 border border-calm-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sage-200 focus:bg-white transition-all text-calm-800 placeholder:text-calm-400"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-calm-500 uppercase tracking-wider ml-1">Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-3 text-calm-400" size={18} />
                                    <input
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                        placeholder="••••••••"
                                        className="w-full pl-10 pr-4 py-2.5 bg-calm-50 border border-calm-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sage-200 focus:bg-white transition-all text-calm-800 placeholder:text-calm-400"
                                    />
                                </div>
                            </div>

                            {!isLogin && (
                                <div className="space-y-1">
                                    <label className="text-xs font-semibold text-calm-500 uppercase tracking-wider ml-1">Organization (Optional)</label>
                                    <div className="relative">
                                        <Building className="absolute left-3 top-3 text-calm-400" size={18} />
                                        <input
                                            type="text"
                                            name="organization"
                                            value={formData.organization}
                                            onChange={handleChange}
                                            placeholder="Your Company"
                                            className="w-full pl-10 pr-4 py-2.5 bg-calm-50 border border-calm-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sage-200 focus:bg-white transition-all text-calm-800 placeholder:text-calm-400"
                                        />
                                    </div>
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full flex items-center justify-center gap-2 py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-sage-600 hover:bg-sage-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500 disabled:opacity-70 disabled:cursor-not-allowed transition-all mt-6"
                            >
                                {isLoading ? <Loader2 className="animate-spin" size={18} /> : null}
                                {isLoading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}
                                {!isLoading && <ArrowRight size={16} />}
                            </button>
                        </form>

                        <div className="mt-6 text-center">
                            <p className="text-sm text-calm-500">
                                {isLogin ? "New to EmpWell? " : "Already have an account? "}
                                <button
                                    onClick={() => {
                                        setIsLogin(!isLogin);
                                        setError('');
                                        setFormData({ name: '', email: '', password: '', organization: '' });
                                    }}
                                    className="text-sage-700 hover:text-sage-800 font-semibold transition-colors"
                                >
                                    {isLogin ? 'Create Account' : 'Sign In'}
                                </button>
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default AuthModal;
