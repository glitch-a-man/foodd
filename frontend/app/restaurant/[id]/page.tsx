export default function RestaurantPage({ params }: { params: { id: string } }) {
    return (
        <div className="flex items-center justify-center min-h-screen text-center p-4">
            <h1 className="text-2xl font-bold">
                Restaurant Profile Page — Shows restaurant info, menu, and food reels. (ID: {params.id})
            </h1>
        </div>
    );
}
