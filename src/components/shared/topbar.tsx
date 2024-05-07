import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'
import { useEffect } from 'react';
import { useSignOutAccount } from '@/lib/react-query/queriesAndMutations';
import { useUserContext } from '@/context/AuthContext';

const topbar = () => {
    const { mutate: signOut, isSuccess } = useSignOutAccount();
    const navigate = useNavigate();
    const { user } = useUserContext();

    useEffect(() => {
        if (isSuccess) navigate('sign-in');
    }, [isSuccess]);

    return (

        <section className='topbar'>
            <div className='flex-between py-4 px-5'>
                <Link to="/" className='flex gap-3 items-center'>
                    <img
                        src="/assets/images/logo_test.svg"
                        alt='logo'
                        width={170}
                        height={36}
                    />
                </Link>
                <div className='flex gap-4'>
                    <Button variant="ghost" className='shad-button_ghost'
                        onClick={() => signOut()}
                    >
                        {/* <img src='/assets/icons/logout.svg' /> */}
                        <img src=' \assets\icons\logout.svg' />
                    </Button>
                    <Link to={`/profile/${user.id}`} className='flex-center gap-3'>
                        <img
                            src={user.imageUrl || '/assets/icons/profile-placeholder.svg'}
                            alt='profile'
                            className='h-8 w-8 rounded-full'
                        />
                    </Link>
                </div>

            </div>
        </section >
    )
}

export default topbar