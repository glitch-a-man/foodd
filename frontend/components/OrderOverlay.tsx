'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, Utensils, MapPin } from 'lucide-react';
import { useState } from 'react';

interface OrderOverlayProps {
    dish: any;
    isOpen: boolean;
    onClose: () => void;
    onOrder: () => void;
}

export default function OrderOverlay({ dish, isOpen, onClose, onOrder }: OrderOverlayProps) {
    const [quantity, setQuantity] = useState(1);
    const [isOrdering, setIsOrdering] = useState(false);

    if (!dish) return null;

    const handleOrder = async () => {
        setIsOrdering(true);
        // Simulate api call
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Call parent handler (which should handle redirect/toast)
        onOrder();
        setIsOrdering(false);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.5 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black z-40 backdrop-blur-sm"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="fixed right-0 top-0 bottom-0 w-[90%] max-w-md bg-zinc-900 z-50 p-6 flex flex-col shadow-2xl border-l border-white/10 overflow-y-auto"
                    >
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold">Details</h2>
                            <button onClick={onClose} className="p-2 rounded-full hover:bg-white/10">
                                <X size={24} />
                            </button>
                        </div>

                        {/* Dish Info */}
                        <div className="flex-1">
                            <div className="aspect-video rounded-2xl bg-zinc-800 mb-6 overflow-hidden relative">
                                <video
                                    src={dish.videoUrl}
                                    className="w-full h-full object-cover opacity-80"
                                    muted loop autoPlay playsInline
                                />
                            </div>

                            <h3 className="text-2xl font-bold mb-1">{dish.name}</h3>
                            <p className="text-zinc-400 text-lg mb-6">{dish.restaurant?.name || 'Unknown Restaurant'}</p>
                            <div className="space-y-4 mb-8 bg-white/5 p-4 rounded-xl">
                                <div className="flex gap-3">
                                    <div className="w-8 h-8 rounded-full bg-orange-500/20 text-orange-500 flex items-center justify-center flex-shrink-0">
                                        <Utensils size={16} />
                                    </div>
                                    <div>
                                        <label className="text-xs text-zinc-500 uppercase font-bold">Restaurant Location</label>
                                        <p className="text-sm">{dish.restaurant?.address || 'Jaipur, Rajasthan'}</p>
                                    </div>
                                </div>
                                <div className="w-full h-px bg-white/10" />
                                <div className="flex gap-3">
                                    <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-500 flex items-center justify-center flex-shrink-0">
                                        <MapPin size={16} />
                                    </div>
                                    <div>
                                        <label className="text-xs text-zinc-500 uppercase font-bold">Delivering To</label>
                                        <p className="text-sm">Your Saved Address • Home</p>
                                        <p className="text-xs text-zinc-400">C-Scheme, Jaipur, Rajasthan</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between mb-8 bg-white/5 p-4 rounded-xl">
                                <span className="font-bold">Quantity</span>
                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="p-2 rounded-full bg-zinc-800 hover:bg-zinc-700"
                                    >
                                        <Minus size={16} />
                                    </button>
                                    <span className="text-xl font-medium w-6 text-center">{quantity}</span>
                                    <button
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="p-2 rounded-full bg-zinc-800 hover:bg-zinc-700"
                                    >
                                        <Plus size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* CTA */}
                        <div className="mt-auto pt-4 border-t border-white/10">
                            <div className="flex justify-between mb-4 text-sm">
                                <span className="text-zinc-400">Subtotal</span>
                                <span>₹{(dish.price * quantity).toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between mb-6 text-sm">
                                <span className="text-zinc-400">Delivery Fee</span>
                                <span>₹40.00</span>
                            </div>
                            <div className="flex justify-between mb-6 text-xl font-bold">
                                <span>Total</span>
                                <span>₹{(dish.price * quantity + 40).toFixed(2)}</span>
                            </div>

                            <button
                                onClick={handleOrder}
                                disabled={isOrdering}
                                className="w-full bg-white text-black py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 active:scale-95 transition-transform disabled:opacity-70"
                            >
                                {isOrdering ? 'Placing Order...' : 'Order Now'}
                            </button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
