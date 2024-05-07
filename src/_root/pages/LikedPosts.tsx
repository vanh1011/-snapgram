
import GridPostList from "@/components/shared/GridPostList";
import { GridPostsSkeleton } from "@/components/skeletons";
import { useGetCurrentUser } from "@/lib/react-query/queriesAndMutations";

const LikedPosts = () => {
    const { data: currentUser } = useGetCurrentUser();

    if (!currentUser)
        return (
            <div className="flex-center w-full h-full">
                <GridPostsSkeleton />
            </div>
        );

    return (
        <>
            {currentUser.liked.length === 0 && (
                <p className="text-light-4">No liked posts</p>
            )}

            <GridPostList posts={currentUser.liked} showStats={false} />
        </>
    );
};

export default LikedPosts;