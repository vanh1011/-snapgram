import { PostStatsSkeleton } from "@/components/skeletons/SharedSkeletons";
import { Skeleton } from "../ui/skeleton";

const HomeSkeleton = () => {
    return (
        <div className="flex flex-col flex-1 gap-9 w-full">
            {Array.from(Array(2).keys()).map((key) => (
                <div key={`home-feed-skeleton-key-${key}`} className="post-card">
                    <div className="flex-between">
                        <div className="flex items-center gap-3">
                            <div>
                                <Skeleton className="w-20 h-20 rounded-full bg-zinc-400 " />
                            </div>
                            <div className="flex flex-col">
                                <Skeleton className="h-5 w-20 mb-2 bg-zinc-400" />
                                <div className="flex-center gap-2 text-light-3">
                                    <Skeleton className="h-5 w-12 bg-zinc-400" />
                                    <Skeleton className="h-5 w-12 bg-zinc-400" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-10">
                        <div className="small-medium lg:base-medium py-5">
                            <Skeleton className="mb-2 h-5 w-full bg-zinc-400" />
                            <Skeleton className="mb-2 h-5 w-full bg-zinc-400" />
                            <Skeleton className="mb-2 h-5 w-1/2 bg-zinc-400" />
                            <ul className="flex gap-1 mt-2">
                                {Array.from(Array(3).keys()).map((tag: number) => (
                                    <Skeleton key={tag} className="h-5 w-10" />
                                ))}
                            </ul>
                        </div>

                        <Skeleton className="post-card_img bg-zinc-600" />
                    </div>

                    {/* Post Stats */}
                    <PostStatsSkeleton />
                </div>
            ))}
        </div>
    );
};

export default HomeSkeleton;
