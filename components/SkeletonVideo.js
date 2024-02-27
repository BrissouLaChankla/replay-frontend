export default function SkeletonVideo() {
    return (
        <div className="rounded-lg overflow-hidden col-span-12 md:col-span-6 lg:col-span-4 relative">
            <div className="flex flex-col gap-4">
                <div className="skeleton h-64 w-full"></div>
                <div className="flex gap-16">
                    <div className="skeleton h-4 w-4/6"></div>
                    <div className="skeleton h-4 w-2/6"></div>
                </div>
            </div>
        </div>

    )
}
