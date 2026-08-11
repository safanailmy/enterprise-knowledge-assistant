import { useEffect, useState } from "react";

import { getAnalyticsDashboard } from "../api/analytics";

import { AnalyticsDashboardResponse } from "../types/analytics";

export function useAnalytics() {
  const [analytics, setAnalytics] =
    useState<AnalyticsDashboardResponse | null>(
      null
    );

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  async function refreshAnalytics() {
    try {
      setLoading(true);

      const response =
        await getAnalyticsDashboard();

      setAnalytics(response);

      setError(null);
    } catch (err) {
      console.error(err);

      setError(
        "Failed to load analytics dashboard."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refreshAnalytics();
  }, []);

  return {
    analytics,
    loading,
    error,
    refreshAnalytics,
  };
}