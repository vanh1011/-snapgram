import GridPostList from "@/components/shared/GridPostList";
import Loader from "@/components/shared/Loader";
import PostCaption from "@/components/shared/PostCaption";
import PostStats from "@/components/shared/PostStats";
import { GridPostsSkeleton, PostDetailsSkeleton } from "@/components/skeletons";
// import {
//     AlertDialog,
//     AlertDialogAction,
//     AlertDialogCancel,
//     AlertDialogContent,
//     AlertDialogDescription,
//     AlertDialogFooter,
//     AlertDialogHeader,
//     AlertDialogTitle,
//     AlertDialogTrigger
// } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useUserContext } from "@/context/AuthContext";
import { appwriteConfig, client, databases } from "@/lib/appwrite/config";
import { useDeletePost, useGetPostById, useGetUserPosts } from "@/lib/react-query/queriesAndMutations"
import { multiFormatDateString } from "@/lib/utils";
import { commentStore } from "@/state/commentsState";
import { AppwriteException, ID, Models, Query } from "appwrite";

import { useEffect, useRef, useState } from "react";
// import { title } from "process";
import { useParams, Link, useNavigate } from "react-router-dom";


const PostDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: post, isPending } = useGetPostById(id || " ");
    const { mutate: deletePost } = useDeletePost();
    const { user } = useUserContext();
    const { data: userPosts, isPending: isUserPostLoading } = useGetUserPosts(
        post?.creator.$id
    );
    const relatedPosts = userPosts?.documents.filter(
        (userPost) => userPost.$id !== id
    );
    //varible cho func expand caption
    const [expanded, setExpanded] = useState(false);

    const commentState = commentStore();
    const { toast } = useToast();
    const isFetched = useRef(false);
    const [loading, setLoading] = useState(false);
    const [comment, setComment] = useState("");



    const renderCaption = () => {
        if (!post?.caption) return null;

        const maxLength = 92;
        const shouldExpand = post.caption.length > maxLength;

        return (
            <div>
                {shouldExpand ? (
                    <>
                        {expanded ? (
                            <PostCaption paragraph={post.caption} />
                        ) : (
                            <>
                                <PostCaption paragraph={post.caption.slice(0, maxLength)} />
                                <p>.....</p>
                            </>
                        )}
                        <Button
                            onClick={() => setExpanded(!expanded)}
                            className="hover:shad-button_primary my-3">
                            {expanded ? "Show less" : "Show more"}
                        </Button>
                    </>
                ) : (
                    <p>{post.caption}</p>
                )}
            </div>
        );
    };


    // delete post
    const handleDeletePost = () => {

        // sử dụng toán tử non-null assertion (!) để chắc chắn răng id luôn có giá trị hợp lệ
        const message = deletePost({ postId: id!, imageId: post?.imageId });
        if (message !== undefined) {
            toast({
                title: " Delete post successfully "
            });
        }
        navigate(-1);
    }

    useEffect(() => {
        if (!isFetched.current) {
            fetchComments();

            //   * For Realtime Things
            client.subscribe(
                `databases.${appwriteConfig.databaseId}.collections.${appwriteConfig.commentCollectionId}.documents`,
                (response) => {
                    console.log("The realtime response is ", response);
                    const payload = response.payload as Models.Document;

                    //   * If It's new comment
                    if (
                        response.events.includes(
                            "databases.*.collections.*.documents.*.create"
                        )
                    ) {
                        if (user.id !== payload["user_id"]) {
                            commentState.addComment(payload);
                        }
                    } else if (
                        response.events.includes(
                            "databases.*.collections.*.documents.*.delete"
                        )
                    ) {
                        commentState.deleteComment(payload.$id);
                    }
                }
            );

            isFetched.current = true;
        }
    }, []);

    const fetchComments = () => {
        setLoading(true);
        databases
            .listDocuments(
                appwriteConfig.databaseId,
                appwriteConfig.commentCollectionId,
                id ? [Query.equal("post_id", id)] : []
            )
            .then((res) => {
                setLoading(false);
                commentState.addComments(res.documents);
            })
            .catch((err: AppwriteException) => {
                setLoading(false);
                toast({
                    title: err.message,
                });
            });
    };
    // * To handle submit
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        databases
            .createDocument(
                appwriteConfig.databaseId,
                appwriteConfig.commentCollectionId,
                ID.unique(),
                {
                    comment: comment,
                    user_id: user.id,
                    post_id: id,
                    name: user.name,
                    imageUrl: user.imageUrl,
                }
            )
            .then((res) => {
                commentState.addComment(res);
                setComment("");
            })
            .catch((err: AppwriteException) => {
                toast({
                    title: err.message,
                });
            });
    };

    return (
        <div className="post_details-container">
            <div className="hidden md:flex max-w-5xl w-full">
                <Button
                    onClick={() => navigate(-1)}
                    variant="ghost"
                    className="shad-button_ghost">
                    <img
                        src={"/assets/icons/back.svg"}
                        alt="back"
                        width={24}
                        height={24}
                    />
                    <p className="small-medium lg:base-medium">Back</p>
                </Button>
            </div>
            {isPending || !post ?
                (<PostDetailsSkeleton />) :

                (<div className="post_details-card">
                    <img
                        src={post?.imageUrl}
                        alt="creator"
                        className="post_details-img"
                    />
                    <div className=" post_details-info ">
                        <div className="flex-between w-full">
                            <Link to={`/profile/${post?.creator.$id}`} className="flex items-center gap-3">
                                <img
                                    src={post?.creator?.imageUrl || 'assets/icons/profile-placeholder.svg'}
                                    alt="creator"
                                    className="rounded-full  w-8 h-8  lg:w-12 lg:h-12"
                                />
                                <div className="fex flex-col">
                                    <p className="base-medium lg:body-bold text-light-1">
                                        {post?.creator.name}
                                    </p>
                                    <div className="flex-center gap-2 text-light-3">
                                        <p className="subtle-semibold lg:small-regular">
                                            {multiFormatDateString(post?.$createdAt)}
                                        </p> -
                                        <p className="subtle-semibold lg:small-regular">
                                            {post?.location}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                            <div className="flex-center gap-3">
                                <Link to={`/update-post/${post?.$id}`}
                                    className={`${user.id !== post?.creator.$id && 'hidden'}`}>
                                    <img src="/assets/icons/edit.svg"
                                        height={24}
                                        width={24}
                                        alt="edit"
                                    />
                                </Link>
                                {/* <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            className={`ghost_details-delete_btn ${user.id !== post?.creators.$id && "hidden"
                                                }`}>
                                            <img
                                                src="/assets/icons/delete.svg"
                                                alt="delete"
                                                width={24}
                                                height={24}
                                            />
                                        </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Confirmination</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                Are you sure you want to delete in this post?
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                            <AlertDialogAction
                                                className="shad-button_primary whitespace-nowrap"
                                                onClick={handleDeletePost}>
                                                Continue
                                            </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog> */}
                                <button
                                    onClick={handleDeletePost}
                                    // variant="ghost"
                                    className={`ghost_details-delete_btn ${user.id !== post?.creator.$id && 'hidden'} `}
                                >
                                    <img
                                        src="/assets/icons/delete.svg"
                                        alt="delete"
                                        width={24}
                                        height={24}
                                    />
                                </button>
                            </div>
                        </div>
                        <hr className="border w-full border-dark-4/80" />
                        <div className="flex flex-col flex-1 w-full small-medium lg:base-regular">
                            {/* <p>{post?.caption}</p> */}
                            {renderCaption()}
                            <ul className="flex gap-1 mt-2">
                                {post?.tags.map((tag: string) => (
                                    <li key={tag} className="text-light-3">
                                        #{tag}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        {/* start comment here */}

                        <div className="flex-1 p-4 overflow-y-auto custom-scrollbar w-full max-h-96">
                            {commentState.comments.length > 0 ? (
                                commentState.comments.map((item) => (
                                    <div className="flex mb-5 justify-start" key={item.$id}>
                                        <div className="mr-auto max-w-lg rounded-xl flex items-center relative gap-3">
                                            <Link
                                                to={`/profile/${item["user_id"]}`}
                                                className="flex gap-3 items-center h-full w-9">
                                                <img
                                                    src={
                                                        item["imageUrl"] ||
                                                        "/assets/icons/profile-placeholder.svg"
                                                    }
                                                    alt="profile"
                                                    className=" rounded-full"
                                                />
                                            </Link>
                                            <div className="flex flex-col">
                                                <div className="flex flex-row gap-3">
                                                    <h1 className="font-bold text-light-3" >{item["name"]}</h1>
                                                    <div className="break-all">{item["comment"]}</div>
                                                </div>
                                                <div className="text-light-4">
                                                    <p className="subtle-semibold lg:small-regular ">
                                                        {multiFormatDateString(item["$createdAt"])}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center text-gray-500">
                                    Let's comment something
                                </div>
                            )}
                        </div>
                        <div className="text-center"> {loading && <Loader />}</div>
                        {/* end comment  */}

                        <div className="w-full">
                            <PostStats post={post} userId={user.id} />
                        </div>
                        <div className="w-full flex flex-row gap-2">
                            <form
                                onSubmit={handleSubmit}
                                className="w-full flex flex-row gap-2">
                                <Link
                                    to={`/profile/${user.id}`}
                                    className="flex gap-3 items-center h-full w-12">
                                    <img
                                        src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
                                        alt="profile"
                                        className=" rounded-full"
                                    />
                                </Link>

                                <Input
                                    type="text"
                                    placeholder="Write your comment..."
                                    onChange={(e) => setComment(e.target.value)}
                                    value={comment}
                                    className="shad-input w-full"></Input>
                                <button type="submit">
                                    <img
                                        src="/assets/icons/send-message.svg"
                                        alt="Send"
                                        className="h-5 w-5 invert-white"
                                    />
                                </button>
                            </form>
                        </div>


                    </div>
                </div>
                )}

            <div className="w-full max-w-5xl">
                <hr className="border w-full border-dark-4/80" />

                <h3 className="body-bold md:h3-bold w-full my-10">
                    More Related Posts
                </h3>
                {isUserPostLoading || !relatedPosts ? (
                    <GridPostsSkeleton />
                ) : (
                    <GridPostList posts={relatedPosts} />
                )}
            </div>
        </div>
    );
};

export default PostDetails;