import { useState } from "react";

import Greeting from "../../components/home/Greeting";
import QuickActions from "../../components/home/QuickActions";
import AIWorkspace from "../../components/home/AIWorkspace";

import AdvancedSearchPopover from "../../components/chat/AdvancedSearchPopover";
import { ChatFilters } from "../../types/chatFilters";

export default function HomePage() {
  const [filters, setFilters] = useState<ChatFilters>({});
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="flex justify-center">
      <AdvancedSearchPopover
        open={showFilters}
        filters={filters}
        onChange={setFilters}
        onClose={() => setShowFilters(false)}
      />

      <main className="px-10 py-10">
        <Greeting />

        <AIWorkspace
          filters={filters}
          onFiltersChange={setFilters}
          onOpenFilters={() => setShowFilters(true)}
        />

        <QuickActions />
      </main>
    </div>
  );
}