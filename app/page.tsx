'use client';

import { UtensilsCrossed, Play, MapPin, Clock } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/landing/Navbar';
import FeatureCard from '@/components/landing/FeatureCard';
import { motion } from 'framer-motion';

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden font-sans selection:bg-primary/30">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 min-h-screen flex flex-col items-center justify-center text-center overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/20 blur-[120px] rounded-full pointer-events-none opacity-50" />
        <div className="absolute bottom-0 right-0 w-[800px] h-[500px] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none opacity-30" />

        <div className="relative z-10 max-w-5xl mx-auto space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-2 mb-6"
          >
            <span className="px-4 py-1.5 rounded-full border border-white/10 glass text-sm font-medium text-muted-foreground">
              The Future of Food Delivery
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-6xl md:text-8xl font-black tracking-tighter leading-tight"
          >
            Eat with your <br />
            <span className="text-gradient-primary">Eyes First</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            Experience food like never before. Watch immersive short videos from top local restaurants and order instantly with a single tap.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <Link
              href="/register"
              className="w-full sm:w-auto px-10 py-5 bg-primary text-black font-bold rounded-full text-lg shadow-[0_0_20px_rgba(249,115,22,0.3)] hover:shadow-[0_0_30px_rgba(249,115,22,0.5)] transition-all hover:scale-110 active:scale-95 flex items-center justify-center gap-2 group"
            >
              Start Exploring <Play size={20} fill="currentColor" className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/login"
              className="w-full sm:w-auto px-8 py-4 glass text-white font-medium rounded-full text-lg hover:bg-white/10 transition-all"
            >
              Sign In
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Why FoodReels?</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              We've reimagined food delivery to be as engaging as your favorite social feed.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FeatureCard
              icon={<Play size={32} />}
              title="Video-First Discovery"
              description="Forget boring menus. See exactly what you're getting with high-quality video reels for every dish."
              delay={0.1}
            />
            <FeatureCard
              icon={<UtensilsCrossed size={32} />}
              title="Curated Restaurants"
              description="We partner only with the best local spots to ensure every meal is worth sharing (and eating)."
              delay={0.2}
            />
            <FeatureCard
              icon={<Clock size={32} />}
              title="Lightning Fast Delivery"
              description="Real-time tracking from the kitchen to your doorstep. Hot food, delivered fast."
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/5 relative bg-black">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
              <UtensilsCrossed className="text-primary w-5 h-5" />
            </div>
            <span className="font-bold text-lg text-white">FoodReels</span>
          </div>

          <div className="flex text-muted-foreground text-sm gap-6">
            <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms</Link>
            <Link href="#" className="hover:text-white transition-colors">Contact</Link>
          </div>

          <p className="text-muted-foreground text-sm">
            © 2026 FoodReels Inc.
          </p>
        </div>
      </footer>
    </main>
  );
}
