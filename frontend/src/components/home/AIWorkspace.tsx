import PromptBox from "./PromptBox";
import SuggestionChips from "./SuggestionChips";

export default function AIWorkspace() {
  return (
    <section className="mt-8">
      <div
        className="
          mx-auto
          w-full
          max-w-[1180px]
          rounded-[32px]
        "
      >
        <SuggestionChips />

        <div className="mt-5">
          <PromptBox />
        </div>
      </div>
    </section>
  );
}