import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import PublicLayout from "../layouts/PublicLayout";
import AuthenticatedLayout from "../layouts/AuthenticatedLayout";

import LoginPage from "../pages/login/LoginPage";
import DashboardPage from "../pages/dashboard/DashboardPage";
import DocumentsPage from "../pages/documents/DocumentsPage";
import ChatPage from "../pages/chat/ChatPage";
import UsersPage from "../pages/users/UsersPage";
import AuditLogsPage from "../pages/audit-logs/AuditLogsPage";
import AnalyticsPage from "../pages/analytics/AnalyticsPage";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route element={<PublicLayout/>}>
            <Route path="/login" element={<LoginPage />} />
        </Route>

        <Route element={<AuthenticatedLayout />}>

            <Route path="/dashboard" element={<DashboardPage />} />

            <Route path="/documents" element={<DocumentsPage />} />

            <Route path="/chat" element={<ChatPage />} />

            <Route path="/users" element={<UsersPage />} />

            <Route path="/audit-logs" element={<AuditLogsPage />} />

            <Route path="/analytics" element={<AnalyticsPage />} />

        </Route>

        </Routes>
    </BrowserRouter>
  );
}