import { useEffect, useRef } from "react";

import MessageBubble from "./MessageBubble";

import { ChatMessage } from "../../types/chat";



type Props = {
  messages: ChatMessage[];
  loading: boolean;
};

export default function ChatMessages({
  messages,
  loading,
}: Props) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  return (
    <div className="flex-1 overflow-y-auto scrollbar-hide">
      {messages.length === 0 && (
        <div className="flex justify-center pt-28">
          <div>

            <p className="mt-2 text-gray-500">
              Ask anything about your organization's
              documents.
            </p>
          </div>
        </div>
      )}

      {messages.map((message) => (
        <MessageBubble
          key={message.id}
          message={message}
        />
      ))}

      {loading && (
        <MessageBubble
          message={{
            id: "thinking",
            role: "assistant",
            content: "Thinking...",
          }}
        />
      )}

      <div ref={bottomRef} />
    </div>
  );
}