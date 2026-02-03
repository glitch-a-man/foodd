'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Film, User } from 'lucide-react';

export default function BottomNav() {
    const pathname = usePathname();

    return (
        <nav className="fixed bottom-0 left-0 w-full bg-black/80 backdrop-blur-md border-t border-white/10 text-white z-50">
            <div className="flex justify-around items-center h-16 max-w-md mx-auto">
                <Link href="/home" className={`flex flex-col items-center gap-1 p-2 ${pathname === '/home' ? 'text-white' : 'text-gray-500'}`}>
                    <Home size={24} />
                    <span className="text-xs">Home</span>
                </Link>
                <Link href="/feed" className={`flex flex-col items-center gap-1 p-2 ${pathname === '/feed' ? 'text-orange-500' : 'text-gray-500'}`}>
                    <Film size={24} />
                    <span className="text-xs">Feed</span>
                </Link>
                <Link href="/profile" className={`flex flex-col items-center gap-1 p-2 ${pathname === '/profile' ? 'text-white' : 'text-gray-500'}`}>
                    <User size={24} />
                    <span className="text-xs">Profile</span>
                </Link>
            </div>
        </nav>
    );
}
