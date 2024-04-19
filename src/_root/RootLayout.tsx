

import LeftSidebar from '@/components/shared/LeftSidebar'
import { Outlet } from 'react-router-dom'
import Bottombar from '@/components/shared/Bottombar'
import Topbar from '@/components/shared/topbar'
const RootLayout = () => {
    return (
        <div className='w-full md:flex'>
            <Topbar />
            <LeftSidebar />
            <section className='flex flex-1 h-full'>
                <Outlet />
            </section>
            <Bottombar />
        </div>
    )
}

export default RootLayout