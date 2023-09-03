import { IconType } from "react-icons";

interface AuthSocialButtonProps {
    icon: IconType
    onClick: () => void;
}

const AuthSocialbutton = ({ icon: Icon, onClick }: AuthSocialButtonProps) => {
    return (
        <button
            type="button"
            onClick={onClick}
            className="w-full inline-flex justify-center px-4 py-2 rounded-md bg-white hover:bg-gray-50 border border-gray-300 "
        >
            <Icon />
        </button>
    );
}

export default AuthSocialbutton;