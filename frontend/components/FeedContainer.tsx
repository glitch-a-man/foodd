'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import ReelItem from './ReelItem';
import OrderOverlay from './OrderOverlay';

interface MenuItem {
    _id: string;
    name: string;
    description: string;
    price: number;
    rating: number;
    eta: string;
    videoUrl: string;
    restaurant: {
        _id: string;
        name: string;
        address: string;
    };
    uniqueId?: string;
}

export default function FeedContainer() {
    const [dishes, setDishes] = useState<MenuItem[]>([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isOrderOpen, setIsOrderOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchDishes = async () => {
            try {
                const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';
                const res = await fetch(`${baseUrl}/reels`);

                if (res.ok) {
                    const json = await res.json();
                    if (json.success) {
                        // Map Reel model to Dish interface for ReelItem
                        const mappedDishes = json.data.map((reel: any) => ({
                            ...reel.menuItemId,
                            videoUrl: reel.videoUrl, // Use the reel's videoUrl
                        }));

                        // Create a pseudo-infinite list by duplicating the items
                        const duplicatedDishes = Array.from({ length: 10 }).flatMap((_, i) =>
                            mappedDishes.map((d: any) => ({ ...d, uniqueId: `${d._id}-${i}` }))
                        );
                        setDishes(duplicatedDishes);
                    }
                } else {
                    console.error('Failed to fetch reels, status:', res.status);
                }
            } catch (error) {
                console.error('Error fetching reels:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchDishes();
    }, []);

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
        if (!container || dishes.length === 0) return;

        if (activeIndex >= dishes.length - 3) {
            const originalCount = dishes.length / 10;
            const offset = activeIndex % originalCount;
            const newIndex = originalCount + offset;

            container.style.scrollSnapType = 'none';
            container.scrollTop = newIndex * window.innerHeight;
            setActiveIndex(newIndex);

            requestAnimationFrame(() => {
                container.style.scrollSnapType = 'y mandatory';
            });
        }
    }, [activeIndex, dishes]);

    useEffect(() => {
        const el = containerRef.current;
        if (el) {
            el.addEventListener('scroll', handleScroll, { passive: true });
            return () => el.removeEventListener('scroll', handleScroll);
        }
    }, [handleScroll]);

    const activeDish = dishes[activeIndex] || dishes[0];

    if (isLoading) {
        return (
            <div className="w-full h-full flex items-center justify-center bg-black">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-orange-500"></div>
            </div>
        );
    }

    return (
        <div className="relative w-full h-full bg-black">
            {/* Feed */}
            <div
                ref={containerRef}
                className="overflow-y-scroll snap-y snap-mandatory no-scrollbar w-full h-full"
                style={{ scrollBehavior: 'smooth' }}
            >
                {dishes.map((dish, idx) => (
                    <ReelItem
                        key={dish.uniqueId}
                        dish={dish as any}
                        isActive={idx === activeIndex}
                        onOpenOrder={() => setIsOrderOpen(true)}
                    />
                ))}
            </div>

            {/* Order Overlay */}
            {activeDish && (
                <OrderOverlay
                    dish={activeDish as any}
                    isOpen={isOrderOpen}
                    onClose={() => setIsOrderOpen(false)}
                    onOrder={() => {
                        setIsOrderOpen(false);
                        window.location.href = '/tracking?order=success';
                    }}
                />
            )}
        </div>
    );
}
