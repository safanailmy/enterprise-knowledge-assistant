import { RecentQueryItem } from "../../types/analytics";

type Props = {
  queries: RecentQueryItem[];
};

export default function RecentQueriesTable({
  queries,
}: Props) {
  return (
    <section className="mt-12">
      <h2 className="mb-5 text-lg font-semibold text-white">
        Recent Queries
      </h2>

      <div
        className="
          overflow-hidden
          rounded-2xl
          border
          border-white/10
          bg-white/5
        "
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="sticky top-0 bg-[#173A5D]">
              <tr className="border-b border-white/10">
                <th className="px-6 py-4 text-left text-sm font-medium text-white/60">
                  User
                </th>

                <th className="px-6 py-4 text-left text-sm font-medium text-white/60">
                  Question
                </th>

                <th className="px-6 py-4 text-left text-sm font-medium text-white/60">
                  Department
                </th>

                <th className="px-6 py-4 text-center text-sm font-medium text-white/60">
                  Chunks
                </th>

                <th className="px-6 py-4 text-right text-sm font-medium text-white/60">
                  Time
                </th>
              </tr>
            </thead>

            <tbody>
              {queries.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="py-24 text-center text-white/40"
                  >
                    No recent queries.
                  </td>
                </tr>
              ) : (
                queries.map((query, index) => (
                  <tr
                    key={`${query.user_email}-${index}`}
                    className="
                      border-b
                      border-white/5
                      transition
                      hover:bg-white/5
                    "
                  >
                    <td className="px-6 py-4 text-white">
                      {query.user_email}
                    </td>

                    <td className="max-w-md px-6 py-4 text-white/80">
                      <div className="truncate">
                        {query.question}
                      </div>
                    </td>

                    <td className="px-6 py-4 text-white/80">
                      {query.department ?? "-"}
                    </td>

                    <td className="px-6 py-4 text-center text-cyan-300">
                      {query.retrieved_chunk_count}
                    </td>

                    <td className="px-6 py-4 text-right text-white/70">
                      {new Intl.DateTimeFormat("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      }).format(
                        new Date(query.created_at)
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}