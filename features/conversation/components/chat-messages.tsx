"use client";

import { isTextUIPart, type UIMessage, type ChatStatus } from "ai";

import {
  Conversation,
  ConversationContent,
} from "@/components/ai-elements/conversation";

import {
  Message,
  MessageContent,
  MessageResponse,
} from "@/components/ai-elements/message";

import { Loader } from "@/components/ai-elements/loader";
import { Button } from "@/components/ui/button";
import { Copy, GitBranch } from "lucide-react";
import { toast } from "sonner";
import { createNewBranch } from "../actions/conversation-actions";
import router, { useRouter } from "next/navigation";

type ChatMessagesProps = {
  conversationId: string;
  messages: UIMessage[];
  status: ChatStatus;
};

export function ChatMessages({
  conversationId,
  messages,
  status,
}: ChatMessagesProps) {
  const isWaiting =
    status === "submitted" &&
    messages.at(-1)?.role === "user";

  const isStreaming =
    status === "streaming";

    const router = useRouter();

  return (
    <Conversation>
      <ConversationContent className="mx-auto max-w-4xl py-8 px-6">
        {messages.map((message) => (
          <Message
            key={message.id}
            from={message.role}
          >
            <MessageContent>
              {message.parts
                .filter(isTextUIPart)
                .map((part) => (
                  <MessageResponse key={part.text}>
                    {part.text}
                  </MessageResponse>
                ))}
            </MessageContent>
            {message.role === "assistant" && (
    <div className="mt-3 flex items-center gap-2">
<Button
  variant="ghost"
  size="sm"
  onClick={async () => {
    await navigator.clipboard.writeText(
      message.parts
        .filter(isTextUIPart)
        .map((p) => p.text)
        .join("")
    );

    toast.success("Copied to clipboard!");
  }}
>
  <Copy className="mr-2 h-4 w-4" />
  Copy
</Button>

<Button
  variant="ghost"
  size="sm"
  onClick={async () => {
    try {
      const branch = await createNewBranch(
        conversationId,
        message.id
      );

      toast.success("Branch created!");

      router.push(`/c/${branch.id}`);
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Failed to create branch");
    }
  }}
>
  <GitBranch className="mr-2 h-4 w-4" />
  Branch
</Button>
    </div>
  )}
          </Message>
        ))}

        {isWaiting && (
          <Message from="assistant">
            <MessageContent>
              <Loader text="Thinking..." />
            </MessageContent>
          </Message>
        )}

        {isStreaming && (
          <Message from="assistant">
            <MessageContent>
              <Loader text="Searching the web..." />
            </MessageContent>
          </Message>
        )}
      </ConversationContent>
    </Conversation>
  );
}