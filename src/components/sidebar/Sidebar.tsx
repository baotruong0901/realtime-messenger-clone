import getCurrentUser from "@/libs/actions/getCurrentUser";
import DesktopSidebar from "./DesktopSidebar";
import MobileFooter from "./MobileFooter";


async function Sidebar({ children }: {
    children: React.ReactNode,
}) {
    const currentUser = await getCurrentUser()
    return (
        <div className="min-h-screen">
            <DesktopSidebar currentUser={currentUser!} />
            <MobileFooter />
            <main className="lg:pl-20 min-h-screen">
                {children}
            </main>
        </div>
    )
}

export default Sidebar;