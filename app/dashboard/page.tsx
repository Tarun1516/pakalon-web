'use client'

import { useMemo } from 'react'
import dynamic from 'next/dynamic'
import { api, useUsage, useSessions, useHeatmap } from '@/lib/api'

const TokenUsageChart = dynamic(() => import('@/components/TokenUsageChart'), { ssr: false })

export default function DashboardPage() {
    // Fetch real data from API
    const { usage, loading: usageLoading } = useUsage()
    const { sessions: realSessions, loading: sessionsLoading } = useSessions(20)
    const { data: heatmapData, loading: heatmapLoading } = useHeatmap()

    const isLoading = usageLoading || sessionsLoading || heatmapLoading

    // Transform API sessions to display format
    const sessions = useMemo(() => {
        return realSessions.map(s => ({
            id: s.id,
            prompt: s.title || 'Untitled session',
            lines: s.lines_written,
            tokens: s.tokens_used,
            date: new Date(s.created_at).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true }),
        }))
    }, [realSessions])

    // Transform heatmap data from API
    const realHeatmapData = useMemo(() => {
        if (!heatmapData || heatmapData.length === 0) {
            // Fallback to random if no data
            return Array.from({ length: 53 }, () =>
                Array.from({ length: 7 }, () => Math.floor(Math.random() * 5))
            )
        }
        // Convert API data to grid format
        const weeks: number[][] = []
        let currentWeek: number[] = []
        for (const day of heatmapData) {
            currentWeek.push(day.level)
            if (currentWeek.length === 7) {
                weeks.push(currentWeek)
                currentWeek = []
            }
        }
        if (currentWeek.length > 0) {
            weeks.push(currentWeek)
        }
        return weeks
    }, [heatmapData])

    // Get stats from API
    const totalTokens = usage?.total_tokens ?? 0
    const totalLines = usage?.lines_written ?? 0
    const totalSessions = usage?.sessions_count ?? 0

    const monthLabels = [
        'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
    ]

    const getContributionColor = (level: number) => {
        switch (level) {
            case 0: return 'bg-[#1d1e18]'
            case 1: return 'bg-primary/20'
            case 2: return 'bg-primary/40'
            case 3: return 'bg-primary/70'
            case 4: return 'bg-primary'
            default: return 'bg-[#1d1e18]'
        }
    }

    return (
        <div className="p-8 space-y-8">
            <header className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-col gap-1">
                    <h2 className="text-3xl font-bold tracking-tight">Usage Overview</h2>
                    <p className="text-[#b1b4a2] text-sm">
                        {isLoading ? 'Loading...' : 'Track your AI command activity and token consumption.'}
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <select className="bg-[#25261e] border border-border-dark text-white text-sm rounded-lg px-3 py-2 outline-none">
                        <option>Last 30 Days</option>
                        <option>Last 7 Days</option>
                    </select>
                    <button className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-[#1d1e14] text-sm font-bold py-2 px-4 rounded-lg transition-colors">
                        <span className="material-symbols-outlined text-lg">download</span>
                        Export
                    </button>
                </div>
            </header>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-[#1a1b16] border border-border-dark rounded-xl p-5">
                    <div className="flex items-center gap-3 mb-3">
                        <span className="material-symbols-outlined text-primary">token</span>
                        <span className="text-[#b1b4a2] text-sm font-medium">Total Tokens</span>
                    </div>
                    <p className="text-3xl font-bold">{totalTokens.toLocaleString()}</p>
                </div>
                <div className="bg-[#1a1b16] border border-border-dark rounded-xl p-5">
                    <div className="flex items-center gap-3 mb-3">
                        <span className="material-symbols-outlined text-primary">code</span>
                        <span className="text-[#b1b4a2] text-sm font-medium">Lines Written</span>
                    </div>
                    <p className="text-3xl font-bold">{totalLines.toLocaleString()}</p>
                </div>
                <div className="bg-[#1a1b16] border border-border-dark rounded-xl p-5">
                    <div className="flex items-center gap-3 mb-3">
                        <span className="material-symbols-outlined text-primary">chat</span>
                        <span className="text-[#b1b4a2] text-sm font-medium">Sessions</span>
                    </div>
                    <p className="text-3xl font-bold">{totalSessions}</p>
                </div>
                <div className="bg-[#1a1b16] border border-border-dark rounded-xl p-5">
                    <div className="flex items-center gap-3 mb-3">
                        <span className="material-symbols-outlined text-primary">model_training</span>
                        <span className="text-[#b1b4a2] text-sm font-medium">Models Used</span>
                    </div>
                    <p className="text-3xl font-bold">{usage?.tokens_by_model ? Object.keys(usage.tokens_by_model).length : 0}</p>
                </div>
            </div>

            {/* Contribution Heatmap */}
            <div className="bg-[#1a1b16] border border-border-dark rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Contribution Activity</h3>
                    <span className="text-[#b1b4a2] text-sm">Last 12 months</span>
                </div>
                <div className="flex gap-1 overflow-x-auto pb-2">
                    {realHeatmapData.map((week, weekIdx) => (
                        <div key={weekIdx} className="flex flex-col gap-1 flex-1 min-w-[12px]">
                            {week.map((level, dayIdx) => (
                                <div
                                    key={dayIdx}
                                    className={`w-3 h-3 rounded-sm ${getContributionColor(level)}`}
                                    title={`${heatmapData?.[weekIdx * 7 + dayIdx]?.date || ''}: Level ${level}`}
                                />
                            ))}
                        </div>
                    ))}
                </div>
                <div className="flex items-center gap-2 mt-4 text-xs text-[#b1b4a2]">
                    <span>Less</span>
                    {[0, 1, 2, 3, 4].map(level => (
                        <div key={level} className={`w-3 h-3 rounded-sm ${getContributionColor(level)}`} />
                    ))}
                    <span>More</span>
                </div>
            </div>

            {/* Charts and Sessions */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Token Usage Chart */}
                <div className="lg:col-span-2 bg-[#1a1b16] border border-border-dark rounded-xl p-6">
                    <h3 className="text-lg font-semibold mb-4">Token Usage</h3>
                    <div className="h-64">
                        <TokenUsageChart />
                    </div>
                </div>

                {/* Recent Sessions */}
                <div className="bg-[#1a1b16] border border-border-dark rounded-xl p-6">
                    <h3 className="text-lg font-semibold mb-4">Recent Sessions</h3>
                    <div className="space-y-3 max-h-64 overflow-y-auto">
                        {sessions.length === 0 ? (
                            <p className="text-[#b1b4a2] text-sm">No sessions yet</p>
                        ) : (
                            sessions.map(session => (
                                <div key={session.id} className="flex items-center justify-between p-3 bg-[#25261e] rounded-lg">
                                    <div className="flex-1 min-w-0">
                                        <p className="text-white text-sm font-medium truncate">{session.prompt}</p>
                                        <p className="text-[#b1b4a2] text-xs">{session.date}</p>
                                    </div>
                                    <div className="flex items-center gap-3 text-xs text-[#b1b4a2] ml-3">
                                        <span>{session.lines} lines</span>
                                        <span>{session.tokens} tokens</span>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
