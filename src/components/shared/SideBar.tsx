
import { sidebaradminLinks } from '@/constants';
import { useUserContext } from '@/context/AuthContext';
import { INavLink } from '@/types';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { useSignOutAccount } from '@/lib/react-query/queriesAndMutations';
import { useEffect } from 'react';

const SideBar = () => {

    const { user } = useUserContext();
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const { mutate: signOut, isSuccess } = useSignOutAccount();

    useEffect(() => {
        if (isSuccess) navigate('sign-in');
    }, [isSuccess]);
    return (
        <nav className='leftsidebar'>
            <div className='flex flex-col gap-11'>
                <Link to="/" className='flex gap-3 items-center'>
                    <img
                        src="/assets/images/logo_test.svg"
                        alt='logo'
                        width={130}
                        height={325}
                    />
                </Link>
                <Link to={`/profile/${user.id}`} className='flex gap-3 items-center'>
                    <img
                        src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
                        alt='profile'
                        className='h-14 w-14 rounded-full'
                    />
                    <div className='flex flex-col'>
                        <p className='body-bold'>
                            {user.name}
                        </p>
                        <p className='small-regular textlight-3'>
                            @{user.username}
                        </p>
                    </div>
                </Link>
                <ul className='flex flex-col gap-6 max-h-96 overflow-y-auto custom-scrollbar pr-2'>
                    {sidebaradminLinks.map((link: INavLink) => {
                        const isActive = pathname === link.route;
                        return (
                            <li key={link.label}
                                className={`leftsidebar-link group ${isActive && 'bg-primary-500'}`}
                            >
                                <NavLink
                                    to={link.route}
                                    className="flex gap-4 items-center p-4"
                                >
                                    <img
                                        src={link.imgURL}
                                        alt={link.label}
                                        className=
                                        {`group-hover:invert-white 
                                        ${isActive && 'invert-white'}`}
                                    />
                                    {link.label}
                                </NavLink>
                            </li>
                        )
                    })
                    }
                </ul>
            </div>

            <Button
                variant="ghost"
                className='shad-button_ghost'
                onClick={() => signOut()}
            >
                <img src=' \assets\icons\logout.svg' />
                <p className='small-medium lg:base-medium'> Log out</p>
            </Button>

        </nav>

    )
}

export default SideBar