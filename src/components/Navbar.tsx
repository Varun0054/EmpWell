import React from 'react';
import { NavLink } from 'react-router-dom';
import { MessageCircle, Briefcase, Users, Newspaper, Leaf } from 'lucide-react';
import { cn } from '../lib/utils';

export function Navbar() {
    const navItems = [
        { to: '/', label: 'Assistant', icon: MessageCircle },
        { to: '/job-alignment', label: 'Job Framework', icon: Briefcase },
        { to: '/community', label: 'Community', icon: Users },
        { to: '/news', label: 'Insights', icon: Newspaper },
    ];

    return (
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-calm-200">
            <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">

                {/* Logo */}
                <div className="flex items-center gap-2 text-sage-700">
                    <Leaf className="w-6 h-6" />
                    <span className="font-semibold text-lg tracking-tight">EmpWell</span>
                </div>

                {/* Desktop Nav */}
                <div className="flex bg-calm-100/50 p-1 rounded-full gap-1 overflow-x-auto whitespace-nowrap md:overflow-visible max-w-[calc(100vw-120px)] md:max-w-none no-scrollbar">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            className={({ isActive }) =>
                                cn(
                                    "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex-shrink-0",
                                    isActive
                                        ? "bg-white text-sage-700 shadow-sm"
                                        : "text-calm-500 hover:text-calm-700 hover:bg-calm-200/50"
                                )
                            }
                        >
                            <item.icon className="w-4 h-4" />
                            <span>{item.label}</span>
                        </NavLink>
                    ))}
                </div>

                {/* Placeholder for User Profile */}
                <div className="w-8 h-8 rounded-full bg-sage-100 flex items-center justify-center text-sage-600 text-xs font-medium">
                    JD
                </div>
            </div>
        </nav>
    );
}
