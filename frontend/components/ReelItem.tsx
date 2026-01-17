'use client';

import { useRef, useEffect, useState } from 'react';
import { Heart, Send, Clock, Star } from 'lucide-react';
import { useGesture } from 'react-use-gesture';
import { motion, useAnimation } from 'framer-motion';

interface ReelItemProps {
    dish: any;
    isActive: boolean;
    onOpenOrder: () => void;
}

export default function ReelItem({ dish, isActive, onOpenOrder }: ReelItemProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isLiked, setIsLiked] = useState(false);
    const controls = useAnimation();

    useEffect(() => {
        if (isActive) {
            videoRef.current?.play().catch(e => console.log('Autoplay blocked:', e));
        } else {
            videoRef.current?.pause();
            if (videoRef.current) videoRef.current.currentTime = 0;
        }
    }, [isActive]);

    const bind = useGesture({
        onDragEnd: ({ movement: [mx] }) => {
            // Swipe Left (mx < -50) to Order
            if (mx < -50) {
                onOpenOrder();
            }
        }
    });

    return (
        <div
            {...bind()}
            className="full-screen snap-center relative bg-black flex items-center justify-center overflow-hidden touch-none"
        >
            {/* Video Layer - Optimized */}
            <div className="absolute inset-0 w-full h-full bg-black">
                <video
                    ref={videoRef}
                    src={dish.videoUrl}
                    className="w-full h-full object-cover will-change-transform"
                    loop
                    playsInline
                    muted
                    preload="metadata"
                />
            </div>

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/80 pointer-events-none will-change-transform" />

            {/* Info Layer */}
            <div className="absolute bottom-0 left-0 right-0 p-6 pb-12 flex flex-col gap-3 pointer-events-none will-change-transform translate-z-0">

                <div className="flex items-center gap-2 mb-1">
                    <span className="bg-white/20 backdrop-blur-md px-2 py-1 rounded-md text-xs font-medium flex items-center gap-1">
                        <Clock size={12} /> {dish.eta}
                    </span>
                    <span className="bg-orange-500 text-white px-2 py-1 rounded-md text-xs font-bold flex items-center gap-1">
                        <Star size={12} fill="currentColor" /> {dish.rating}
                    </span>
                </div>

                <h2 className="text-3xl font-bold leading-tight shadow-sm">{dish.name}</h2>
                <div className="flex items-center justify-between">
                    <p className="text-xl font-medium text-white/90">{dish.restaurant}</p>
                    <p className="text-2xl font-bold text-white">${dish.price}</p>
                </div>
            </div>

            {/* Side Actions (Right Side) */}
            <div className="absolute right-4 bottom-24 flex flex-col gap-6 items-center pointer-events-auto">
                <button
                    onClick={() => setIsLiked(!isLiked)}
                    className="p-3 rounded-full bg-black/40 backdrop-blur-md active:scale-90 transition-transform"
                >
                    <Heart size={28} className={isLiked ? "fill-red-500 text-red-500" : "text-white"} />
                </button>
                <button className="p-3 rounded-full bg-black/40 backdrop-blur-md active:scale-90 transition-transform">
                    <Send size={28} />
                </button>
            </div>

            {/* Hint Arrow (Right Side pointing Left) */}
            {isActive && (
                <motion.div
                    initial={{ x: 0, opacity: 0 }}
                    animate={{ x: -10, opacity: 1 }}
                    transition={{ repeat: Infinity, duration: 1.5, repeatType: 'reverse', delay: 1 }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none"
                >
                    <span className="text-white/80 text-sm font-bold shadow-black drop-shadow-md">Order</span>
                    <div className="w-2 h-2 border-t-2 border-l-2 border-white -rotate-45" />
                </motion.div>
            )}
        </div>
    );
}
