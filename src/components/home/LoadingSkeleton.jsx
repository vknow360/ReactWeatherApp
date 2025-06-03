import React from "react";

const LoadingSkeleton = () => {
    return (
        <div className="space-y-6 w-full">
            {/* Header Skeleton */}
            <div className="bg-white/60 rounded-2xl p-6 shadow-lg">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="space-y-3 w-full md:w-auto">
                        <div className="h-8 w-64 bg-gray-200 rounded-lg animate-pulse"></div>
                        <div className="h-4 w-48 bg-gray-200 rounded-lg animate-pulse"></div>
                    </div>
                    <div className="w-full md:w-96 h-12 bg-gray-200 rounded-xl animate-pulse"></div>
                </div>
            </div>

            {/* Current Weather Skeleton */}
            <div className="bg-white/60 rounded-2xl p-6 shadow-lg">
                <div className="flex flex-wrap gap-6">
                    <div className="w-20 h-20 bg-gray-200 rounded-xl animate-pulse"></div>
                    <div className="space-y-3 flex-1">
                        <div className="h-8 w-48 bg-gray-200 rounded-lg animate-pulse"></div>
                        <div className="h-6 w-32 bg-gray-200 rounded-lg animate-pulse"></div>
                    </div>
                    <div className="flex gap-4 w-full md:w-auto">
                        {[...Array(3)].map((_, i) => (
                            <div
                                key={i}
                                className="h-16 w-28 bg-gray-200 rounded-xl animate-pulse"
                            ></div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Today's Forecast Skeleton */}
            <div className="bg-white/60 rounded-2xl p-6 shadow-lg">
                <div className="mb-6">
                    <div className="h-10 w-48 bg-gray-200 rounded-lg animate-pulse"></div>
                </div>
                <div className="flex gap-4 overflow-hidden">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="flex-none w-[140px]">
                            <div className="h-44 bg-gray-200 rounded-xl animate-pulse"></div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Weekly Forecast Skeleton */}
            <div className="bg-white/60 rounded-2xl p-6 shadow-lg">
                <div className="space-y-4">
                    <div className="h-10 w-48 bg-gray-200 rounded-lg animate-pulse"></div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {[...Array(4)].map((_, i) => (
                            <div
                                key={i}
                                className="h-48 bg-gray-200 rounded-xl animate-pulse"
                            ></div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoadingSkeleton;
