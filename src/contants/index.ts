import { signOut } from "next-auth/react";
import { HiChat } from 'react-icons/hi';
import { HiArrowLeftOnRectangle, HiUsers } from 'react-icons/hi2';

export const sidebarLinks = [
    {
        label: 'Chat',
        href: '/conversations',
        icon: HiChat,
    },
    {
        label: 'Users',
        href: '/users',
        icon: HiUsers,
    },
    {
        label: 'Logout',
        onClick: () => signOut(),
        href: '#',
        icon: HiArrowLeftOnRectangle
    }
];