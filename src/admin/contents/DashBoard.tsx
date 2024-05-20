/* eslint-disable */
import Loader from "@/components/shared/Loader";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useGetRecentPosts } from "@/lib/react-query/queriesAndMutations";
import { Models } from "appwrite";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
const DashBoard = () => {

    const { data: posts, isPending: isPostLoading, isError: isErrorPosts } = useGetRecentPosts();

    return (
        <div className=''>
            <div className=''>
                <h2 className='h3-bold md:h2-bold text-left w-full'>All Posts</h2>
                <Table className="w-full">
                    <TableHeader>
                        <TableRow className='text-gray-200 uppercase bg-gray-700'>
                            <TableHead className="w-[100px]">ID</TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead>Caption</TableHead>
                            <TableHead>Created At</TableHead>
                            <TableHead>Location</TableHead>
                            <TableHead>Created Name</TableHead>
                            <TableHead className="text-center">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className='text-gray-200 bg-gray-900'>

                        {posts?.documents.map((post: Models.Document) => (
                            <TableRow>
                                <TableCell className="font-extrabold">{post.$id}</TableCell>
                                <TableCell>{post.title}</TableCell>
                                <TableCell>{post.caption}</TableCell>
                                <TableCell>{post.$createdAt}</TableCell>
                                <TableCell>{post.location}</TableCell>
                                <TableCell>{post.creator.name}</TableCell>
                                <TableCell className=' flex justify-center '>
                                    <Button className='bg-green-700 hover:bg-green-900 text-light-1 flex gap-2 mx-3'
                                        onClick={() => {
                                            alert('View information user')
                                        }}
                                    > View</Button>

                                    <Button className="bg-sky-700 hover:bg-sky-900 text-light-1 flex gap-2 mx-3"
                                    // onClick={() => props.handleClickBtnUpdate(item)}
                                    >Update</Button>

                                    <Button className=" bg-orange-700 hover:bg-orange-900 text-light-1 flex gap-2 mx-3 "
                                    // onClick={() => props.handleClickBtnDelete(item)}
                                    >Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}

                    </TableBody>

                </Table>

                {/* {isPostLoading && !posts ? (
                    <Loader />
                ) : (

                    <ul className='flex flex-col flex-1 gap-9 w-full'>

                        {posts?.documents.map((post: Models.Document) => (
                            <li>


                            </li>
                        ))}
                    </ul>
                )} */}
            </div>
        </div>
    )
}

export default DashBoard