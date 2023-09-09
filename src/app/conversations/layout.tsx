import Sidebar from "@/components/sidebar/Sidebar";
import { getUsers } from "@/libs/actions/getUsers";
import ConversationList from "./components/ConversationList";
import getConversations from "@/libs/actions/getConversations";


export default async function Layout({
    children
}: {
    children: React.ReactNode,
}) {
    const conversations = await getConversations()
    const users = await getUsers()
    return (
        <Sidebar>
            <div className="h-screen flex">
                <ConversationList
                    users={users!}
                    initialItems={conversations}
                />
                {children}
            </div>
        </Sidebar>
    );
}