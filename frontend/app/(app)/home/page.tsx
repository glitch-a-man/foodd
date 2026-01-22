'use client';

import { Search, MapPin, Pizza, Coffee, Utensils, Star, Clock, Bell } from 'lucide-react';
import { DISHES } from '@/lib/data';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';

import { useEffect, useState } from 'react';

const CATEGORIES = [
    { name: 'Pizza', icon: Pizza, color: 'text-orange-500', bg: 'bg-orange-500/10' },
    { name: 'Burger', icon: Utensils, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { name: 'Sushi', icon: Utensils, color: 'text-pink-500', bg: 'bg-pink-500/10' },
    { name: 'Coffee', icon: Coffee, color: 'text-yellow-500', bg: 'bg-yellow-500/10' },
    { name: 'Asian', icon: Utensils, color: 'text-red-500', bg: 'bg-red-500/10' },
];

interface MenuItem {
    _id: string;
    name: string;
    description: string;
    price: number;
    rating: number;
    eta: string;
    image: string;
    videoUrl: string;
    restaurant: {
        _id: string;
        name: string;
        address: string;
    };
}

const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
};

export default function HomePage() {
    const { data: session } = useSession();
    const user = session?.user;
    const [dishes, setDishes] = useState<MenuItem[]>([]);
    const [dbUser, setDbUser] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

                // Fetch User Data from DB
                if (session?.user?.email) {
                    const userRes = await fetch(`${baseUrl}/users/email/${session.user.email}`);
                    const userJson = await userRes.json();
                    if (userJson.success) {
                        setDbUser(userJson.data);
                    }
                }

                // Fetch Dishes
                const res = await fetch(`${baseUrl}/menu-items`);
                const json = await res.json();
                if (json.success) {
                    setDishes(json.data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [session]);

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good Morning';
        if (hour < 17) return 'Good Afternoon';
        return 'Good Evening';
    };

    return (
        <div className="h-full bg-black text-white px-7 pb-32 overflow-y-auto no-scrollbar">
            {/* Header */}
            <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="flex justify-between items-center mb-10 pt-8"
            >
                <div className="flex items-center gap-4">
                    <div className="relative group">
                        <div className="absolute -inset-1.5 bg-gradient-to-tr from-orange-600 to-yellow-400 rounded-[1.4rem] blur opacity-25 group-hover:opacity-50 transition duration-500"></div>
                        <div className="relative w-14 h-14 rounded-2xl overflow-hidden border-2 border-white/10 bg-gray-900 ring-4 ring-black">
                            {(dbUser?.image || user?.image) ? (
                                <Image
                                    src={dbUser?.image || user?.image || ''}
                                    alt={dbUser?.name || user?.name || 'User'}
                                    fill
                                    className="object-cover"
                                />
                            ) : (
                                <div className="w-full h-full bg-gradient-to-tr from-orange-500 to-yellow-500 flex items-center justify-center text-xl font-bold">
                                    {(dbUser?.name || user?.name || 'F').charAt(0)}
                                </div>
                            )}
                        </div>
                    </div>
                    <div>
                        <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.2em] mb-0.5">
                            {getGreeting()}
                        </p>
                        <h1 className="text-2xl font-black tracking-tight flex items-center gap-2">
                            <span>{dbUser?.firstName || user?.name?.split(' ')[0] || 'Foodie'}</span>
                            <span className="animate-bounce-slow">👋</span>
                        </h1>
                        <div className="flex items-center gap-1.5 text-orange-500/80 mt-1">
                            <MapPin size={14} className="fill-orange-500/10" />
                            <span className="text-xs font-bold tracking-wide">
                                {dbUser?.address || 'Set your location'}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center relative transition-all active:scale-90 hover:bg-white/10 hover:border-white/20 shadow-xl group">
                        <Bell size={22} className="text-gray-400 group-hover:text-white transition-colors" />
                        <span className="absolute top-3.5 right-3.5 w-2 h-2 bg-orange-500 border-2 border-black rounded-full" />
                    </button>
                </div>
            </motion.div>

            {/* Search */}
            <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="relative mb-10"
            >
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                    <Search size={20} />
                </div>
                <input
                    type="text"
                    placeholder="Search dishes, restaurants..."
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500/50 transition-all focus:ring-4 focus:ring-orange-500/10 shadow-lg shadow-black/20"
                />
            </motion.div>

            {/* Categories */}
            <div className="mb-10">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="font-bold text-xl tracking-tight">Categories</h2>
                </div>
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    className="flex gap-4 overflow-x-auto pb-2 no-scrollbar"
                >
                    {CATEGORIES.map((cat) => (
                        <motion.div
                            key={cat.name}
                            variants={itemVariants}
                            whileTap={{ scale: 0.9 }}
                            className="flex flex-col items-center gap-3 min-w-[80px]"
                        >
                            <div className={`w-16 h-16 rounded-3xl flex items-center justify-center transition-all cursor-pointer border border-white/5 hover:border-orange-500/30 ${cat.bg} ${cat.color} shadow-sm`}>
                                <cat.icon size={28} />
                            </div>
                            <span className="text-xs font-semibold text-gray-400">{cat.name}</span>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {/* Popular Now */}
            <div className="mb-4">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="font-bold text-xl tracking-tight">Popular Now</h2>
                    <button className="text-orange-500 text-sm font-bold hover:underline">View all</button>
                </div>

                {isLoading ? (
                    <div className="flex justify-center py-10">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
                    </div>
                ) : (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="show"
                        className="space-y-5"
                    >
                        {dishes.length > 0 ? dishes.map((dish) => (
                            <motion.div
                                key={dish._id}
                                variants={itemVariants}
                                whileHover={{ y: -4 }}
                                className="group bg-white/5 border border-white/5 rounded-[2rem] p-4 flex gap-5 cursor-pointer transition-all hover:bg-white/[0.08] hover:border-white/10 shadow-lg"
                            >
                                <div className="w-28 h-28 bg-gray-800 rounded-3xl flex-shrink-0 overflow-hidden relative border border-white/10 group-hover:border-orange-500/30 transition-colors">
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                                    {dish.videoUrl && (
                                        <video
                                            src={dish.videoUrl}
                                            className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity"
                                            muted
                                            playsInline
                                            autoPlay
                                            loop
                                        />
                                    )}
                                    {!dish.videoUrl && (
                                        <div className="absolute inset-0 flex items-center justify-center text-[10px] text-gray-400 font-medium z-0">
                                            NO PREVIEW
                                        </div>
                                    )}
                                    <div className="absolute bottom-2 left-2 z-20 flex items-center gap-1 bg-black/60 backdrop-blur-md px-2 py-1 rounded-lg border border-white/10">
                                        <Star size={10} className="text-yellow-500 fill-yellow-500" />
                                        <span className="text-[10px] font-bold">{dish.rating}</span>
                                    </div>
                                </div>

                                <div className="flex-1 flex flex-col pt-1">
                                    <div className="mb-auto">
                                        <h3 className="font-bold text-lg leading-tight mb-1 group-hover:text-orange-500 transition-colors">{dish.name}</h3>
                                        <p className="text-gray-500 text-sm flex items-center gap-1">
                                            by <span className="text-gray-300 font-medium">{dish.restaurant?.name || 'Unknown Restaurant'}</span>
                                        </p>
                                    </div>

                                    <div className="flex items-center justify-between mt-4">
                                        <div className="flex items-center gap-3">
                                            <div className="flex items-center gap-1.5 text-gray-400 bg-white/5 px-2.5 py-1 rounded-full border border-white/5">
                                                <Clock size={12} />
                                                <span className="text-[10px] font-bold">{dish.eta}</span>
                                            </div>
                                        </div>
                                        <div className="text-xl font-black text-white">
                                            <span className="text-orange-500 text-sm font-bold mr-0.5">₹</span>
                                            {dish.price}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )) : (
                            <div className="text-center py-10 text-gray-500">
                                No dishes found.
                            </div>
                        )}
                    </motion.div>
                )}
            </div>
        </div>
    );
}
