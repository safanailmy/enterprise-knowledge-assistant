import api from "./axios";

import { AnalyticsDashboardResponse } from "../types/analytics";

export async function getAnalyticsDashboard() {
  const { data } =
    await api.get<AnalyticsDashboardResponse>(
      "/analytics/dashboard"
    );

  return data;
}