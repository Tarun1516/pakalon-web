'use client'

import { useMemo } from 'react'
import dynamic from 'next/dynamic'
import type { SessionRecord } from '@/types'

const TokenUsageChart = dynamic(() => import('@/components/TokenUsageChart'), { ssr: false })

const sessions: SessionRecord[] = [
    {
        id: 'sess_8a99f',
        prompt: 'Refactor the auth middleware to support OAuth2',
        lines: 142,
        tokens: 850,
        date: 'Oct 24, 2:30 PM',
    },
    {
        id: 'sess_b21c4',
        prompt: 'Generate unit tests for the billing controller',
        lines: 89,
        tokens: 420,
        date: 'Oct 24, 11:15 AM',
    },
    {
        id: 'sess_9d00a',
        prompt: 'Debug the race condition in the websocket handler',
        lines: 12,
        tokens: 1205,
        date: 'Oct 23, 4:45 PM',
    },
    {
        id: 'sess_e44b2',
        prompt: 'Create documentation for the public API endpoints',
        lines: 350,
        tokens: 2100,
        date: 'Oct 23, 9:20 AM',
    },
]

export default function DashboardPage() {
    const heatmapData = useMemo(() => {
        const weeks = 53
        const days = 7
        return Array.from({ length: weeks }, () =>
            Array.from({ length: days }, () => Math.floor(Math.random() * 5))
        )
    }, [])

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
                        Track your AI command activity and token consumption.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <select className="bg-[#25261e] border border-border-dark text-white text-sm rounded-lg px-3 py-2 outline-none">
                        <option>Last 30 Days</option>
                        <option>Last 7 Days</option>
                    </select>
                    <button className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-[#1d1e14] text-sm font-bold py-2 px-4 rounded-lg transition-colors">
                        <span className="material-symbols-outlined text-lg">download</span>
                        Export Data
                    </button>
                </div>
            </header>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: 'Total Tokens', value: '1.2M', trend: '+12%', color: '#0bda27' },
                    { label: 'Active Sessions', value: '45', trend: '+5%', color: '#0bda27' },
                    { label: 'Lines Written', value: '14,203', trend: '+8%', color: '#0bda27' },
                    { label: 'Avg. Latency', value: '240ms', trend: '-2%', color: '#ef4444' },
                ].map((stat, i) => (
                    <div key={i} className="bg-surface-dark border border-border-dark rounded-xl p-5">
                        <div className="flex justify-between items-start mb-2">
                            <p className="text-[#b1b4a2] text-sm font-medium">{stat.label}</p>
                            <span
                                className="text-xs px-2 py-0.5 rounded flex items-center gap-1"
                                style={{ backgroundColor: `${stat.color}20`, color: stat.color }}
                            >
                                <span className="material-symbols-outlined text-xs">trending_up</span> {stat.trend}
                            </span>
                        </div>
                        <p className="text-white text-2xl font-bold tracking-tight">{stat.value}</p>
                    </div>
                ))}
            </div>

            <div className="bg-surface-dark border border-border-dark rounded-xl p-6">
                <h3 className="text-white text-lg font-bold mb-6">Activity Heatmap</h3>

                <div className="overflow-x-auto pb-4">
                    <div className="min-w-[800px]">
                        <div className="flex text-[10px] text-[#b1b4a2] mb-2 ml-10">
                            {monthLabels.map((month, i) => (
                                <div key={i} className="flex-1" style={{ flexBasis: `${100 / monthLabels.length}%` }}>
                                    {month}
                                </div>
                            ))}
                        </div>

                        <div className="flex gap-2">
                            <div className="flex flex-col justify-between py-1 text-[10px] text-[#b1b4a2] h-[92px] w-8 shrink-0">
                                <span>Mon</span>
                                <span>Wed</span>
                                <span>Fri</span>
                            </div>

                            <div className="flex-1 flex gap-1">
                                {heatmapData.map((week, weekIdx) => (
                                    <div key={weekIdx} className="flex flex-col gap-1 flex-1">
                                        {week.map((level, dayIdx) => (
                                            <div
                                                key={dayIdx}
                                                className={`w-full aspect-square rounded-[2px] ${getContributionColor(level)} transition-colors hover:ring-1 hover:ring-white/20`}
                                                title={`Activity level: ${level}`}
                                            />
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 mt-4">
                    <a href="#" className="text-[11px] text-[#b1b4a2] hover:text-white transition-colors">
                        Learn how we count contributions
                    </a>
                    <div className="flex items-center gap-2 text-[11px] text-[#b1b4a2]">
                        <span>Less</span>
                        <div className="flex gap-1">
                            {[0, 1, 2, 3, 4].map((level) => (
                                <div key={level} className={`size-3 rounded-[2px] ${getContributionColor(level)}`} />
                            ))}
                        </div>
                        <span>More</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-surface-dark border border-border-dark rounded-xl p-6">
                    <h3 className="text-white text-lg font-bold mb-2">Token Usage History</h3>
                    <p className="text-[#b1b4a2] text-sm mb-6">Daily token consumption over time</p>
                    <TokenUsageChart />
                </div>

                <div className="bg-surface-dark border border-border-dark rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-border-dark">
                        <h3 className="text-white text-lg font-bold">Session History</h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-[#2f3126] text-[#b1b4a2] text-xs font-semibold uppercase">
                                <tr>
                                    <th className="px-6 py-4">Session ID</th>
                                    <th className="px-6 py-4">User Prompt</th>
                                    <th className="px-6 py-4">Lines</th>
                                    <th className="px-6 py-4">Tokens</th>
                                    <th className="px-6 py-4">Date</th>
                                    <th className="px-6 py-4 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border-dark text-sm">
                                {sessions.map((sess) => (
                                    <tr key={sess.id} className="hover:bg-[#2f3126] transition-colors group">
                                        <td className="px-6 py-4 font-mono text-primary">{sess.id}</td>
                                        <td className="px-6 py-4 text-white truncate max-w-[300px]">{sess.prompt}</td>
                                        <td className="px-6 py-4 text-[#b1b4a2]">{sess.lines}</td>
                                        <td className="px-6 py-4">
                                            <span className="px-2.5 py-0.5 rounded-full bg-[#34362b] text-white border border-[#4d4f40] text-xs">
                                                {sess.tokens}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-[#b1b4a2]">{sess.date}</td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="text-[#b1b4a2] hover:text-primary transition-colors">
                                                <span className="material-symbols-outlined text-lg">arrow_forward</span>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="bg-[#25261e] border-t border-border-dark px-6 py-3 flex items-center justify-between">
                        <p className="text-xs text-[#b1b4a2]">
                            Showing <span className="text-white font-medium">1-5</span> of{' '}
                            <span className="text-white font-medium">45</span> sessions
                        </p>
                        <div className="flex gap-2">
                            <button className="p-1 rounded hover:bg-[#34362b] text-[#b1b4a2]">
                                <span className="material-symbols-outlined text-lg">chevron_left</span>
                            </button>
                            <button className="p-1 rounded hover:bg-[#34362b] text-white">
                                <span className="material-symbols-outlined text-lg">chevron_right</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
