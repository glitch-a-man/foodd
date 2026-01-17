import BottomNav from '@/components/BottomNav';
import AuthGuard from '@/components/AuthGuard';

export default function AppLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <AuthGuard>
            <main className="w-full h-[100dvh] overflow-hidden bg-black text-white pb-16">
                {children}
                <BottomNav />
            </main>
        </AuthGuard>
    );
}
