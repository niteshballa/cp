"use client"

import { useMemo, useEffect } from "react"
import { DashboardChart } from "./dashboard-chart"
import { generateAutoRetriesData, calculateRecoveryRate } from "@/lib/dashboard-utils"

interface AutoRetriesChartProps {
    timeframe: string
    selectedBusinessId: string
}

export function AutoRetriesChart({ timeframe, selectedBusinessId }: AutoRetriesChartProps) {
    // Generate chart data with some logging to debug
    const chartData = useMemo(() => {
        const data = generateAutoRetriesData(selectedBusinessId || "all");
        console.log("Auto-Retries Chart Data:", data);
        return data;
    }, [selectedBusinessId]);

    // Calculate recovery rate
    const recoveryRate = useMemo(() => {
        const rate = calculateRecoveryRate(chartData);
        console.log("Recovery Rate:", rate);
        return rate;
    }, [chartData]);

    // Log when business ID changes
    useEffect(() => {
        console.log("AutoRetriesChart - Business ID changed:", selectedBusinessId);
    }, [selectedBusinessId]);

    return (
        <DashboardChart
            title="Auto-Retries Performance"
            description="Failed transactions automatically retried and recovered"
            timeframe={timeframe}
            selectedBusinessId={selectedBusinessId || "all"}
            chartType="multi"  // Make sure this is "multi"
            metrics={["retries", "recovered"]}  // These should match exactly the keys in your data
            data={chartData}
            displayValue={`${recoveryRate}%`}
            displayLabel="Recovery rate"
        />
    );
}