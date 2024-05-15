import Loader from '@/components/shared/Loader';

import { useGetUsers } from '@/lib/react-query/queriesAndMutations';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from '@/components/ui/button';

const ManageUser = () => {

    const {
        data: creators,
        isLoading: isUserLoading,
        isError: isErrorCreators,
    } = useGetUsers(10);

    if (isErrorCreators) {
        return (
            <div className="flex flex-1">
                <div className="home-creators">
                    <p className="body-medium text-light-1">Something bad happened</p>
                </div>
            </div>
        );
    }
    return (

        <div className=" w-full">
            <div>
                <h3 className="h3-bold text-light-1">All Creators</h3>
                <Table>
                    {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
                    <TableHeader>
                        <TableRow className='text-gray-200 uppercase bg-gray-700'>
                            <TableHead className="w-[100px]">ID</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Username</TableHead>
                            <TableHead >Email</TableHead>
                            <TableHead>Bio</TableHead>
                            <TableHead className="text-center">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className='text-gray-200 bg-gray-900'>
                        {
                            isUserLoading && !creators ? (
                                <Loader />
                            ) : (
                                creators?.documents.map((creator) => (
                                    <TableRow>
                                        <TableCell className="font-extrabold">{creator.$id}</TableCell>
                                        <TableCell>{creator.name}</TableCell>
                                        <TableCell>{creator.username}</TableCell>
                                        <TableCell>{creator.email}</TableCell>
                                        <TableCell>{creator.bio}</TableCell>
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
                                ))
                            )
                        }
                    </TableBody>
                </Table>
                {/* <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ' >
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3" >ID</th>
                            <th scope="col" className="px-6 py-3">Name</th>
                            <th scope="col" className="px-6 py-3">Username</th>
                            <th scope="col" className="px-6 py-3">Email</th>
                            <th scope="col" className="px-6 py-3">Bio</th>
                            <th scope="col" className="px-6 py-3">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            creators?.documents.map((creator) => (
                                <tr key={creator?.$id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 ">
                                    <td className='px-6 py-4'>{creator.$id}</td>
                                    <td className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>{creator.name}</td>
                                    <td className='px-6 py-4'>{creator.username}</td>
                                    <td className='px-6 py-4'>{creator.email}</td>
                                    <td className='px-6 py-4'>{creator.bio}</td>
                                    <td>
                                        <Button className="btn btn-secondary"
                                        // onClick={() => { props.handleClickBtnView(item) }}
                                        >View</Button>

                                        <Button className=" btn-warning mx-3"
                                        // onClick={() => props.handleClickBtnUpdate(item)}
                                        >Update</Button>

                                        <Button className=""
                                        // onClick={() => props.handleClickBtnDelete(item)}
                                        >Delete</Button>
                                    </td>
                                </tr>
                            ))

                        }

                    </tbody>
                </table> */}
            </div>
        </div >




    )
}

export default ManageUser