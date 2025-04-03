"use client"

// Define the chart data point structure
export interface ChartDataPoint {
    date: string
    [key: string]: string | number
}

/**
 * Generates payment success chart data based on business selection
 */
export function generatePaymentSuccessData(selectedBusinessId: string): ChartDataPoint[] {
    // Base data for the chart
    const baseData = [
        { date: "Mar 1", success: 98.2, volume: 12500, conversion: 3.2 },
        { date: "Mar 2", success: 98.5, volume: 13200, conversion: 3.3 },
        { date: "Mar 3", success: 97.8, volume: 11800, conversion: 3.1 },
        { date: "Mar 4", success: 98.9, volume: 14500, conversion: 3.4 },
        { date: "Mar 5", success: 99.1, volume: 15200, conversion: 3.5 },
        { date: "Mar 6", success: 98.7, volume: 13800, conversion: 3.3 },
        { date: "Mar 7", success: 99.3, volume: 16000, conversion: 3.6 },
        { date: "Mar 8", success: 99.0, volume: 15500, conversion: 3.5 },
        { date: "Mar 9", success: 98.8, volume: 14200, conversion: 3.4 },
        { date: "Mar 10", success: 99.2, volume: 15800, conversion: 3.6 },
        { date: "Mar 11", success: 99.5, volume: 16500, conversion: 3.7 },
        { date: "Mar 12", success: 99.4, volume: 16200, conversion: 3.7 },
        { date: "Mar 13", success: 99.1, volume: 15600, conversion: 3.6 },
        { date: "Mar 14", success: 99.3, volume: 16100, conversion: 3.7 },
    ]

    // If all businesses are selected or invalid business ID
    if (selectedBusinessId === "all" || !selectedBusinessId) {
        // Aggregate data for all businesses (slightly higher values)
        return baseData.map((item) => ({
            ...item,
            success: Math.min(100, item.success + 0.3),
            volume: Math.round(item.volume * 3.5),
            conversion: item.conversion + 0.5,
        }))
    } else {
        // Get data for specific business
        const businessIndex = Number.parseInt(selectedBusinessId, 10) || 0

        // Modify data based on business index to make it unique
        return baseData.map((item) => {
            let successAdjustment = 0
            let volumeMultiplier = 1
            let conversionAdjustment = 0

            if (businessIndex === 1) {
                successAdjustment = 0 // No change for first business
                volumeMultiplier = 1
                conversionAdjustment = 0
            } else if (businessIndex === 2) {
                successAdjustment = -0.3 // Slightly lower for second business
                volumeMultiplier = 0.8
                conversionAdjustment = -0.2
            } else if (businessIndex === 3) {
                successAdjustment = 0.4 // Higher for third business
                volumeMultiplier = 1.3
                conversionAdjustment = 0.3
            } else if (businessIndex === 4) {
                successAdjustment = 0.1 // Slightly higher for fourth business
                volumeMultiplier = 1.1
                conversionAdjustment = 0.1
            }

            return {
                ...item,
                success: Math.min(100, Math.max(95, item.success + successAdjustment)),
                volume: Math.round(item.volume * volumeMultiplier),
                conversion: Math.max(2.5, item.conversion + conversionAdjustment),
            }
        })
    }
}

/**
 * Generates auto-retries chart data based on business selection
 */
export function generateAutoRetriesData(selectedBusinessId: string): ChartDataPoint[] {
    // Base data for the chart
    const baseData = [
        { date: "Mar 1", retries: 42, recovered: 28 },
        { date: "Mar 2", retries: 38, recovered: 25 },
        { date: "Mar 3", retries: 45, recovered: 31 },
        { date: "Mar 4", retries: 40, recovered: 29 },
        { date: "Mar 5", retries: 35, recovered: 24 },
        { date: "Mar 6", retries: 48, recovered: 35 },
        { date: "Mar 7", retries: 52, recovered: 39 },
        { date: "Mar 8", retries: 46, recovered: 32 },
        { date: "Mar 9", retries: 41, recovered: 30 },
        { date: "Mar 10", retries: 39, recovered: 28 },
        { date: "Mar 11", retries: 44, recovered: 33 },
        { date: "Mar 12", retries: 47, recovered: 36 },
        { date: "Mar 13", retries: 43, recovered: 31 },
        { date: "Mar 14", retries: 50, recovered: 38 },
    ]

    // If all businesses are selected or invalid business ID
    if (selectedBusinessId === "all" || !selectedBusinessId) {
        // Aggregate data for all businesses (higher values)
        return baseData.map((item) => ({
            ...item,
            retries: item.retries * 3,
            recovered: item.recovered * 3,
        }))
    } else {
        // Get data for specific business
        const businessIndex = Number.parseInt(selectedBusinessId, 10) || 0

        // Modify data based on business index to make it unique
        return baseData.map((item) => {
            let retriesMultiplier = 1
            let recoveryRate = 0.7 // Default recovery rate

            if (businessIndex === 1) {
                retriesMultiplier = 1
                recoveryRate = 0.7
            } else if (businessIndex === 2) {
                retriesMultiplier = 0.8
                recoveryRate = 0.65
            } else if (businessIndex === 3) {
                retriesMultiplier = 1.2
                recoveryRate = 0.75
            } else if (businessIndex === 4) {
                retriesMultiplier = 1.1
                recoveryRate = 0.72
            }

            const retries = Math.round(item.retries * retriesMultiplier)
            return {
                ...item,
                retries: retries,
                recovered: Math.round(retries * recoveryRate),
            }
        })
    }
}

/**
 * Calculate recovery rate from data
 */
export function calculateRecoveryRate(data: ChartDataPoint[]): number {
    const totalRetries = data.reduce((acc, item) => acc + (Number(item.retries) || 0), 0)
    const totalRecovered = data.reduce((acc, item) => acc + (Number(item.recovered) || 0), 0)

    return totalRetries > 0 ? Math.round((totalRecovered / totalRetries) * 100) : 0
}