import StatusFilter from "./StatusFilter";

import {
  FileText,
  MoreHorizontal,
} from "lucide-react";

const docs = [
  {
    id: "HR-2026-001",
    name: "Employee Handbook.pdf",
    status: "Indexed",
    size: "2.4 MB",
    updated: "Today",
  },
  {
    id: "POL-2026-002",
    name: "Leave Policy.pdf",
    status: "Indexed",
    size: "1.8 MB",
    updated: "Yesterday",
  },
  {
    id: "ISO-2026-003",
    name: "ISO27001.pdf",
    status: "Processing",
    size: "4.6 MB",
    updated: "Today",
  },
  {
    id: "HR-2026-004",
    name: "HR Guide.pdf",
    status: "Failed",
    size: "5.1 MB",
    updated: "Today",
  },
  {
    id: "SEC-2026-005",
    name: "Security Manual.pdf",
    status: "Indexed",
    size: "7.8 MB",
    updated: "2 days ago",
  },
  {
    id: "IT-2026-006",
    name: "IT Policy.pdf",
    status: "Indexed",
    size: "3.1 MB",
    updated: "3 days ago",
  },
  {
    id: "FIN-2026-007",
    name: "Finance SOP.pdf",
    status: "Indexed",
    size: "6.5 MB",
    updated: "Last Week",
  },
  {
    id: "OPS-2026-008",
    name: "Operations Manual.pdf",
    status: "Processing",
    size: "5.8 MB",
    updated: "Today",
  },
  {
    id: "QA-2026-009",
    name: "Quality Checklist.pdf",
    status: "Indexed",
    size: "1.9 MB",
    updated: "Yesterday",
  },
];

export default function DocumentsTable() {
  return (
    <div
      className="
        mt-3
        flex
        h-full
        flex-col
        overflow-hidden
        rounded-2xl
        border
        border-white/8
        bg-[#17395C]
      "
    >
      {/* Filter */}
      <div className="border-b border-white/6 px-5 py-4">
        <StatusFilter />
      </div>

      {/* Scrollable Table */}
      <div className="flex-1 overflow-y-auto">
        <table className="w-full border-collapse">

          {/* Header */}

          <thead className="sticky top-0 z-10 bg-[#173654]">

            <tr className="border-b border-white/8 text-left text-[11px] uppercase tracking-wider text-white/35">

              <th className="px-6 py-4">Document ID</th>

              <th className="py-4">Document</th>

              <th>Status</th>

              <th>Size</th>

              <th>Updated</th>

              <th className="w-12"></th>

            </tr>

          </thead>

          <tbody>

            {docs.map((doc) => (

              <tr
                key={doc.id}
                className="
                  border-b
                  border-white/6
                  transition-all
                  hover:bg-white/[0.03]
                "
              >

                {/* Document ID */}

                <td className="px-6 py-3 text-sm text-white/55">
                  {doc.id}
                </td>

                {/* Document */}

                <td className="py-3">

                  <div className="flex items-center gap-3">

                    <FileText
                      size={18}
                      className="text-[#8EB9FF]"
                    />

                    <span className="text-sm text-white">
                      {doc.name}
                    </span>

                  </div>

                </td>

                {/* Status */}

                <td>

                  <span
                    className={`
                      rounded-full
                      px-2.5
                      py-1
                      text-[11px]
                      font-medium

                      ${
                        doc.status === "Indexed"
                          ? "bg-emerald-500/10 text-emerald-400"
                          : doc.status === "Processing"
                          ? "bg-sky-500/10 text-sky-400"
                          : "bg-red-500/10 text-red-400"
                      }
                    `}
                  >
                    ● {doc.status}
                  </span>

                </td>

                {/* Size */}

                <td className="text-sm text-white/60">
                  {doc.size}
                </td>

                {/* Updated */}

                <td className="text-sm text-white/60">
                  {doc.updated}
                </td>

                {/* Menu */}

                <td>

                  <button
                    className="
                      text-white/35
                      transition
                      hover:text-white
                    "
                  >
                    <MoreHorizontal size={18} />
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}