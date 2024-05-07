import { GridPostsSkeleton } from "@/components/skeletons";
import { Skeleton } from "@/components/ui/skeleton";

export const ProfileDetailSkeleton = () => {
    return (
        <>
            <div className="profile-container">
                <div className="flex xl:flex-row flex-col max-xl:items-center flex-1 gap-7">
                    <Skeleton className="w-10 h-10 rounded-full lg:w-24 lg:h-24 bg-slate-400" />
                    <div className="flex flex-col flex-1 justify-between md:mt-2">
                        <div className="flex flex-col w-full">
                            <h1 className="text-center xl:text-left h3-bold md:h1-semibold w-full">
                                <Skeleton className="h-8 w-40 bg-slate-600" />

                            </h1>
                            <p className="mt-2 small-regular md:body-medium text-light-3 text-center xl:text-left">
                                <Skeleton className="h-6 w-40 bg-slate-600" />
                            </p>
                        </div>
                        <div className="flex gap-8 mt-10 items-center justify-center xl:justify-start flex-wrap z-20">
                            <Skeleton className="h-4 w-20 bg-slate-200" />
                            <Skeleton className="h-4 w-20 bg-slate-200" />
                            <Skeleton className="h-4 w-20 bg-slate-200" />

                        </div>

                    </div>

                    <div className="flex justify-center gap-4">
                        <p className=" mr-10  flex whitespace-nowrap small-medium">
                            <Skeleton className="h-10 w-40 bg-slate-200" />
                        </p>
                    </div>
                </div>
                <div className="flex max-w-5xl mt-35 mr-96 ">
                    <Skeleton className="h-10 w-20 bg-slate-600 mr-8" />
                    <Skeleton className="h-10 w-20 bg-slate-600" />
                </div>

            </div>
        </>
    );
};

export const ProfilePostsSkeleton = () => {
    return <GridPostsSkeleton />;
};
