import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink, Search, MapPin, Lock, ShieldCheck, AlertCircle } from 'lucide-react';
import { cn } from '../lib/utils';

export default function JobAlignment() {
    const [step, setStep] = useState<'input' | 'analyzing' | 'gate' | 'results'>('input');
    const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
    const [experience, setExperience] = useState('0-2 Years');
    const [location, setLocation] = useState('');
    const [accessCode, setAccessCode] = useState('');
    const [error, setError] = useState('');

    const [customSkill, setCustomSkill] = useState('');

    const commonSkills = [
        "Programming", "Data & Analytics", "Design", "Communication",
        "Leadership", "Operations", "Customer Support", "Project Coordination"
    ];

    const toggleSkill = (skill: string) => {
        if (selectedSkills.includes(skill)) {
            setSelectedSkills(prev => prev.filter(s => s !== skill));
        } else {
            setSelectedSkills(prev => [...prev, skill]);
        }
    };

    const addCustomSkill = (e: React.KeyboardEvent | React.MouseEvent) => {
        if (customSkill.trim() && !selectedSkills.includes(customSkill.trim())) {
            setSelectedSkills(prev => [...prev, customSkill.trim()]);
            setCustomSkill('');
        }
    };

    const handleAnalyze = () => {
        if (selectedSkills.length === 0) return;
        setStep('analyzing');
        // ... existing logic ...
        setTimeout(() => {
            setStep('gate');
        }, 1500);
    };

    const handleUnlock = () => {
        // ... existing logic ...
        // Mock Validation Logic
        if (accessCode.trim().toUpperCase() === 'EMPWELL2024') {
            setStep('results');
            setError('');
        } else {
            setError('Invalid access code. Please try again.');
        }
    };

    // ... existing helper functions ...
    // Helper to generate search keywords based on experience
    const getExperienceKeyword = (exp: string) => {
        switch (exp) {
            case '0-2 Years': return 'Junior Entry Level';
            case '3-5 Years': return 'Mid Level';
            case '5-10 Years': return 'Senior';
            case '10+ Years': return 'Principal Lead';
            default: return '';
        }
    };

    // URL Generators
    const generateUrl = (platform: 'linkedin' | 'indeed') => {
        const keywords = `${selectedSkills.join(' ')} ${getExperienceKeyword(experience)}`;
        const query = encodeURIComponent(keywords.trim());
        const loc = encodeURIComponent(location || 'Remote');

        if (platform === 'linkedin') {
            return `https://www.linkedin.com/jobs/search?keywords=${query}&location=${loc}`;
        } else {
            return `https://www.indeed.com/jobs?q=${query}&l=${loc}`;
        }
    };

    return (
        <Layout>
            <div className="max-w-4xl mx-auto min-h-[600px] flex flex-col">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-semibold text-calm-800 mb-2">Live Job Market Explorer</h1>
                    <p className="text-calm-500">Connect to real opportunities tailored to your profile. No scraping, just direct access.</p>
                </div>

                {step === 'input' && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-3xl p-4 md:p-8 shadow-sm border border-calm-200"
                    >
                        <div className="space-y-6">

                            {/* Skills Input */}
                            <div>
                                <div className="flex items-center justify-between mb-3">
                                    <label className="block text-sm font-medium text-calm-700">Core Skills</label>
                                    <span className="text-xs text-calm-500 italic">Use skills you’re comfortable being evaluated on.</span>
                                </div>

                                <div className="flex flex-wrap gap-2 mb-4">
                                    {commonSkills.map(skill => (
                                        <button
                                            key={skill}
                                            onClick={() => toggleSkill(skill)}
                                            className={cn(
                                                "px-4 py-2 rounded-full text-sm border transition-all duration-200",
                                                selectedSkills.includes(skill)
                                                    ? "bg-sage-100 border-sage-500 text-sage-800"
                                                    : "bg-calm-50 border-calm-200 text-calm-600 hover:bg-calm-100"
                                            )}
                                        >
                                            {skill}
                                        </button>
                                    ))}

                                    {/* User Added Skills */}
                                    {selectedSkills.filter(s => !commonSkills.includes(s)).map(skill => (
                                        <button
                                            key={skill}
                                            onClick={() => toggleSkill(skill)}
                                            className="px-4 py-2 rounded-full text-sm border border-sage-500 bg-sage-100 text-sage-800 flex items-center gap-1"
                                        >
                                            {skill} <span className="text-xs ml-1">×</span>
                                        </button>
                                    ))}
                                </div>

                                <div className="flex items-center gap-2">
                                    <input
                                        type="text"
                                        placeholder="+ Add your own skill (e.g. Teaching, Nursing, GIS)"
                                        value={customSkill}
                                        onChange={(e) => setCustomSkill(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && addCustomSkill(e)}
                                        className="flex-1 bg-calm-50 border border-calm-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sage-200 placeholder:text-calm-400"
                                    />
                                    <button
                                        onClick={addCustomSkill}
                                        disabled={!customSkill.trim()}
                                        className="bg-calm-100 text-calm-700 px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-calm-200 disabled:opacity-50 transition-colors"
                                    >
                                        Add
                                    </button>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Experience */}
                                <div>
                                    <label className="block text-sm font-medium text-calm-700 mb-3">Experience Level</label>
                                    <select
                                        value={experience}
                                        onChange={(e) => setExperience(e.target.value)}
                                        className="w-full p-3 rounded-xl border border-calm-200 bg-calm-50 text-calm-800 focus:outline-none focus:ring-2 focus:ring-sage-200"
                                    >
                                        <option>0-2 Years</option>
                                        <option>3-5 Years</option>
                                        <option>5-10 Years</option>
                                        <option>10+ Years</option>
                                    </select>
                                </div>

                                {/* Location */}
                                <div>
                                    <label className="block text-sm font-medium text-calm-700 mb-3">Preferred Location</label>
                                    <div className="relative">
                                        <MapPin className="absolute left-3 top-3.5 text-calm-400 w-4 h-4" />
                                        <input
                                            type="text"
                                            placeholder="e.g. Remote, New York, London"
                                            value={location}
                                            onChange={(e) => setLocation(e.target.value)}
                                            className="w-full p-3 pl-10 rounded-xl border border-calm-200 bg-calm-50 text-calm-800 focus:outline-none focus:ring-2 focus:ring-sage-200"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="pt-6">
                                <button
                                    onClick={handleAnalyze}
                                    disabled={selectedSkills.length === 0}
                                    className="w-full bg-sage-600 text-white rounded-xl py-3 font-medium hover:bg-sage-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Analyze & Find Matches <ArrowRight size={18} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}

                {step === 'analyzing' && (
                    <div className="flex-1 flex flex-col items-center justify-center text-center">
                        <div className="relative w-16 h-16 mb-6">
                            <div className="absolute inset-0 border-4 border-calm-200 rounded-full"></div>
                            <div className="absolute inset-0 border-4 border-sage-500 rounded-full border-t-transparent animate-spin"></div>
                        </div>
                        <h3 className="text-xl font-medium text-calm-800">Preparing live job searches...</h3>
                        <p className="text-calm-500 mt-2">Optimizing keywords for your profile.</p>
                    </div>
                )}

                {step === 'gate' && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white max-w-md mx-auto w-full p-6 md:p-8 rounded-3xl border border-calm-200 shadow-sm text-center"
                    >
                        <div className="w-12 h-12 bg-sage-50 rounded-full flex items-center justify-center mx-auto mb-4 text-sage-600">
                            <Lock size={24} />
                        </div>
                        <h2 className="text-xl font-semibold text-calm-800 mb-2">Access Control</h2>
                        <p className="text-calm-500 mb-6 text-sm">Please enter your EmpWell access code to view live market data.</p>

                        <input
                            type="text"
                            placeholder="Enter Access Code"
                            value={accessCode}
                            onChange={(e) => setAccessCode(e.target.value)}
                            className="w-full text-center p-3 rounded-xl border border-calm-200 bg-calm-50 mb-4 focus:ring-2 focus:ring-sage-200 focus:outline-none uppercase tracking-widest"
                        />

                        {error && (
                            <div className="text-red-500 text-xs mb-4 bg-red-50 p-2 rounded-lg flex items-center justify-center gap-2">
                                <AlertCircle size={12} /> {error}
                            </div>
                        )}

                        <button
                            onClick={handleUnlock}
                            className="w-full bg-calm-800 text-white py-3 rounded-xl font-medium hover:bg-calm-900 transition-colors"
                        >
                            Unlock Results
                        </button>
                        <p className="text-xs text-calm-400 mt-4">Try code: <strong>EMPWELL2024</strong></p>
                    </motion.div>
                )}

                {step === 'results' && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="space-y-6"
                    >
                        <div className="bg-sage-50 border border-sage-100 p-4 rounded-xl flex items-start gap-3">
                            <ShieldCheck className="w-5 h-5 text-sage-700 flex-shrink-0 mt-0.5" />
                            <div>
                                <h4 className="font-medium text-sage-800 text-sm">Access Granted</h4>
                                <p className="text-xs text-sage-600 mt-1">
                                    These links rely on live search queries. EmpWell does not host job listings and does not track your applications.
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* LinkedIn Card */}
                            <a
                                href={generateUrl('linkedin')}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group bg-white p-6 rounded-2xl border border-calm-200 shadow-sm hover:shadow-md transition-all flex flex-col"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div className="font-semibold text-blue-700 bg-blue-50 px-3 py-1 rounded-lg">LinkedIn</div>
                                    <ExternalLink className="w-4 h-4 text-calm-400 group-hover:text-blue-600 transition-colors" />
                                </div>
                                <h3 className="font-medium text-calm-800 mb-1">Search: {getExperienceKeyword(experience)} {selectedSkills[0] || 'Roles'}</h3>
                                <p className="text-sm text-calm-500 mb-6">Best for networking and corporate roles.</p>

                                <div className="mt-auto pt-4 border-t border-calm-100 text-sm font-medium text-blue-600 flex items-center gap-2">
                                    View Live Jobs <ArrowRight size={14} />
                                </div>
                            </a>

                            {/* Indeed Card */}
                            <a
                                href={generateUrl('indeed')}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group bg-white p-6 rounded-2xl border border-calm-200 shadow-sm hover:shadow-md transition-all flex flex-col"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div className="font-semibold text-blue-900 bg-gray-100 px-3 py-1 rounded-lg">Indeed</div>
                                    <ExternalLink className="w-4 h-4 text-calm-400 group-hover:text-blue-900 transition-colors" />
                                </div>
                                <h3 className="font-medium text-calm-800 mb-1">Search: {selectedSkills.join(', ')}</h3>
                                <p className="text-sm text-calm-500 mb-6">Broad range of opportunities including remote work.</p>

                                <div className="mt-auto pt-4 border-t border-calm-100 text-sm font-medium text-blue-800 flex items-center gap-2">
                                    View Live Jobs <ArrowRight size={14} />
                                </div>
                            </a>
                        </div>

                        <div className="text-center pt-8">
                            <button
                                onClick={() => setStep('input')}
                                className="text-calm-500 hover:text-calm-800 text-sm font-medium transition-colors inline-flex items-center gap-2"
                            >
                                <Search size={14} /> Start New Search
                            </button>
                        </div>
                    </motion.div>
                )}
            </div>
        </Layout>
    );
}
