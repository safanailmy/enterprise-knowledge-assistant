import StatusFilter from "./StatusFilter";
import DocumentRow from "./DocumentRow";
import Pagination from "./Pagination";

import { Document } from "../../types/document";

type DocumentsTableProps = {
  documents: Document[];
  loading: boolean;
  error: string;

  totalDocuments: number;
  readyCount: number;
  processingCount: number;
  failedCount: number;
  deletedCount: number;
  isRecycleBin: boolean;

  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;

  selectedFilter:
    | "ALL"
    | "READY"
    | "PROCESSING"
    | "FAILED"
    | "RECYCLE_BIN";

  onFilterChange: (
    filter:
      | "ALL"
      | "READY"
      | "PROCESSING"
      | "FAILED"
      | "RECYCLE_BIN"
  ) => void;

  onView: (document: Document) => void;
  onDownload: (document: Document) => void;
  onUploadVersion: (document: Document) => void;
  onDelete: (document: Document) => void;
  onRestore: (document: Document) => void;
  onPermanentDelete: (document: Document) => void;
  onViewVersions: (document: Document) => void;
};

export default function DocumentsTable({
  documents,
  loading,
  error,
  totalDocuments,
  readyCount,
  processingCount,
  failedCount,
  deletedCount,
  isRecycleBin,

  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,

  selectedFilter,
  onFilterChange,
  onView,
  onDownload,
  onUploadVersion,
  onDelete,
  onRestore,
  onPermanentDelete,
  onViewVersions,
}: DocumentsTableProps) {
  if (loading) {
    return (
      <div className="flex h-full items-center justify-center rounded-2xl border border-white/8 bg-[#17395C]">
        <p className="text-white/60">Loading documents...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-full items-center justify-center rounded-2xl border border-red-500/20 bg-[#17395C]">
        <p className="text-red-300">{error}</p>
      </div>
    );
  }

  return (
    <div
      className="
        mt-3
        flex
        h-full
        min-h-0
        flex-1
        flex-col
        overflow-hidden
        rounded-2xl
        border
        border-white/8
        bg-[#17395C]
      "
    >
      {/* Status Filter */}
      <div className="flex-shrink-0 border-b border-white/6 px-5 py-4">
        <StatusFilter
          totalDocuments={totalDocuments}
          readyCount={readyCount}
          processingCount={processingCount}
          failedCount={failedCount}
          deletedCount={deletedCount}
          selectedFilter={selectedFilter}
          onFilterChange={onFilterChange}
        />
      </div>

      {/* Scrollable Table */}
      <div
        className="
          flex-1
          min-h-0
          overflow-y-auto
          overflow-x-auto
          scrollbar-hide
        "
      >
        <table className="w-full border-collapse">
          <thead className="sticky top-0 z-10 bg-[#173654]">
            <tr className="border-b border-white/8 text-left text-[11px] uppercase tracking-wider text-white/35">
              <th className="px-6 py-4">Document</th>
              <th>Uploaded By</th>
              <th>Version</th>
              <th>Status</th>
              <th>Uploaded</th>
              <th className="w-14"></th>
            </tr>
          </thead>

          <tbody>
            {documents.length > 0 ? (
              documents.map((doc) => (
                <DocumentRow
                    key={doc.document_id}
                    document={doc}
                    isRecycleBin={isRecycleBin}
                    onView={onView}
                    onDownload={onDownload}
                    onUploadVersion={onUploadVersion}
                    onViewVersions={onViewVersions}
                    onDelete={onDelete}
                    onRestore={onRestore}
                    onPermanentDelete={onPermanentDelete}
                  />
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="py-10 text-center text-white/40"
                >
                  No documents found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex-shrink-0 border-t border-white/6">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          pageSize={pageSize}
          onPageChange={onPageChange}
      />
      </div>
    </div>
  );
}