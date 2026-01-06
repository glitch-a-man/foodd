import { Search, MapPin, Pizza, Coffee, Utensils, Star, Clock } from 'lucide-react';
import { DISHES } from '@/lib/data';
import Image from 'next/image';

const CATEGORIES = [
    { name: 'Pizza', icon: Pizza, color: 'text-orange-500', bg: 'bg-orange-500/10' },
    { name: 'Burger', icon: Utensils, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { name: 'Sushi', icon: Utensils, color: 'text-pink-500', bg: 'bg-pink-500/10' },
    { name: 'Coffee', icon: Coffee, color: 'text-yellow-500', bg: 'bg-yellow-500/10' },
    { name: 'Asian', icon: Utensils, color: 'text-red-500', bg: 'bg-red-500/10' },
];

export default function HomePage() {
    return (
        <div className="min-h-full bg-black text-white p-4 pb-24 overflow-y-auto">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <p className="text-xs text-gray-400 mb-1">Delivering to</p>
                    <div className="flex items-center gap-1 text-orange-500 font-bold">
                        <MapPin size={16} />
                        <span>New York, USA</span>
                    </div>
                </div>
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                    <div className="w-full h-full rounded-full bg-gradient-to-tr from-orange-500 to-yellow-500" />
                </div>
            </div>

            {/* Search */}
            <div className="relative mb-8">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                    type="text"
                    placeholder="Find your craving..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500"
                />
            </div>

            {/* Categories */}
            <h2 className="font-bold text-lg mb-4">Categories</h2>
            <div className="flex gap-4 overflow-x-auto pb-4 mb-6 no-scrollbar">
                {CATEGORIES.map((cat) => (
                    <div key={cat.name} className="flex flex-col items-center gap-2 min-w-[70px]">
                        <div className={`w-16 h-16 rounded-full flex items-center justify-center ${cat.bg} ${cat.color}`}>
                            <cat.icon size={24} />
                        </div>
                        <span className="text-sm font-medium">{cat.name}</span>
                    </div>
                ))}
            </div>

            {/* Popular Now (Reusing Dishes Data) */}
            <div className="flex justify-between items-end mb-4">
                <h2 className="font-bold text-lg">Popular Now</h2>
                <span className="text-orange-500 text-sm">See all</span>
            </div>

            <div className="space-y-4">
                {DISHES.map((dish) => (
                    <div key={dish.id} className="bg-white/5 rounded-2xl p-4 flex gap-4">
                        <div className="w-24 h-24 bg-gray-800 rounded-xl flex-shrink-0 overflow-hidden relative">
                            {/* Placeholder for video thumbnail since we only have videoUrl */}
                            <div className="absolute inset-0 flex items-center justify-center text-xs text-gray-500 text-center p-2">
                                Video Thumbnail
                            </div>
                        </div>
                        <div className="flex-1 flex flex-col justify-between">
                            <div>
                                <h3 className="font-bold text-lg leading-tight mb-1">{dish.name}</h3>
                                <p className="text-gray-400 text-sm">{dish.restaurant}</p>
                            </div>

                            <div className="flex items-center gap-3 text-sm mt-2">
                                <div className="flex items-center gap-1 text-yellow-500">
                                    <Star size={14} fill="currentColor" />
                                    <span className="font-bold">{dish.rating}</span>
                                </div>
                                <div className="flex items-center gap-1 text-gray-400">
                                    <Clock size={14} />
                                    <span>{dish.eta}</span>
                                </div>
                                <div className="ml-auto font-bold text-orange-500">
                                    ${dish.price}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
