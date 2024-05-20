import SideBar from "@/components/shared/SideBar"
import { Outlet } from "react-router-dom"


const AdminLayout = () => {
    return (
        <div className="w-full flex">
            <SideBar />
            <section className=' flex flex-1 h-full'>
                <Outlet />
            </section>

        </div>
    )
}

export default AdminLayout