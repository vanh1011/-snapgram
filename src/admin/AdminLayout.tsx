import SideBar from "@/components/shared/SideBar"
import { Outlet } from "react-router-dom"


const AdminLayout = () => {
    return (
        <div className="flex">
            <SideBar />
            <section className=' flex justify-center w-full'>
                <Outlet />
            </section>

        </div>
    )
}

export default AdminLayout