import PromptBox from "./PromptBox";
import SuggestionChips from "./SuggestionChips";

import { ChatFilters } from "../../types/chatFilters";

type Props = {
  filters: ChatFilters;
  onFiltersChange: (filters: ChatFilters) => void;
  onOpenFilters: () => void;
};

export default function AIWorkspace({
  filters,
  onFiltersChange,
  onOpenFilters,
}: Props) {
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
          <PromptBox
            filters={filters}
            onFiltersChange={onFiltersChange}
            onOpenFilters={onOpenFilters}
          />
        </div>
      </div>
    </section>
  );
}