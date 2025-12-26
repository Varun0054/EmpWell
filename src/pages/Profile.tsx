import { useAuth } from '../context/AuthContext';
import { Layout } from '../components/Layout';
import { motion } from 'framer-motion';
import { Mail, Building, Calendar, LogOut, Shield, Sparkles } from 'lucide-react';

const Profile = () => {
    const { user, logout } = useAuth();

    if (!user) return null;

    // Placeholder stats - in a real app these would come from the backend
    const stats = [
        { label: 'Community Posts', value: '0', icon: '📝' },
        { label: 'Job Matches', value: '0', icon: '💼' },
        { label: 'Saved Articles', value: '0', icon: '🔖' },
    ];

    return (
        <Layout>
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-3xl overflow-hidden border border-calm-200 shadow-sm"
                >
                    {/* Header Banner */}
                    <div className="h-32 bg-gradient-to-r from-sage-100 to-calm-100 relative">
                        <div className="absolute top-4 right-4">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/60 backdrop-blur-sm rounded-full text-xs font-medium text-sage-700 border border-white">
                                <Shield size={12} /> Verified Member
                            </span>
                        </div>
                    </div>

                    <div className="px-8 pb-8">
                        {/* Profile Info Section */}
                        <div className="relative -mt-12 flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-8">
                            <div className="flex items-end gap-6">
                                <div className="w-24 h-24 rounded-full bg-white p-1.5 shadow-md">
                                    <div className="w-full h-full rounded-full bg-sage-100 flex items-center justify-center text-3xl font-bold text-sage-600">
                                        {user.name.charAt(0).toUpperCase()}
                                    </div>
                                </div>
                                <div className="mb-2">
                                    <h1 className="text-2xl font-bold text-calm-900">{user.name}</h1>
                                    <p className="text-calm-500 flex items-center gap-2 text-sm">
                                        <Mail size={14} /> {user.email}
                                    </p>
                                </div>
                            </div>

                            <button
                                onClick={logout}
                                className="flex items-center gap-2 px-5 py-2.5 bg-red-50 text-red-600 rounded-xl font-medium hover:bg-red-100 transition-colors text-sm"
                            >
                                <LogOut size={16} /> Sign Out
                            </button>
                        </div>

                        {/* Details Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                            <div className="bg-calm-50/50 p-6 rounded-2xl border border-calm-100">
                                <h3 className="text-sm font-semibold text-calm-400 uppercase tracking-wider mb-4">Account Details</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
                                            <Building size={16} />
                                        </div>
                                        <div>
                                            <p className="text-xs text-calm-400">Organization</p>
                                            <p className="text-calm-800 font-medium">{user.organization || 'Individual Member'}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
                                            <Calendar size={16} />
                                        </div>
                                        <div>
                                            <p className="text-xs text-calm-400">Joined</p>
                                            <p className="text-calm-800 font-medium">December 2025</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gradient-to-br from-sage-50 to-white p-6 rounded-2xl border border-sage-100">
                                <h3 className="text-sm font-semibold text-calm-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                                    <Sparkles size={14} className="text-amber-400" /> Activity Overview
                                </h3>
                                <div className="grid grid-cols-3 gap-4">
                                    {stats.map((stat) => (
                                        <div key={stat.label} className="text-center p-3 bg-white rounded-xl shadow-sm border border-calm-100">
                                            <span className="text-2xl mb-1 block">{stat.icon}</span>
                                            <div className="text-xl font-bold text-calm-800">{stat.value}</div>
                                            <div className="text-[10px] text-calm-500 font-medium uppercase">{stat.label}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Settings / Preferences Placeholder */}
                        <div>
                            <h3 className="text-lg font-semibold text-calm-800 mb-4">Preferences</h3>
                            <div className="bg-white border border-calm-200 rounded-xl divide-y divide-calm-100">
                                <div className="p-4 flex items-center justify-between hover:bg-calm-50 transition-colors cursor-pointer">
                                    <div>
                                        <p className="font-medium text-calm-800">Email Notifications</p>
                                        <p className="text-sm text-calm-500">Manage your digest and community alerts.</p>
                                    </div>
                                    <div className="w-10 h-6 bg-sage-600 rounded-full relative">
                                        <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                                    </div>
                                </div>
                                <div className="p-4 flex items-center justify-between hover:bg-calm-50 transition-colors cursor-pointer">
                                    <div>
                                        <p className="font-medium text-calm-800">Privacy Settings</p>
                                        <p className="text-sm text-calm-500">Control who can see your anonymous alias.</p>
                                    </div>
                                    <div className="text-sm text-sage-600 font-medium">Managed</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </Layout>
    );
};

export default Profile;
