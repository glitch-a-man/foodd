'use client';

import { useSession, signOut } from 'next-auth/react';
import { Settings, LogOut, Loader2 } from 'lucide-react';
import Image from 'next/image';

export default function ProfilePage() {
    const { data: session, status } = useSession();

    if (status === 'loading') {
        return (
            <div className="min-h-full flex items-center justify-center bg-black">
                <Loader2 className="animate-spin text-orange-500" size={32} />
            </div>
        );
    }

    const user = session?.user;

    return (
        <div className="min-h-full bg-black text-white p-6 pb-24">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold">My Profile</h1>
                <button className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                    <Settings size={20} />
                </button>
            </div>

            <div className="flex flex-col items-center mb-10">
                <div className="relative w-24 h-24 mb-4">
                    {user?.image ? (
                        <Image
                            src={user.image}
                            alt={user.name || 'User'}
                            fill
                            className="rounded-full object-cover shadow-lg shadow-orange-500/20"
                        />
                    ) : (
                        <div className="w-24 h-24 bg-gradient-to-tr from-orange-500 to-yellow-500 rounded-full shadow-lg shadow-orange-500/20" />
                    )}
                </div>
                <h2 className="text-xl font-bold">{user?.name || 'Foodie Explorer'}</h2>
                <p className="text-gray-400">{user?.email}</p>

                <div className="flex gap-6 mt-6">
                    <div className="text-center">
                        <span className="block font-bold text-xl">12</span>
                        <span className="text-xs text-gray-400">Reviews</span>
                    </div>
                    <div className="text-center">
                        <span className="block font-bold text-xl">245</span>
                        <span className="text-xs text-gray-400">Followers</span>
                    </div>
                    <div className="text-center">
                        <span className="block font-bold text-xl">89</span>
                        <span className="text-xs text-gray-400">Following</span>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <div className="bg-white/5 rounded-xl p-4">
                    <h3 className="font-bold mb-4">Saved Collections</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="aspect-[4/5] bg-gray-800 rounded-lg animate-pulse" />
                        <div className="aspect-[4/5] bg-gray-800 rounded-lg animate-pulse" />
                    </div>
                </div>

                <button
                    onClick={() => signOut({ callbackUrl: '/' })}
                    className="w-full flex items-center gap-3 bg-red-500/10 text-red-500 p-4 rounded-xl mt-auto transition-colors hover:bg-red-500/20"
                >
                    <LogOut size={20} />
                    <span className="font-medium">Log Out</span>
                </button>
            </div>
        </div>
    );
}
