import {
  Users,
  UserCheck,
  FileText,
  Files,
  MessageSquare,
  MessagesSquare,
  Search,
} from "lucide-react";

import { OverviewAnalytics } from "../../types/analytics";

import OverviewCard from "./OverviewCard";

type Props = {
  overview: OverviewAnalytics;
};

export default function AnalyticsOverview({
  overview,
}: Props) {
  return (
    <section className="mt-8">
      <h2 className="mb-5 text-lg font-semibold text-white">
        Overview
      </h2>

      <div
        className="
          grid
          gap-5
          sm:grid-cols-2
          lg:grid-cols-4
        "
      >
        <OverviewCard
          title="Total Users"
          value={overview.total_users}
          icon={<Users size={22} />}
        />

        <OverviewCard
          title="Active Users"
          value={overview.active_users}
          icon={<UserCheck size={22} />}
        />

        <OverviewCard
          title="Documents"
          value={overview.total_documents}
          icon={<FileText size={22} />}
        />

        <OverviewCard
          title="Versions"
          value={overview.total_document_versions}
          icon={<Files size={22} />}
        />

        <OverviewCard
          title="Conversations"
          value={overview.total_conversations}
          icon={<MessageSquare size={22} />}
        />

        <OverviewCard
          title="Messages"
          value={overview.total_messages}
          icon={<MessagesSquare size={22} />}
        />

        <OverviewCard
          title="Chat Queries"
          value={overview.total_chat_queries}
          icon={<Search size={22} />}
        />
      </div>
    </section>
  );
}