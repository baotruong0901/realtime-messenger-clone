import EmptyState from "@/components/EmptyState";
import getConversationsById from "@/libs/actions/getConversationById";
import getMessages from "@/libs/actions/getMessages";
import Header from "./components/Header";
import Body from "./components/Body";
import Form from "./components/Form";

interface ConversationIdProps {
    conversationId: string
}

const ConversationId = async ({ params }: { params: ConversationIdProps }) => {
    const conversation = await getConversationsById(params.conversationId)
    const messages = await getMessages(params.conversationId)

    if (!conversation) {
        return (
            <div className="flex-col flex-1 min-h-screen">
                <EmptyState />
            </div>
        )
    }
    return (
        <div className="flex-1">
            <div className="flex h-full bg-black/90 flex-col">
                <Header conversation={conversation!} />
                <Body
                    initialMessages={messages}
                />
                <Form />
            </div>
        </div>
    );
}

export default ConversationId;