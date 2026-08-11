import { RotateCcw } from "lucide-react";

import { useAnalytics } from "../../hooks/useAnalytics";
import AnalyticsOverview from "../../components/analytics/AnalyticsOverview";
import AnalyticsCharts from "../../components/analytics/AnalyticsCharts";
import AnalyticsUserCharts from "../../components/analytics/AnalyticsUserCharts";
import AnalyticsChatCharts from "../../components/analytics/AnalyticsChatCharts";
import RecentUploadsTable from "../../components/analytics/RecentUploadsTable";
import RecentQueriesTable from "../../components/analytics/RecentQueriesTable";
import RecentActivityTable from "../../components/analytics/RecentActivityTable";

export default function AnalyticsPage() {
  const {
    analytics,
    loading,
    error,
    refreshAnalytics,
  } = useAnalytics();

  return (
    <main
      className="
        mx-auto
        flex
        h-full
        w-full
        max-w-7xl
        flex-col
        px-10
        py-8
        overflow-y-auto
        overflow-x-auto
        scrollbar-hide
      "
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-white">
            Analytics Dashboard
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            System-wide insights and usage metrics.
          </p>
        </div>

        <button
          onClick={refreshAnalytics}
          className="
            inline-flex
            items-center
            gap-2
            rounded-lg
            border
            border-white/10
            bg-white/5
            px-4
            py-2
            text-sm
            font-medium
            text-slate-200
            transition
            hover:bg-white/10
          "
        >
          <RotateCcw size={16} />
          Refresh
        </button>
      </div>

      <div className="mt-6 border-b border-white/10" />
      {loading && (
  <p className="mt-8 text-slate-400">
    Loading analytics...
  </p>
)}

{error && (
  <p className="mt-8 text-red-400">
    {error}
  </p>
)}

{analytics && (
  <>
    <AnalyticsOverview
      overview={analytics.overview}
    />

    <AnalyticsCharts
      documents={analytics.documents}
    />

    <AnalyticsUserCharts
      users={analytics.users}
    />

    <AnalyticsChatCharts
      chat={analytics.chat}
    />

    <RecentUploadsTable
      uploads={analytics.documents.recent_uploads}
    />

    <RecentQueriesTable
      queries={analytics.chat.recent_queries}
    />
    <RecentActivityTable
  activities={analytics.recent_activity}
/>
  </>
)}

      {/* Temporary Test */}
      <div className="mt-8">
        {loading && (
          <p className="text-slate-400">
            Loading analytics...
          </p>
        )}

        {error && (
          <p className="text-red-400">
            {error}
          </p>
        )}
        

      </div>
    </main>
  );
}

