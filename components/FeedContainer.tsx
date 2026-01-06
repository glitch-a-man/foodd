'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import ReelItem from './ReelItem';
import OrderOverlay from './OrderOverlay';
import { DISHES } from '@/lib/data';

// Create a larger list for "infinite" feel
// In a real app, you would fetch more data.
// Here we repeat the 3 items many times.
const INFINITE_DISHES = Array.from({ length: 30 }).flatMap((_, i) =>
    DISHES.map(d => ({ ...d, uniqueId: `${d.id}-${i}` }))
);

export default function FeedContainer() {
    // Start in the middle of the list so user can scroll up immediately
    const [activeIndex, setActiveIndex] = useState(0);
    const [isOrderOpen, setIsOrderOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleScroll = useCallback(() => {
        if (containerRef.current) {
            const index = Math.round(containerRef.current.scrollTop / window.innerHeight);
            if (index !== activeIndex) {
                setActiveIndex(index);
            }
        }
    }, [activeIndex]);

    // Infinite Scroll Logic: Reset to start if near end
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // If we get too close to the end, reset scroll to near the beginning (seamlessly)
        // This is a simple trick for "infinite" looping of static content
        if (activeIndex >= INFINITE_DISHES.length - 5) {
            // Calculate offset in the original set
            const offset = activeIndex % DISHES.length;
            // Jump back to the first occurrence of this offset
            // We give it a buffer of 1 set (DISHES.length)
            const newIndex = DISHES.length + offset;

            // Disable scroll snap temporarily to jump without animation
            container.style.scrollSnapType = 'none';
            container.scrollTop = newIndex * window.innerHeight;
            setActiveIndex(newIndex);

            // Re-enable snap after a tiny delay
            requestAnimationFrame(() => {
                container.style.scrollSnapType = 'y mandatory';
            });
        }
    }, [activeIndex]);

    useEffect(() => {
        const el = containerRef.current;
        if (el) {
            el.addEventListener('scroll', handleScroll, { passive: true });
            return () => el.removeEventListener('scroll', handleScroll);
        }
    }, [handleScroll]);

    const activeDish = INFINITE_DISHES[activeIndex] || INFINITE_DISHES[0];

    return (
        <div className="relative w-full h-full bg-black">
            {/* Feed */}
            <div
                ref={containerRef}
                className="overflow-y-scroll snap-y snap-mandatory no-scrollbar w-full h-full"
                style={{ scrollBehavior: 'smooth' }}
            >
                {INFINITE_DISHES.map((dish, idx) => (
                    <ReelItem
                        key={dish.uniqueId}
                        dish={dish as any}
                        isActive={idx === activeIndex}
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
                    // Show a toast or banner (using simple alert/state for now, could be improved)
                    // For now, let's assume we just redirect
                    setIsOrderOpen(false);
                    // Force a hard navigation or use a router if available inside component.
                    // Since FeedContainer is a client component, we should use useRouter.
                    window.location.href = '/tracking?order=success';
                }}
            />
        </div>
    );
}
