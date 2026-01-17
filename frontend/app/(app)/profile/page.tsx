'use client';

import { useSession, signOut } from 'next-auth/react';
import { Settings, LogOut, Loader2, Package } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface BackendUser {
    _id: string;
    name: string;
    firstName?: string;
    lastName?: string;
    email: string;
    image?: string;
    role: string;
    orders: any[];
    createdAt: string;
}

export default function ProfilePage() {
    const { data: session, status } = useSession();
    const [dbUser, setDbUser] = useState<BackendUser | null>(null);
    const [isFetching, setIsFetching] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            if (session?.user?.email) {
                try {
                    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000'}/api/users/email/${session.user.email}`);
                    const json = await response.json();
                    if (json.success) {
                        setDbUser(json.data);
                    }
                } catch (error) {
                    console.error('Failed to fetch user from backend:', error);
                } finally {
                    setIsFetching(false);
                }
            } else if (status !== 'loading') {
                setIsFetching(false);
            }
        };

        fetchUserData();
    }, [session, status]);

    if (status === 'loading' || isFetching) {
        return (
            <div className="min-h-full flex items-center justify-center bg-black">
                <Loader2 className="animate-spin text-orange-500" size={32} />
            </div>
        );
    }

    const user = dbUser || session?.user;

    return (
        <div className="min-h-full bg-black text-white p-6 pb-24 no-scrollbar overflow-y-auto">
            <div className="flex justify-between items-center mb-8 pt-2">
                <h1 className="text-2xl font-bold tracking-tight">My Profile</h1>
                <button className="w-11 h-11 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center transition-transform active:scale-95">
                    <Settings size={22} className="text-gray-300" />
                </button>
            </div>

            <div className="flex flex-col items-center mb-10">
                <div className="relative w-28 h-28 mb-4">
                    {user?.image ? (
                        <Image
                            src={user.image}
                            alt={user.name || 'User'}
                            fill
                            className="rounded-3xl object-cover shadow-2xl shadow-orange-500/10 border-2 border-white/10"
                        />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-tr from-orange-500 to-yellow-500 rounded-3xl shadow-lg shadow-orange-500/20" />
                    )}
                </div>
                <h2 className="text-2xl font-bold text-white">
                    {dbUser?.firstName ? `${dbUser.firstName} ${dbUser.lastName || ''}` : user?.name || 'Foodie Explorer'}
                </h2>
                <p className="text-gray-500 font-medium">{user?.email}</p>

                <div className="flex gap-8 mt-8 w-full max-w-xs justify-center">
                    <div className="text-center">
                        <span className="block font-bold text-xl">{dbUser?.orders?.length || 0}</span>
                        <span className="text-xs text-gray-500 uppercase tracking-widest font-bold">Orders</span>
                    </div>
                    <div className="text-center border-x border-white/10 px-8">
                        <span className="block font-bold text-xl">245</span>
                        <span className="text-xs text-gray-500 uppercase tracking-widest font-bold">Points</span>
                    </div>
                    <div className="text-center">
                        <span className="block font-bold text-xl">8</span>
                        <span className="text-xs text-gray-500 uppercase tracking-widest font-bold">Saved</span>
                    </div>
                </div>
            </div>

            <div className="space-y-6">
                {/* Recent Orders Section */}
                <div className="bg-white/5 border border-white/5 rounded-[2rem] p-6 shadow-xl">
                    <div className="flex justify-between items-center mb-5">
                        <h3 className="font-bold text-lg flex items-center gap-2">
                            <Package size={20} className="text-orange-500" />
                            Recent Orders
                        </h3>
                        {dbUser?.orders && dbUser.orders.length > 0 && (
                            <button className="text-orange-500 text-xs font-bold uppercase tracking-tighter">See all</button>
                        )}
                    </div>

                    {dbUser?.orders && dbUser.orders.length > 0 ? (
                        <div className="space-y-4">
                            {/* Order items would map here */}
                        </div>
                    ) : (
                        <div className="py-2 text-center">
                            <p className="text-gray-500 text-sm mb-4">You haven't placed any orders yet.</p>
                            <button className="bg-white/5 border border-white/10 text-white px-6 py-3 rounded-2xl text-sm font-bold transition-all hover:bg-white/10 active:scale-95">
                                Explore Menu
                            </button>
                        </div>
                    )}
                </div>

                {/* Account Actions */}
                <div className="grid grid-cols-1 gap-3">
                    <button
                        onClick={() => signOut({ callbackUrl: '/' })}
                        className="w-full flex items-center justify-center gap-3 bg-red-500/10 text-red-500 py-5 rounded-[1.5rem] transition-all hover:bg-red-500/20 active:scale-[0.98] font-bold border border-red-500/20 shadow-lg shadow-red-500/5 mt-4"
                    >
                        <LogOut size={20} />
                        Sign Out
                    </button>
                </div>
            </div>
        </div>
    );
}
