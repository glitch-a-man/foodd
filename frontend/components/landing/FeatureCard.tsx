'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface FeatureCardProps {
    icon: ReactNode;
    title: string;
    description: string;
    delay?: number;
}

export default function FeatureCard({ icon, title, description, delay = 0 }: FeatureCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay }}
            className="glass p-8 rounded-3xl border border-white/5 hover:border-primary/50 transition-colors group"
        >
            <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <div className="text-white group-hover:text-primary transition-colors">
                    {icon}
                </div>
            </div>
            <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
            <p className="text-muted-foreground leading-relaxed">
                {description}
            </p>
        </motion.div>
    );
}
