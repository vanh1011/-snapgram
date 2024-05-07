import { useUserContext } from "@/context/AuthContext"
import { Models } from "appwrite"
import { Link } from "react-router-dom"
import PostStats from "./PostStats";

import { ProfilePostsSkeleton } from "../skeletons";

type GridPostListProps = {
    posts?: Models.Document[];
    showUser?: boolean;
    showStats?: boolean;
}

const GridPostList = ({ posts, showUser = true, showStats = true }: GridPostListProps) => {
    const { user } = useUserContext();
    return (
        <div>
            {!posts ? (
                <ProfilePostsSkeleton />
            ) : (
                <ul className="grid-container">
                    {posts?.map((post) => (

                        <li key={post.$id} className=" p-1  relative min-w-80 h-80">
                            {/* {post.caption} */}
                            <Link to={`/posts/${post.$id}`} className="gird-post_link">
                                <img
                                    src={post?.imageUrl}
                                    alt="post"
                                    className="h-full w-full object-cover rounded-lg"
                                />
                            </Link>
                            <div className="grid-post_user">
                                {showUser && (
                                    <div className="flex items-center justify-start gap-2 flex-1">
                                        <img
                                            src={post?.creator?.imageUrl}
                                            alt="creator"
                                            className="h-8 w-8 rounded-full"
                                        />
                                        <p className="line-clamp-1">{post?.creator?.name}</p>
                                    </div>
                                )}
                                {showStats && <PostStats post={post} userId={user?.id} />

                                }

                            </div>


                        </li>
                    ))}
                </ul>
            )
            }



        </div>



    )
}

export default GridPostList