import FeedContainer from '@/components/FeedContainer';
import AuthGuard from '@/components/AuthGuard';
import BottomNav from '@/components/BottomNav';

export default function ReelsPage() {
    return (
        <AuthGuard>
            <main className="w-full h-[100dvh] overflow-hidden bg-black text-white flex flex-col pb-16">
                <div className="flex-1 relative overflow-hidden">
                    <FeedContainer />
                </div>
                <BottomNav />
            </main>
        </AuthGuard>
    );
}
