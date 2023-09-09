import Link from "next/link";

interface MobileItemProps {
    href: string;
    icon: any;
    active?: boolean;
    onClick?: () => void;
}

const MobileItem: React.FC<MobileItemProps> = ({
    href,
    icon: Icon,
    active,
    onClick
}) => {
    const handleClick = () => {
        if (onClick) {
            return onClick();
        }
    };

    return (
        <Link
            onClick={handleClick}
            href={href}
            className={`group flex gap-x-3 text-sm leading-6 font-semibold w-full justify-center p-4 text-gray-900 hover:text-black hover:bg-gray-400 ${active && 'bg-gray-400 text-black'}`}>
            <Icon className="h-6 w-6" />
        </Link>
    );
}

export default MobileItem;