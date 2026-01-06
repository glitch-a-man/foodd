import BottomNav from '@/components/BottomNav';

export default function AppLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main className="w-full h-[100dvh] overflow-hidden bg-black text-white pb-16">
            {children}
            <BottomNav />
        </main>
    );
}
