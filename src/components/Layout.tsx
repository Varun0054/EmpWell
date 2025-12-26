import React from 'react';
import Navbar from './Navbar';
import { motion } from 'framer-motion';

export function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen flex flex-col font-sans text-calm-800 bg-calm-50 overflow-x-hidden">
            <Navbar />
            <main className="flex-1 w-full max-w-5xl mx-auto px-4 md:px-6 py-6 md:py-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                >
                    {children}
                </motion.div>
            </main>

            <footer className="py-6 text-center text-calm-400 text-sm">
                <p>&copy; 2026 EmpWell. Designed for your peace of mind.</p>
                <p>Developed by V@run</p>
            </footer>
        </div>
    );
}
