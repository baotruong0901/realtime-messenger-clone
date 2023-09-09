'use client'

import Avatar from "@/components/Avatar";
import useOtherUser from "@/hooks/useOtherUser";
import { Conversation, User } from "@prisma/client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { HiChevronLeft } from "react-icons/hi";
import { HiEllipsisHorizontal } from "react-icons/hi2";
import ProfileDrawer from "./ProfileDrawer";
import AvatarGroup from "@/components/AvataGroup";
import useActiveList from "@/hooks/useActiveList";

interface HeaderProps {
    conversation: Conversation & {
        users: User[]
    }
}

const Header = ({ conversation }: HeaderProps) => {
    const otherUser = useOtherUser(conversation)
    const [drawerOpen, setDrawerOpen] = useState(false)
    const { members } = useActiveList()
    const isActive = members.indexOf(otherUser?.email!) !== -1

    const statusText = useMemo(() => {
        if (conversation.isGroup) {
            return `${conversation.users.length} members`
        }

        return isActive ? 'Online' : 'Offline'

    }, [conversation, isActive])

    return (
        <>
            <ProfileDrawer
                data={conversation}
                isOpen={drawerOpen}
                onClose={() => setDrawerOpen(false)}
            />
            <div className="flex items-center justify-between border-b border-gray-600 py-3 px-4 sm:x-4 lg:px-6">
                <div className="flex items-center gap-4">
                    <div className="flex gap-3 items-center">
                        <Link className="lg:hidden block text-sky-500 hover:text-sky-600 transition cursor-pointer" href={'/conversations'}>
                            <HiChevronLeft size={32} />
                        </Link>
                        {conversation.isGroup ? (
                            <AvatarGroup users={conversation?.users} />
                        ) : (
                            <Avatar user={otherUser} />
                        )}
                    </div>
                    <div className="flex flex-col">
                        <div className="text-white">
                            {conversation.name || otherUser.name}
                        </div>
                        <div className="text-sm font-light text-neutral-500">
                            {statusText}
                        </div>
                    </div>
                </div>
                <HiEllipsisHorizontal
                    size={32}
                    onClick={() => setDrawerOpen(true)}
                    className="text-gray-300 cursor-pointer  hover:text-gray-400 transition"
                />
            </div>
        </>
    );
}

export default Header;