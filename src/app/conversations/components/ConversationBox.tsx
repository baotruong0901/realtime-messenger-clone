"use client"

import AvatarGroup from "@/components/AvataGroup";
import Avatar from "@/components/Avatar";
import useOtherUser from "@/hooks/useOtherUser";
import { FullConversationType } from "@/types";
import { format } from 'date-fns'
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";

interface ConversationBoxProps {
    selected?: boolean,
    data: FullConversationType
}

const ConversationBox = ({ data, selected }: ConversationBoxProps) => {
    const otherUser = useOtherUser(data)
    const session = useSession()
    const router = useRouter()

    const handleClick = useCallback(() => {
        router.push(`/conversations/${data.id}`)
    }, [data.id, router])

    const lastMessage = useMemo(() => {
        const messages = data.messages || []
        return messages[messages.length - 1]
    }, [data.messages])

    const userEmail = useMemo(() => {
        return session.data?.user?.email
    }, [session.data?.user?.email])

    const hasSeen = useMemo(() => {
        if (!lastMessage) {
            return false
        }
        const seenArray = lastMessage.seen || []

        if (!userEmail) {
            return false
        }

        return seenArray.filter((user) => user.email === userEmail).length !== 0
    }, [userEmail, lastMessage])

    const lastMessageText = useMemo(() => {
        if (lastMessage?.image) return 'Sent an image'

        if (lastMessage?.body) return lastMessage.body

        return "Started a conversation"
    }, [lastMessage])

    return (
        <div
            onClick={handleClick}
            className={`w-full relative flex items-center space-x-3 p-3 hover:bg-gray-300/10 transition cursor-pointer ${selected && 'bg-gray-300/10'}`}
        >
            {data.isGroup ? (
                <AvatarGroup users={data?.users} />
            ) : (
                <Avatar user={otherUser} />

            )}
            <div className="flex-1 min-w-0">
                <div className="focus:outline-none">
                    <div className="flex justify-between items-center mb-1">
                        <p className={`text-md ${hasSeen ? 'text-white font-light' : 'text-white font-semibold'}`}>
                            {data.name || otherUser.name}
                        </p>
                        {lastMessage?.createdAt && (
                            <p className="text-xs text-gray-400 font-light">
                                {format(new Date(lastMessage?.createdAt), 'p')}
                            </p>
                        )}
                    </div>
                    <p className={`truncate text-sm ${hasSeen ? 'text-gray-500 font-light' : 'text-white font-bold'}`}>
                        {lastMessageText}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default ConversationBox;