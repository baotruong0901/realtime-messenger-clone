"use client"

import { User } from "@prisma/client";
import UserBox from "./UserBox";

interface UserListProps {
    items: User[]
}

const UserList = ({ items }: UserListProps) => {
    return (
        <aside className="bg-black/90 pb-20 lg:pb-0 lg:left-20 md:w-80 lg:block overflow-y-auto border-r border-gray-700 block w-full left-0">
            <div className="px-5">
                <div className="flex-col">
                    <div className="text-2xl font-bold text-white py-4">
                        People
                    </div>
                </div>
                {items.map((item) => (
                    <UserBox
                        key={item.id}
                        data={item}
                    />
                ))}
            </div>
        </aside>
    );
}

export default UserList;