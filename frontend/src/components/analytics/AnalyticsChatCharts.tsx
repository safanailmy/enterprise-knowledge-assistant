import { ChatAnalytics } from "../../types/analytics";

import QueriesDepartmentChart from "./QueriesDepartmentChart";
import MostUsedDocumentsTable from "./MostUsedDocumentsTable";

type Props = {
  chat: ChatAnalytics;
};

export default function AnalyticsChatCharts({
  chat,
}: Props) {
  return (
    <section className="mt-12">
      <h2 className="mb-5 text-lg font-semibold text-white">
        Chat Analytics
      </h2>

      <div
        className="
          grid
          gap-6
          lg:grid-cols-2
        "
      >
        <QueriesDepartmentChart
          data={chat.queries_by_department}
        />

        <MostUsedDocumentsTable
          documents={chat.most_used_documents}
        />
      </div>
    </section>
  );
}