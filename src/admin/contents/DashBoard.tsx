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
import { useGetRecentPosts } from "@/lib/react-query/queriesAndMutations";
import { Models } from "appwrite";
const DashBoard = () => {

    const { data: posts, isPending: isPostLoading, isError: isErrorPosts } = useGetRecentPosts();

    return (
        <div className=''>
            <div className=''>
                <h2 className='h3-bold md:h2-bold text-left w-full'>All Post</h2>
                <Table>
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
                                <TableCell>
                                    <Button className="bg-slate-600 mx-3 btn-secondary"
                                        onClick={() => {
                                            alert('View information user')
                                        }}
                                    > View</Button>

                                    <Button className="bg-slate-600  btn-warning mx-3"
                                    // onClick={() => props.handleClickBtnUpdate(item)}
                                    >Update</Button>

                                    <Button className="bg-slate-600 btn-danger mx-3"
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