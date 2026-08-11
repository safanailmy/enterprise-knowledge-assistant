import { PopularDocumentItem } from "../../types/analytics";

type Props = {
  documents: PopularDocumentItem[];
};

export default function MostUsedDocumentsTable({
  documents,
}: Props) {
  return (
    <div
      className="
        rounded-2xl
        border
        border-white/10
        bg-white/5
        p-6
      "
    >
      <h3 className="mb-6 text-lg font-semibold text-white">
        Most Used Documents
      </h3>

      <div className="overflow-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="pb-3 text-left text-sm font-medium text-white/60">
                Document
              </th>

              <th className="pb-3 text-right text-sm font-medium text-white/60">
                Uses
              </th>
            </tr>
          </thead>

          <tbody>
            {documents.length === 0 ? (
              <tr>
                <td
                  colSpan={2}
                  className="py-16 text-center text-white/40"
                >
                  No document usage available.
                </td>
              </tr>
            ) : (
              documents.map((doc) => (
                <tr
                  key={doc.document_id ?? doc.filename}
                  className="border-b border-white/5"
                >
                  <td className="py-4 text-sm text-white">
                    {doc.filename}
                  </td>

                  <td className="py-4 text-right text-sm font-semibold text-cyan-300">
                    {doc.usage_count}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}