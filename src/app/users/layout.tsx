import Sidebar from "@/components/sidebar/Sidebar";
import UserList from "./components/UserList";
import { getUsers } from "@/libs/actions/getUsers";


export default async function Layout({
    children
}: {
    children: React.ReactNode,
}) {
    const users = await getUsers()

    return (
        <Sidebar>
            <div className="h-screen flex">
                <UserList items={users!} />
                {children}
            </div>
        </Sidebar>
    );
}