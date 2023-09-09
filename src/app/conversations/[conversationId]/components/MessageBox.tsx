"use client"

import Avatar from "@/components/Avatar";
import { FullMessageType } from "@/types";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import { IoIosDoneAll } from "react-icons/io"
import ImageModal from "./ImageModal";

interface MessageBoxProps {
    data: FullMessageType,
    isLast?: boolean,
}

const MessageBox = ({ data, isLast }: MessageBoxProps) => {
    const session = useSession()
    const isOwn = session?.data?.user?.email === data?.sender?.email
    const [imageModalOpen, setImageModalOpen] = useState(false)
    const seenList = (data.seen || [])
        .filter((user) => user.email !== data?.sender?.email)
        .map((user) => user.image)


    const container = `flex gap-3 px-4 py-3  ${isOwn && "justify-end py-[2px]"}`

    const avatar = `${isOwn && "order-2"}`

    const body = `flex flex-col gap-1 ${isOwn && "items-end"}`

    const message = `flex flex-col gap-2 text-sm w-fit overflow-hidden shadow-md ${isOwn ? 'bg-white/10 text-white' : 'bg-transparent text-white border border-gray-500'} ${data.image ? 'rounded-md p-0' : 'rounded-xl py-2 px-3'}`

    return (
        <div className={container}>
            {!isOwn &&
                <div className={avatar}>
                    <Avatar user={data.sender} />
                </div>
            }
            <div className={body}>
                {!isOwn &&
                    <div className="flex items-center gap-2">
                        <div className="text-sm text-gray-300">
                            {data.sender.name}
                        </div>
                    </div>
                }
                <div className={message}>
                    <ImageModal
                        isOpen={imageModalOpen}
                        src={data.image}
                        onClose={() => setImageModalOpen(false)}
                    />
                    {data?.image ? (
                        <div className="max-w-[288px] max-h-[288px]">
                            <Image
                                onClick={() => setImageModalOpen(true)}
                                alt="image"
                                width={288}
                                height={288}
                                layout="responsive"
                                src={data.image}
                                className="object-contain cursor-pointer transition translate hover:scale-110"
                            />
                        </div>
                    ) : (
                        <>
                            <div>
                                {data.body}
                            </div>
                            <div className={`text-xs ${isOwn ? " text-white" : "text-gray-400"}`}>
                                {format(new Date(data.createdAt), "p")}
                            </div>
                        </>
                    )}
                </div>
                <div className="flex gap-x-[2px] max-w-xs flex-wrap">
                    {isLast && isOwn && seenList.length > 0 && seenList.map((seen) => (
                        <Image
                            key={seen}
                            src={seen || '/images/placeholder.jpg'}
                            alt="image sender"
                            className="object-contain rounded-full"
                            width={14}
                            height={14}
                        />
                    ))}
                </div>
                {isLast && isOwn && seenList.length === 0 && (
                    <div className="px-1 py-0.5 gap-1 rounded-3xl bg-white/10 flex items-center justify-center">
                        <IoIosDoneAll
                            className="text-white"
                        />
                        <p className="text-xs text-gray-300 font-light">
                            Sent
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default MessageBox;