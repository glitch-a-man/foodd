'use client';

import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Loader2 } from 'lucide-react';
import { useState } from 'react';

export default function LoginPage() {
    const router = useRouter();
    const { login } = useAuth();
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const form = e.target as HTMLFormElement;
        const email = (form.elements[0] as HTMLInputElement).value;

        await login(email);
        setLoading(false);
        router.push('/home');
    };

    return (
        <main className="w-full h-[100dvh] bg-black text-white p-6 flex flex-col">
            <Link href="/" className="mb-8 w-10 h-10 flex items-center justify-center rounded-full bg-white/10">
                <ChevronLeft size={24} />
            </Link>

            <div className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full">
                <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
                <p className="text-gray-400 mb-8">Login to continue discovering great food.</p>

                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
                        <input
                            required
                            type="email"
                            placeholder="you@example.com"
                            className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder-gray-600 focus:outline-none focus:border-orange-500 transition-colors"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Password</label>
                        <input
                            required
                            type="password"
                            placeholder="••••••••"
                            className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder-gray-600 focus:outline-none focus:border-orange-500 transition-colors"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-orange-500 hover:bg-orange-600 text-black font-bold py-4 rounded-xl mt-4 transition-transform active:scale-95 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {loading && <Loader2 className="animate-spin" size={20} />}
                        Sign In
                    </button>
                </form>

                <p className="text-center text-gray-400 mt-8">
                    Don't have an account? <Link href="/register" className="text-orange-500">Sign Up</Link>
                </p>
            </div>
        </main>
    );
}
