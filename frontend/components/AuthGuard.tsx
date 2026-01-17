'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
    const { data: session, status } = useSession();
    const router = useRouter();
    const isLoading = status === 'loading';

    useEffect(() => {
        if (!isLoading && !session) {
            router.push('/login');
        }
    }, [session, isLoading, router]);

    if (isLoading) {
        return (
            <div className="w-full h-screen flex items-center justify-center bg-black text-white">
                <Loader2 className="animate-spin text-orange-500" size={48} />
            </div>
        );
    }

    if (!session) {
        return null; // Will redirect via useEffect
    }

    return <>{children}</>;
}
