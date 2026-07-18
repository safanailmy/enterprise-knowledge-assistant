import ChatHeader from "../../components/chat/ChatHeader";
import ChatMessages from "../../components/chat/ChatMessages";
import ChatInput from "../../components/chat/ChatInput";

export default function ChatPage() {
  return (
    <main
      className="
        relative
        mx-auto
        flex
        h-full
        w-full
        max-w-5xl
        flex-col
        px-8
      "
    >
      {/* Background Glow */}
      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-56
          h-[500px]
          w-[700px]
          -translate-x-1/2
          rounded-full
          bg-[#4F7DF3]/10
          blur-[160px]
        "
      />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col">

        <ChatHeader />

        <div className="flex-1 overflow-y-auto">
          <div className="mx-auto w-full max-w-3xl">
            <ChatMessages />
          </div>
        </div>

        <div className="mx-auto w-full max-w-4xl">
          <ChatInput />
        </div>

      </div>

    </main>
  );
}