import { DocumentAnalytics } from "../../types/analytics";

import DepartmentChart from "./DepartmentChart";
import StatusChart from "./StatusChart";

type Props = {
  documents: DocumentAnalytics;
};

export default function AnalyticsCharts({
  documents,
}: Props) {
  return (
    <section className="mt-10">
      <h2 className="mb-5 text-lg font-semibold text-white">
        Document Analytics
      </h2>

      <div
        className="
          grid
          gap-6
          lg:grid-cols-2
        "
      >
        <DepartmentChart
          data={documents.by_department}
        />

        <StatusChart
          data={documents.by_status}
        />
      </div>
    </section>
  );
}