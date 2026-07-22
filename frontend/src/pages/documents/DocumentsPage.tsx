import { useState } from "react";

import DocumentsHeader from "../../components/documents/DocumentsHeader";
import DocumentsToolbar from "../../components/documents/DocumentsToolbar";
import DocumentFilters from "../../components/documents/DocumentFilters";
import DocumentsTable from "../../components/documents/DocumentsTable";
import DocumentDetailsModal from "../../components/documents/DocumentDetailsModal";
import UploadDocumentModal from "../../components/documents/UploadDocumentModal";
import UploadVersionModal from "../../components/documents/UploadVersionModal";
import DeleteDocumentModal from "../../components/documents/DeleteDocumentModal";
import PermanentDeleteModal from "../../components/documents/PermanentDeleteModal";

import { useDocuments } from "../../hooks/useDocuments";
import { useDeletedDocuments } from "../../hooks/useDeletedDocuments";

import VersionHistoryModal from "../../components/documents/VersionHistoryModal";
import { Document, DocumentVersion } from "../../types/document";
import RollbackVersionModal from "../../components/documents/RollbackVersionModal";

import {
  downloadDocument,
  restoreDocument,
} from "../../api/documents";

import { saveBlob } from "../../utils/download";

export default function DocumentsPage() {
  const {
  documents,
  loading,
  error,

  searchQuery,
  setSearchQuery,

  sortBy,
  setSortBy,

  sortOrder,
  setSortOrder,

  pageSize,
  setPageSize,

  totalDocuments,
  readyCount,
  processingCount,
  failedCount,

  refreshDocuments,
} = useDocuments();

  const {
    deletedDocuments,
    deletedCount,
    refreshDeletedDocuments,
  } = useDeletedDocuments();

  const [selectedDocument, setSelectedDocument] =
    useState<Document | null>(null);

  const [uploadOpen, setUploadOpen] = useState(false);

  const [uploadVersionOpen, setUploadVersionOpen] =
    useState(false);

  const [versionDocument, setVersionDocument] =
    useState<Document | null>(null);

  const [deleteOpen, setDeleteOpen] =
    useState(false);

  const [deleteDocumentItem, setDeleteDocumentItem] =
    useState<Document | null>(null);

  const [permanentDeleteOpen, setPermanentDeleteOpen] =
    useState(false);

  const [permanentDeleteDocument, setPermanentDeleteDocument] =
    useState<Document | null>(null);

  const [selectedFilter, setSelectedFilter] = useState<
    | "ALL"
    | "READY"
    | "PROCESSING"
    | "FAILED"
    | "RECYCLE_BIN"
  >("ALL");

  const [versionHistoryOpen, setVersionHistoryOpen] =
  useState(false);

  const [selectedGroupId, setSelectedGroupId] =
  useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState(1);

  const PAGE_SIZE = pageSize;

  const [rollbackOpen, setRollbackOpen] =
    useState(false);

  const [rollbackVersion, setRollbackVersion] =
    useState<DocumentVersion | null>(null);

  const filteredDocuments =
    selectedFilter === "RECYCLE_BIN"
      ? deletedDocuments
      : documents.filter((document) => {
          switch (selectedFilter) {
            case "READY":
              return document.status.toUpperCase() === "READY";

            case "PROCESSING":
              return (
                document.status.toUpperCase() ===
                "PROCESSING"
              );

            case "FAILED":
              return document.status.toUpperCase() === "FAILED";

            case "ALL":
            default:
              return true;
          }
        });
  const totalPages = Math.ceil(
    filteredDocuments.length / PAGE_SIZE
  );

  const paginatedDocuments = filteredDocuments.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );


  return (
    <main
      className="
        mx-auto
        flex
        h-full
        w-full
        max-w-7xl
        flex-col
        overflow-hidden
        px-10
        pt-0
      "
    >
      {/* Header */}
      <DocumentsHeader totalDocuments={totalDocuments} />

      {/* Toolbar */}
      <DocumentsToolbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onUploadClick={() => setUploadOpen(true)}
      />

      {/* Filters */}
      <DocumentFilters
        sortBy={sortBy}
        onSortByChange={setSortBy}
        sortOrder={sortOrder}
        onSortOrderChange={setSortOrder}
        pageSize={pageSize}
        onPageSizeChange={setPageSize}
      />

      {/* Table */}
      <div className="mt-6 flex-1 min-h-0 overflow-hidden">
        <DocumentsTable
          documents={paginatedDocuments}
          loading={loading}
          error={error}
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filteredDocuments.length}
          pageSize={PAGE_SIZE}
          onPageChange={setCurrentPage}
          totalDocuments={totalDocuments}
          readyCount={readyCount}
          processingCount={processingCount}
          failedCount={failedCount}
          deletedCount={deletedCount}
          selectedFilter={selectedFilter}
          onFilterChange={(filter) => {
            setSelectedFilter(filter);
            setCurrentPage(1);
          }}
          isRecycleBin={selectedFilter === "RECYCLE_BIN"}
          onView={setSelectedDocument}
          onDownload={async (document) => {
            console.log("Step 1: Clicked Download");
            console.log(document);

            try {
              console.log("Step 2: Calling API...");

              const result = await downloadDocument(
                document.document_id
              );

              saveBlob(result.blob, result.filename);

              console.log("Step 4: Download complete");
            } catch (error) {
              console.error("Download failed:", error);
            }
          }}
          onUploadVersion={(document) => {
            setVersionDocument(document);
            setUploadVersionOpen(true);
          }}
          onViewVersions={(document) => {
            setSelectedGroupId(document.document_group_id);
            setVersionHistoryOpen(true);
          }}
          onDelete={(document) => {
            setDeleteDocumentItem(document);
            setDeleteOpen(true);
          }}
          onRestore={async (document) => {
            try {
              await restoreDocument(document.document_id);

              await refreshDocuments();
              await refreshDeletedDocuments();
            } catch (error) {
              console.error("Restore failed:", error);
            }
          }}
          onPermanentDelete={(document) => {
            setPermanentDeleteDocument(document);
            setPermanentDeleteOpen(true);
          }}
        />
      </div>

      {/* View Document */}
      <DocumentDetailsModal
        open={selectedDocument !== null}
        document={selectedDocument}
        onClose={() => setSelectedDocument(null)}
      />

      {/* Upload Document */}
      <UploadDocumentModal
        open={uploadOpen}
        onClose={() => setUploadOpen(false)}
        onUploaded={refreshDocuments}
      />

      {/* Upload Version */}
      <UploadVersionModal
        open={uploadVersionOpen}
        document={versionDocument}
        onClose={() => {
          setUploadVersionOpen(false);
          setVersionDocument(null);
        }}
        onUploaded={refreshDocuments}
      />

      {/* Soft Delete */}
      <DeleteDocumentModal
        open={deleteOpen}
        document={deleteDocumentItem}
        onClose={() => {
          setDeleteOpen(false);
          setDeleteDocumentItem(null);
        }}
        onDeleted={async () => {
          await refreshDocuments();
          await refreshDeletedDocuments();
        }}
      />

      {/* Permanent Delete */}
      <PermanentDeleteModal
        open={permanentDeleteOpen}
        document={permanentDeleteDocument}
        onClose={() => {
          setPermanentDeleteOpen(false);
          setPermanentDeleteDocument(null);
        }}
        onDeleted={async () => {
          await refreshDocuments();
          await refreshDeletedDocuments();
        }}
      />
      {/*version history */}

            {/* Version History */}
      <VersionHistoryModal
        open={versionHistoryOpen}
        documentGroupId={selectedGroupId}
        onClose={() => {
          setVersionHistoryOpen(false);
          setSelectedGroupId(null);
        }}
        onRollback={(version) => {
          setRollbackVersion(version);
          setRollbackOpen(true);
        }}
      />

            {/* Rollback Version */}
      <RollbackVersionModal
        open={rollbackOpen}
        version={rollbackVersion}
        onClose={() => {
          setRollbackOpen(false);
          setRollbackVersion(null);
        }}
        onRolledBack={async () => {
          await refreshDocuments();

          setRollbackOpen(false);
          setRollbackVersion(null);

          setVersionHistoryOpen(false);
          setSelectedGroupId(null);
        }}
      />

    </main>
  );
}