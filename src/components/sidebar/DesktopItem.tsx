import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
    label: string,
    href: string,
    icon: any,
    onClick?: () => void
}

const DesktopItem = ({ href, onClick, icon: Icon, label }: Props) => {
    const pathname = usePathname()

    const handleClick = () => {
        if (onClick) {
            return onClick()
        }
    }
    const active = (pathname?.includes(href) && href.length > 1) || pathname === href;

    return (
        <li onClick={handleClick}>
            <Link href={href}
                className={`group flex gap-x-3 rounded-md px-3 py-1 text-sm leading-6 font-semibold text-white hover:text-white hover:bg-white/10 ${active && 'bg-white/10 text-white'}`}
            >
                <Icon className="h-6 w-6 shrink-0" />
                <span className="sr-only">{label}</span>
            </Link>
        </li>
    );
}

export default DesktopItem;