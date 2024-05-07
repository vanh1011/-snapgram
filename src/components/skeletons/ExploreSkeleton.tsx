import { GridPostsSkeleton } from "@/components/skeletons/SharedSkeletons";
import { Skeleton } from "../ui/skeleton";

const ExploreSkeleton = () => {
    return (

        <div>
            <div>
                <Skeleton w-50 h-15 bg-zinc-600 />

            </div>
            <div>
                <Skeleton w-20 h-15 bg-zinc-600 />
            </div>
            <div>
                <GridPostsSkeleton />;
            </div>

        </div>


    )
};

export default ExploreSkeleton;
