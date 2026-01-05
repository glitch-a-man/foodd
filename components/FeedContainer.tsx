'use client';

import { useState, useRef, useEffect } from 'react';
import ReelItem from './ReelItem';
import OrderOverlay from './OrderOverlay';
import { DISHES } from '@/lib/data';

export default function FeedContainer() {
    const [activeindex, setActiveIndex] = useState(0);
    const [isOrderOpen, setIsOrderOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleScroll = () => {
        if (containerRef.current) {
            const index = Math.round(containerRef.current.scrollTop / window.innerHeight);
            if (index !== activeindex) {
                setActiveIndex(index);
            }
        }
    };

    useEffect(() => {
        const el = containerRef.current;
        if (el) {
            el.addEventListener('scroll', handleScroll, { passive: true });
            return () => el.removeEventListener('scroll', handleScroll);
        }
    }, [activeindex]);

    const activeDish = DISHES[activeindex] || DISHES[0];

    return (
        <div className="relative w-full h-full bg-black">
            {/* Feed */}
            <div
                ref={containerRef}
                className="snap-y-mandatory no-scrollbar w-full h-full"
            >
                {DISHES.map((dish, idx) => (
                    <ReelItem
                        key={dish.id}
                        dish={dish}
                        isActive={idx === activeindex}
                        onOpenOrder={() => setIsOrderOpen(true)}
                    />
                ))}
            </div>

            {/* Order Overlay */}
            <OrderOverlay
                dish={activeDish}
                isOpen={isOrderOpen}
                onClose={() => setIsOrderOpen(false)}
                onOrder={() => {
                    alert('Order Placed! 🍔');
                    setIsOrderOpen(false);
                }}
            />
        </div>
    );
}
