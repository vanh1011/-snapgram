import { Models } from "appwrite"

type PostStatsProps = {
    post: Models.Document;
    userId: String;
}
const PostStats = ({ post, userId }: PostStatsProps) => {
    return (
        <div className="flex justify-between items-center z-20">
            <div className=" flex gap-2 mr-5">
                <img
                    src="/assets/icons/liked.svg"
                    alt="like"
                    height={20}
                    width={20}
                    className="cursor-pointer"

                />
                <p className="smal-medium lg:base-medium ">0</p>
            </div>

            <div className=" flex gap-2 mr-5">
                <img
                    src="/assets/icons/saved.svg"
                    alt="like"
                    height={20}
                    width={20}
                    className="cursor-pointer"

                />

            </div>
        </div>
    )
}

export default PostStats