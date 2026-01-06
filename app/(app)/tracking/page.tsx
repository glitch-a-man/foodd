'use client';

import { CheckCircle2, Circle, Clock, MapPin, Phone, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const STEPS = [
    { title: 'Order Confirmed', time: '16:00', completed: true },
    { title: 'Preparing', time: '16:05', completed: true },
    { title: 'On the way', time: '16:20', completed: false },
    { title: 'Delivered', time: '16:30', completed: false },
];

function TrackingContent() {
    const searchParams = useSearchParams();
    const showBanner = searchParams.get('order') === 'success';
    const [timeLeft, setTimeLeft] = useState(25); // Minutes

    return (
        <div className="min-h-full bg-black text-white p-6 pb-24 relative overflow-hidden">

            {/* Order Placed Success Banner */}
            {showBanner && (
                <div className="absolute top-4 left-4 right-4 bg-green-500 text-white p-4 rounded-xl flex items-center justify-center gap-2 animate-in slide-in-from-top duration-500 shadow-lg shadow-green-500/20 z-50">
                    <CheckCircle2 className="text-white" />
                    <span className="font-bold">Order Placed Successfully!</span>
                </div>
            )}

            <h1 className="text-2xl font-bold mt-16 mb-2">Track Order</h1>
            <p className="text-gray-400 mb-8">Order #2458 • Arrives in {timeLeft} min</p>

            {/* Map Placeholder */}
            <div className="w-full aspect-video bg-gray-800 rounded-2xl mb-8 relative overflow-hidden flex items-center justify-center group">
                <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/-74.006,40.7128,12,0/600x400?access_token=YOUR_TOKEN')] bg-cover bg-center opacity-50 grayscale group-hover:grayscale-0 transition-all duration-700" />
                <div className="z-10 bg-black/50 backdrop-blur-md p-4 rounded-xl flex items-center gap-3 border border-white/10">
                    <MapPin className="text-orange-500" />
                    <div>
                        <p className="font-bold text-sm">Delivery to Home</p>
                        <p className="text-xs text-gray-400">12 mins away</p>
                    </div>
                </div>
            </div>

            {/* Timeline */}
            <div className="relative pl-8 space-y-8 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-800">
                {STEPS.map((step, idx) => (
                    <div key={idx} className="relative">
                        <div className={`absolute -left-8 w-6 h-6 rounded-full border-2 flex items-center justify-center bg-black z-10 ${step.completed ? 'border-orange-500 text-orange-500' : 'border-gray-700 text-gray-700'}`}>
                            {step.completed ? <CheckCircle2 size={14} fill="currentColor" className="text-black" /> : <Circle size={10} />}
                        </div>
                        <div className={`${step.completed ? 'text-white' : 'text-gray-500'}`}>
                            <h3 className="font-bold">{step.title}</h3>
                            <p className="text-xs opacity-70">Estimated: {step.time}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Courier Info */}
            <div className="mt-10 bg-white/5 rounded-2xl p-4 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gray-700 overflow-hidden">
                    {/* Avatar placeholder */}
                    <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500" />
                </div>
                <div className="flex-1">
                    <h4 className="font-bold">Michael R.</h4>
                    <p className="text-xs text-gray-400">Your Courier</p>
                </div>
                <button className="w-10 h-10 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center">
                    <Phone size={20} />
                </button>
            </div>

            <Link href="/home" className="block mt-8 text-center text-gray-500 text-sm hover:text-white transition-colors">
                Back to Home
            </Link>
        </div>
    );
}

export default function TrackingPage() {
    return (
        <Suspense fallback={<div className="min-h-full bg-black text-white p-6 flex items-center justify-center">Loading...</div>}>
            <TrackingContent />
        </Suspense>
    );
}
