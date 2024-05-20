import Loader from '@/components/shared/Loader';
import * as z from "zod";
import { useGetUserById, useGetUsers, useUpdateUser } from '@/lib/react-query/queriesAndMutations';

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
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
// import { ProfileValidation } from '@/lib/validation';
// import { toast } from '@/components/ui/use-toast';
import { useUserContext } from '@/context/AuthContext';

const ManageUser = () => {
    // const { user, setUser } = useUserContext();

    const {
        data: creators,
        isLoading: isUserLoading,
        isError: isErrorCreators,
    } = useGetUsers(10, 0);

    if (isErrorCreators) {
        return (
            <div className="flex flex-1">
                <div className="home-creators">
                    <p className="body-medium text-light-1">Something bad happened</p>
                </div>
            </div>
        );
    }


    // // Queries
    // const { data: currentUser } = useGetUserById(id || "");
    // const { mutateAsync: updateUser, isLoading: isLoadingUpdate } = useUpdateUser();

    // if (!currentUser)
    //     return (
    //         <div className="flex-center w-full h-full">
    //             <Loader />
    //         </div>
    //     );

    // // Handler
    // const handleUpdate = async (value: z.infer<typeof ProfileValidation>) => {
    //     const updatedUser = await updateUser({
    //         userId: currentUser.$id,
    //         name: value.name,
    //         bio: value.bio,
    //         file: value.file,
    //         imageUrl: currentUser.imageUrl,
    //         imageId: currentUser.imageId,
    //     });

    //     if (!updatedUser) {
    //         toast({
    //             title: `Update user failed. Please try again.`,
    //         });
    //     }

    //     setUser({
    //         ...user,
    //         name: updatedUser?.name,
    //         bio: updatedUser?.bio,
    //         imageUrl: updatedUser?.imageUrl,
    //     });
    //     // return navigate(`/profile/${id}`);
    // };


    return (

        <div className=" w-full">
            <div>
                <h3 className="h3-bold text-light-1">All Creators</h3>
                <Table className='w-full'>
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
                                        <TableCell className='flex-col text-center'>
                                            <Link to={`/profile/${creator.$id}`}>
                                                <img
                                                    src={creator?.imageUrl || 'assets/icons/profile-placeholder.svg'}
                                                    alt="creator"
                                                    className="rounded-full w-8 lg:h-8 mx-auto my-[3px]"
                                                />
                                            </Link>
                                            {creator.name}

                                        </TableCell>
                                        <TableCell>{creator.username}</TableCell>
                                        <TableCell>{creator.email}</TableCell>
                                        <TableCell>{creator.bio}</TableCell>
                                        <TableCell className=' flex justify-center min-w-fit'>
                                            {/* view */}
                                            <Dialog >
                                                <DialogTrigger asChild className='bg-green-700 hover:bg-green-900 text-light-1 flex gap-2 mx-3'>
                                                    <Button variant="outline">View</Button>
                                                </DialogTrigger>
                                                <DialogContent className="sm:max-w-[425px]">
                                                    <DialogHeader>
                                                        <DialogTitle>View profile</DialogTitle>
                                                        {/* <DialogDescription>
                                                            Make changes to your profile here. Click save when you're done.
                                                        </DialogDescription> */}
                                                    </DialogHeader>
                                                    <div className="grid gap-4 py-4">
                                                        <div className="grid grid-cols-4 items-center gap-4">
                                                            <Label htmlFor="name" className="text-right">
                                                                ID Account
                                                            </Label>

                                                            <Input
                                                                id="name"
                                                                defaultValue={creator.$id}
                                                                className="col-span-3"
                                                                disabled
                                                            />
                                                        </div>
                                                        <div className="grid grid-cols-4 items-center gap-4 justify-center ">
                                                            <Label htmlFor="name" className="text-right">
                                                                Name
                                                            </Label>
                                                            <Input
                                                                id="name"
                                                                defaultValue={creator.name}
                                                                className="col-span-3"
                                                                disabled
                                                            />
                                                        </div>
                                                        <div className="grid grid-cols-4 items-center gap-4">
                                                            <Label htmlFor="username" className="text-right">
                                                                Username
                                                            </Label>
                                                            <Input
                                                                id="username"
                                                                defaultValue={creator.username}
                                                                className="col-span-3"
                                                                disabled
                                                            />
                                                        </div>
                                                        <div className="grid grid-cols-4 items-center gap-4">
                                                            <Label htmlFor="username" className="text-right">
                                                                Email
                                                            </Label>
                                                            <Input
                                                                id="username"
                                                                defaultValue={creator.email}
                                                                className="col-span-3"
                                                                disabled
                                                            />
                                                        </div>
                                                        <div className="grid grid-cols-4 items-center gap-4">
                                                            <Label htmlFor="username" className="text-right">
                                                                Bio
                                                            </Label>
                                                            <Input
                                                                id="username"
                                                                defaultValue={creator.bio}
                                                                className="col-span-3"
                                                                disabled
                                                            />
                                                        </div>
                                                    </div>
                                                    <DialogFooter>
                                                        <DialogClose asChild>
                                                            <Button type="button" variant="secondary " className='bg-orange-700 hover:bg-orange-900 text-light-1 flex gap-2'>
                                                                Close
                                                            </Button>
                                                        </DialogClose>
                                                    </DialogFooter>
                                                </DialogContent>
                                            </Dialog>
                                            {/* Update button  */}
                                            {/* <Button>
                                                <Link
                                                    to={`/update-profile/${creator.$id}`}
                                                    className={`h-12 bg-dark-4 px-5 text-light-1 flex-center gap-2 rounded-lg"
                                                        }`}>
                            
                                                    <p className="  flex whitespace-nowrap small-medium">
                                                        Edit Profile
                                                    </p>
                                                </Link>
                                            </Button> */}
                                            <Dialog >
                                                <DialogTrigger asChild className="bg-sky-700 hover:bg-sky-900 text-light-1 flex gap-2 mx-3">
                                                    <Button variant="outline">
                                                        update
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent className="sm:max-w-[425px]">
                                                    <DialogHeader>
                                                        <DialogTitle>Update profile</DialogTitle>
                                                    </DialogHeader>
                                                    <div className="grid gap-4 py-4">
                                                        <div className="grid grid-cols-4 items-center gap-4">
                                                            <Label htmlFor="name" className="text-right">
                                                                ID Account
                                                            </Label>
                                                            <Input
                                                                id="name"
                                                                defaultValue={creator.$id}
                                                                className="col-span-3"
                                                                disabled
                                                            />
                                                        </div>
                                                        <div className="grid grid-cols-4 items-center gap-4">
                                                            <Label htmlFor="name" className="text-right">
                                                                Name
                                                            </Label>
                                                            <Input
                                                                id="name"
                                                                defaultValue={creator.name}
                                                                className="col-span-3 bg-slate-600"

                                                            />
                                                        </div>
                                                        <div className="grid grid-cols-4 items-center gap-4">
                                                            <Label htmlFor="username" className="text-right">
                                                                Username
                                                            </Label>
                                                            <Input
                                                                id="username"
                                                                defaultValue={creator.username}
                                                                className="col-span-3 bg-slate-600"

                                                            />
                                                        </div>
                                                        <div className="grid grid-cols-4 items-center gap-4">
                                                            <Label htmlFor="username" className="text-right">
                                                                Email
                                                            </Label>
                                                            <Input
                                                                id="username"
                                                                defaultValue={creator.email}
                                                                className="col-span-3"
                                                                disabled
                                                            />
                                                        </div>
                                                        <div className="grid grid-cols-4 items-center gap-4">
                                                            <Label htmlFor="username" className="text-right">
                                                                Bio
                                                            </Label>
                                                            <Input
                                                                id="username"
                                                                defaultValue={creator.bio}
                                                                className="col-span-3 bg-slate-600"

                                                            />
                                                        </div>
                                                    </div>
                                                    <DialogFooter>
                                                        <DialogClose asChild>

                                                            <Button type="submit" className='bg-orange-700 hover:bg-orange-900 text-light-1 flex gap-2'>
                                                                Save changes
                                                            </Button>
                                                        </DialogClose>
                                                    </DialogFooter>
                                                </DialogContent>
                                            </Dialog>

                                            <Button className=" bg-orange-700 hover:bg-orange-900 text-light-1 flex gap-2 mx-3 "
                                            // onClick={() => props.handleClickBtnDelete(item)}
                                            >Delete
                                            </Button>

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