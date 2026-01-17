'use client';

import Link from 'next/link';
import { UtensilsCrossed } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Navbar() {
    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5 px-6 py-4"
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                        <UtensilsCrossed className="text-primary w-6 h-6" />
                    </div>
                    <span className="font-bold text-xl tracking-tight text-white">
                        Food<span className="text-primary">Reels</span>
                    </span>
                </Link>

                <div className="flex items-center gap-6">
                    <Link
                        href="/login"
                        className="text-sm font-medium text-muted-foreground hover:text-white transition-colors"
                    >
                        Login
                    </Link>
                    <Link
                        href="/register"
                        className="bg-white text-black px-5 py-2.5 rounded-full text-sm font-bold hover:bg-gray-200 transition-transform active:scale-95"
                    >
                        Get Started
                    </Link>
                </div>
            </div>
        </motion.nav>
    );
}
