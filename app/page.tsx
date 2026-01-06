import Link from 'next/link';
import { UtensilsCrossed } from 'lucide-react';

export default function LandingPage() {
  return (
    <main className="w-full h-[100dvh] bg-black text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-orange-500/20 to-black pointer-events-none" />

      <div className="z-10 flex flex-col items-center text-center space-y-8 animate-in fade-in zoom-in duration-700">
        <div className="w-24 h-24 bg-orange-500 rounded-full flex items-center justify-center shadow-lg shadow-orange-500/50 mb-4">
          <UtensilsCrossed size={48} className="text-black" />
        </div>

        <h1 className="text-5xl font-black tracking-tighter">
          Food<span className="text-orange-500">Reels</span>
        </h1>

        <p className="text-lg text-gray-300 max-w-xs">
          Discover the best dishes around you through immersive videos.
        </p>

        <div className="flex flex-col w-full max-w-xs gap-4 pt-8">
          <Link
            href="/register"
            className="w-full bg-orange-500 hover:bg-orange-600 text-black font-bold py-4 rounded-xl text-center transition-transform active:scale-95"
          >
            Get Started
          </Link>
          <Link
            href="/login"
            className="w-full bg-white/10 hover:bg-white/20 text-white font-medium py-4 rounded-xl text-center transition-colors"
          >
            I have an account
          </Link>
        </div>
      </div>
    </main>
  );
}
