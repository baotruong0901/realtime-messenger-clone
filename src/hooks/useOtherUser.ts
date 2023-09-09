import { FullConversationType } from "@/types";
import { User } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useMemo } from "react";

const useOtherUser = (conversation: FullConversationType | { users: User[] }) => {
    const session = useSession()

    const otherUser = useMemo(() => {
        const currentUserEmail = session?.data?.user?.email
        const result = conversation?.users.filter((user) => user.email !== currentUserEmail)
        return result
    }, [session?.data?.user?.email, conversation?.users])

    return otherUser[0]
}
export default useOtherUser