import { ChatMessage } from "../../types/chat";

type Props = {
  message: ChatMessage;
};

export default function MessageBubble({
  message,
}: Props) {
  const assistant = message.role === "assistant";

  return (
    <div
      className={`mb-7 flex ${
        assistant ? "justify-start" : "justify-end"
      }`}
    >
      <div
        className={
          assistant
            ? "max-w-[760px]"
            : "max-w-[420px] rounded-xl bg-[#4F7DF3] px-5 py-3"
        }
      >
        {assistant && (
          <p
            className="
              mb-2
              text-[11px]
              uppercase
              tracking-[0.22em]
              text-white/30
            "
          >
            Assistant
          </p>
        )}

        <p
          className="
            whitespace-pre-wrap
            break-words
            text-[15px]
            leading-8
            text-white
          "
        >
          {message.content}
        </p>

        {assistant &&
          message.sources &&
          message.sources.length > 0 && (
            <div className="mt-5 flex flex-col gap-2">
              {message.sources.map((source) => (
                <div
                  key={`${source.document_id}-${source.chunk_index}`}
                  className="
                    rounded-xl
                    border
                    border-white/10
                    bg-white/5
                    px-4
                    py-3
                    transition
                    hover:bg-white/10
                  "
                >
                  <div className="text-sm font-medium text-white">
                     {source.filename}
                  </div>

                  <div className="mt-1 flex flex-wrap gap-4 text-xs text-white/60">
                    <span>Version {source.version}</span>

                    {source.page_number !== undefined && (
                      <span>Page {source.page_number}</span>
                    )}

                    <span>
                      Chunk {source.chunk_index}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
      </div>
    </div>
  );
}