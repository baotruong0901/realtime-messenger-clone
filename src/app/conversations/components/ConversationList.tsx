"use client"

import useConversation from "@/hooks/useConversation";
import { FullConversationType } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { MdOutlineGroupAdd } from "react-icons/md"
import ConversationBox from "./ConversationBox";
import GroupModal from "./GroupModal";
import { User } from "@prisma/client";
import { useSession } from "next-auth/react";
import { pusherClient } from "@/libs/pusher";
import { find } from "lodash";
interface ConversationProps {
    initialItems: FullConversationType[],
    users: User[]
}

const ConversationList = ({ initialItems, users }: ConversationProps) => {
    const session = useSession()

    const [items, setItems] = useState(initialItems)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const router = useRouter()

    const { conversationId, isOpen } = useConversation()

    const pusherKey = useMemo(() => {
        return session?.data?.user?.email
    }, [session?.data?.user?.email])

    useEffect(() => {
        if (!pusherKey) {
            return
        }

        pusherClient.subscribe(pusherKey)

        const newHandler = (conversation: FullConversationType) => {
            setItems((current) => {
                if (find(current, { id: conversation.id })) {
                    return current
                }
                return [conversation, ...current]
            })
        }
        const updateHandler = (conversation: FullConversationType) => {
            setItems((current) => current.map((item) => {
                if (item.id === conversation.id) {
                    return {
                        ...item,
                        messages: conversation.messages
                    }
                }
                return item
            }));
        }
        const deleteHandler = (conversation: FullConversationType) => {
            setItems((current) => current.filter((item) => item.id !== conversation.id));
        }
        pusherClient.bind('conversation:new', newHandler)
        pusherClient.bind('conversation:update', updateHandler)
        pusherClient.bind('conversation:delete', deleteHandler);

        return () => {
            pusherClient.unsubscribe(pusherKey)
            pusherClient.unbind('conversation:new', newHandler)
            pusherClient.unbind('conversation:update', updateHandler)
            pusherClient.unbind('conversation:delete', deleteHandler);
        }
    }, [pusherKey])
    return (
        <>
            <GroupModal
                users={users}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />

            <aside className={`${isOpen ? 'hidden' : 'block w-full'} bg-black/90 pb-20 lg:pb-0 lg:w-80 w-full lg:block overflow-y-auto border-r border-gray-600 `}>
                <div className="px-5">
                    <div className="flex items-center justify-between mb-4 pt-4">
                        <div className="text-2xl font-bold text-white">
                            Chat
                        </div>
                        <div
                            onClick={() => setIsModalOpen(true)}
                            className="p-2 text-white transition cursor-pointer hover:text-opacity-75">
                            <MdOutlineGroupAdd size={20} />
                        </div>
                    </div>
                </div>
                {items.length > 0 ? items.map((item) => (
                    <ConversationBox
                        key={item.id}
                        data={item}
                        selected={conversationId === item.id}
                    />
                ))
                    : (
                        <div className="text-gray-400 font-medium ">
                            No conversation
                        </div>
                    )
                }
            </aside>

        </>
    );
}

export default ConversationList;