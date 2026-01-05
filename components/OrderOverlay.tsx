'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, Utensils } from 'lucide-react';
import { useState } from 'react';

interface OrderOverlayProps {
    dish: any;
    isOpen: boolean;
    onClose: () => void;
    onOrder: () => void;
}

export default function OrderOverlay({ dish, isOpen, onClose, onOrder }: OrderOverlayProps) {
    const [quantity, setQuantity] = useState(1);

    if (!dish) return null;

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
                        className="fixed right-0 top-0 bottom-0 w-[85%] max-w-md bg-zinc-900 z-50 p-6 flex flex-col shadow-2xl border-l border-white/10"
                    >
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-xl font-bold">Order Details</h2>
                            <button onClick={onClose} className="p-2 rounded-full hover:bg-white/10">
                                <X size={24} />
                            </button>
                        </div>

                        {/* Dish Info */}
                        <div className="flex-1">
                            <div className="aspect-square rounded-2xl bg-zinc-800 mb-6 overflow-hidden relative">
                                <video
                                    src={dish.videoUrl}
                                    className="w-full h-full object-cover opacity-80"
                                    muted loop autoPlay playsInline
                                />
                            </div>

                            <h3 className="text-2xl font-bold mb-2">{dish.name}</h3>
                            <p className="text-zinc-400 text-lg mb-4">{dish.restaurant}</p>
                            <p className="text-3xl font-bold mb-6">${(dish.price * quantity).toFixed(2)}</p>

                            <div className="flex items-center gap-6 mb-8">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="p-3 rounded-full bg-zinc-800 hover:bg-zinc-700"
                                >
                                    <Minus size={20} />
                                </button>
                                <span className="text-2xl font-medium w-8 text-center">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="p-3 rounded-full bg-zinc-800 hover:bg-zinc-700"
                                >
                                    <Plus size={20} />
                                </button>
                            </div>
                        </div>

                        {/* CTA */}
                        <button
                            onClick={onOrder}
                            className="w-full bg-white text-black py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 active:scale-95 transition-transform"
                        >
                            Order Now • ${(dish.price * quantity).toFixed(2)}
                        </button>
                        <p className="text-center text-zinc-500 mt-4 text-sm">
                            Delivery in {dish.eta}
                        </p>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
