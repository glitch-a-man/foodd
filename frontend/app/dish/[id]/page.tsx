export default function DishPage({ params }: { params: { id: string } }) {
    return (
        <div className="flex items-center justify-center min-h-screen text-center p-4">
            <h1 className="text-2xl font-bold">
                Dish Page — Users can order a specific dish here. (ID: {params.id})
            </h1>
        </div>
    );
}
