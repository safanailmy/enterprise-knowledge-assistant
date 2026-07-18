type Props = {
  role: "assistant" | "user";
  message: string;
  sources?: string[];
};

export default function MessageBubble({
  role,
  message,
  sources = [],
}: Props) {

  const assistant = role === "assistant";

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
            text-[15px]
            leading-8
            text-white
          "
        >
          {message}
        </p>

        {assistant && sources.length > 0 && (

          <div className="mt-5 flex flex-wrap gap-2">

            {sources.map((source) => (

              <span
                key={source}
                className="
                  rounded-full
                  border
                  border-white/8
                  px-2.5
                  py-1
                  text-[11px]
                  text-white/55
                "
              >
                📄 {source}
              </span>

            ))}

          </div>

        )}

      </div>

    </div>

  );
}