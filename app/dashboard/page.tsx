'use client'

import { useMemo, useState } from 'react'
import dynamic from 'next/dynamic'
import { useDashboardStats, useHeatmap, useUsage, type ContributionDay } from '@/lib/api'

const TokenUsageChart = dynamic(() => import('@/components/TokenUsageChart'), { ssr: false })

type RangePreset = 'today' | 'yesterday' | 'last7' | 'last30' | 'lastYear' | 'specific'

type HeatmapWeek = {
    key: string
    days: Array<ContributionDay | null>
}

type ActiveDateRange = {
    start: Date
    end: Date
    label: string
    daysForBackend: number
    startParam: string
    endParam: string
}

const DAY_MS = 24 * 60 * 60 * 1000

const RANGE_OPTIONS: Array<{ value: RangePreset; label: string }> = [
    { value: 'today', label: 'Today' },
    { value: 'yesterday', label: 'Yesterday' },
    { value: 'last7', label: 'Last 7 Days' },
    { value: 'last30', label: 'Last 30 Days' },
    { value: 'lastYear', label: 'Last Year' },
    { value: 'specific', label: 'Specific Date' },
]

function startOfDay(value: Date) {
    const date = new Date(value)
    date.setHours(0, 0, 0, 0)
    return date
}

function endOfDay(value: Date) {
    const date = new Date(value)
    date.setHours(23, 59, 59, 999)
    return date
}

function toDateInputValue(value: Date) {
    return value.toISOString().slice(0, 10)
}

function parseDay(value: string) {
    return new Date(`${value}T00:00:00`)
}

function buildActiveDateRange(
    preset: RangePreset,
    specificDate: string,
    accountCreatedAt: Date | null,
): ActiveDateRange {
    const now = new Date()
    const today = startOfDay(now)
    let start = startOfDay(now)
    let end = endOfDay(now)

    switch (preset) {
        case 'today':
            break
        case 'yesterday': {
            const yesterday = new Date(today)
            yesterday.setDate(yesterday.getDate() - 1)
            start = startOfDay(yesterday)
            end = endOfDay(yesterday)
            break
        }
        case 'last7':
            start = startOfDay(new Date(today.getTime() - 6 * DAY_MS))
            break
        case 'last30':
            start = startOfDay(new Date(today.getTime() - 29 * DAY_MS))
            break
        case 'lastYear':
            start = startOfDay(new Date(today.getTime() - 364 * DAY_MS))
            break
        case 'specific': {
            const chosen = specificDate ? parseDay(specificDate) : now
            start = startOfDay(chosen)
            end = endOfDay(chosen)
            break
        }
    }

    if (accountCreatedAt) {
        const accountStart = startOfDay(accountCreatedAt)
        if (start < accountStart) {
            start = accountStart
            if (preset === 'specific') {
                end = endOfDay(accountStart)
            }
        }
    }

    if (end < start) {
        end = endOfDay(start)
    }

    const daysForBackend = Math.max(7, Math.ceil((end.getTime() - start.getTime()) / DAY_MS) + 1)
    const formatLabel = (value: Date) => value.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    })
    const label = preset === 'specific'
        ? formatLabel(start)
        : `${formatLabel(start)} – ${formatLabel(end)}`

    return {
        start,
        end,
        label,
        daysForBackend,
        startParam: toDateInputValue(start),
        endParam: toDateInputValue(end),
    }
}

function isWithinRange(value: Date, range: ActiveDateRange) {
    return value >= range.start && value <= range.end
}

function buildEmptyContributionYear(year: number): ContributionDay[] {
    const days: ContributionDay[] = []
    const current = new Date(year, 0, 1)
    const end = new Date(year, 11, 31)

    while (current <= end) {
        const isoDate = current.toISOString().slice(0, 10)
        days.push({
            date: isoDate,
            lines_added: 0,
            lines_deleted: 0,
            commits: 0,
            tokens_used: 0,
            sessions_count: 0,
            level: 0,
        })
        current.setDate(current.getDate() + 1)
    }

    return days
}

function buildHeatmapWeeks(contributions: ContributionDay[]): HeatmapWeek[] {
    const year = contributions[0]
        ? new Date(`${contributions[0].date}T00:00:00`).getFullYear()
        : new Date().getFullYear()
    const source = (contributions.length > 0 ? contributions : buildEmptyContributionYear(year))
        .toSorted((left, right) => left.date.localeCompare(right.date))

    const weeks: HeatmapWeek[] = []
    let currentWeekKey = ''
    let currentWeek: Array<ContributionDay | null> = Array.from({ length: 7 }, () => null)

    for (const contribution of source) {
        const day = new Date(`${contribution.date}T00:00:00`)
        const weekStart = new Date(day)
        weekStart.setDate(day.getDate() - day.getDay())

        const weekKey = weekStart.toISOString().slice(0, 10)
        if (weekKey !== currentWeekKey) {
            if (currentWeekKey) {
                weeks.push({ key: currentWeekKey, days: currentWeek })
            }
            currentWeekKey = weekKey
            currentWeek = Array.from({ length: 7 }, () => null)
        }

        currentWeek[day.getDay()] = contribution
    }

    if (currentWeekKey) {
        weeks.push({ key: currentWeekKey, days: currentWeek })
    }

    return weeks
}

function formatCompactTokens(value: number) {
    if (value >= 1_000_000) {
        return `${(value / 1_000_000).toFixed(value % 1_000_000 === 0 ? 0 : 1)}M`
    }

    if (value >= 1_000) {
        return `${Math.round(value / 1_000)}k`
    }

    return value.toString()
}

function getContributionTitle(contribution: ContributionDay | null) {
    if (!contribution) return ''

    const formattedDate = new Date(`${contribution.date}T00:00:00`).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    })

    return [
        formattedDate,
        `${contribution.tokens_used.toLocaleString()} tokens`,
        `+${contribution.lines_added.toLocaleString()} / -${contribution.lines_deleted.toLocaleString()} lines`,
        `${contribution.sessions_count.toLocaleString()} sessions`,
        `${contribution.commits.toLocaleString()} commits`,
    ].join(' • ')
}

export default function DashboardPage() {
    const [selectedRange, setSelectedRange] = useState<RangePreset>('last30')
    const [specificDate, setSpecificDate] = useState<string>(toDateInputValue(new Date()))
    const [isExporting, setIsExporting] = useState(false)
    const [exportError, setExportError] = useState<string | null>(null)

    const provisionalRange = useMemo(
        () => buildActiveDateRange(selectedRange, specificDate, null),
        [selectedRange, specificDate],
    )

    const { stats, loading: statsLoading, error: statsError } = useDashboardStats(
        provisionalRange.daysForBackend,
        provisionalRange.startParam,
        provisionalRange.endParam,
    )

    const accountCreatedAt = useMemo(
        () => (stats?.user.created_at ? new Date(stats.user.created_at) : null),
        [stats?.user.created_at],
    )

    const activeRange = useMemo(
        () => buildActiveDateRange(selectedRange, specificDate, accountCreatedAt),
        [selectedRange, specificDate, accountCreatedAt],
    )

    const { usage, loading: usageLoading, error: usageError } = useUsage()
    const selectedHeatmapYear = useMemo(() => activeRange.end.getFullYear(), [activeRange.end])
    const { data: heatmapData, loading: heatmapLoading } = useHeatmap(selectedHeatmapYear)

    const isLoading = usageLoading || statsLoading || heatmapLoading

    const filteredDailyTokens = useMemo(
        () => (usage?.daily_tokens ?? []).filter(entry => isWithinRange(parseDay(entry.date), activeRange)),
        [usage?.daily_tokens, activeRange],
    )

    const chartData = useMemo(() => {
        const labelOptions = activeRange.daysForBackend <= 7
            ? { weekday: 'short' as const }
            : { month: 'short' as const, day: 'numeric' as const }

        return filteredDailyTokens.map(entry => ({
            name: new Date(entry.date).toLocaleDateString('en-US', labelOptions),
            tokens: entry.tokens,
        }))
    }, [filteredDailyTokens, activeRange.daysForBackend])

    const sessions = useMemo(() => {
        return (stats?.sessions ?? []).map(session => ({
            id: session.id,
            prompt: session.title || 'Untitled session',
            lines: Math.max(0, session.lines_added - session.lines_deleted),
            model: session.model_id,
            date: session.created_at
                ? new Date(session.created_at).toLocaleString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: true,
                })
                : '—',
        }))
    }, [stats?.sessions])

    const filteredHeatmapData = useMemo(() => {
        return heatmapData.map(day => {
            const dayDate = parseDay(day.date)
            if (isWithinRange(dayDate, activeRange)) {
                return day
            }

            return {
                ...day,
                lines_added: 0,
                lines_deleted: 0,
                commits: 0,
                tokens_used: 0,
                sessions_count: 0,
                level: 0,
            }
        })
    }, [heatmapData, activeRange])

    const heatmapWeeks = useMemo(() => buildHeatmapWeeks(filteredHeatmapData), [filteredHeatmapData])

    const heatmapSummary = useMemo(() => {
        return filteredHeatmapData.reduce(
            (summary, day) => ({
                activeDays: summary.activeDays + (day.level > 0 ? 1 : 0),
                linesAdded: summary.linesAdded + day.lines_added,
                linesDeleted: summary.linesDeleted + day.lines_deleted,
                tokensUsed: summary.tokensUsed + day.tokens_used,
            }),
            { activeDays: 0, linesAdded: 0, linesDeleted: 0, tokensUsed: 0 },
        )
    }, [filteredHeatmapData])

    const loginEvents = stats?.login_events ?? []

    const totalTokens = statsLoading ? null : (stats?.totals.tokens ?? 0)
    const totalLines = statsLoading ? null : (stats?.totals.lines ?? 0)
    const totalSessions = statsLoading ? null : (stats?.totals.sessions ?? 0)
    const totalModels = statsLoading ? null : (stats?.model_usage.length ?? 0)
    const fmt = (value: number | null) => value === null ? '—' : value.toLocaleString()

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

    const handleExport = async () => {
        if (!stats) return

        setIsExporting(true)
        setExportError(null)

        try {
            const [{ jsPDF }, { default: autoTable }] = await Promise.all([
                import('jspdf'),
                import('jspdf-autotable'),
            ])

            const doc = new jsPDF({ unit: 'pt', format: 'a4' })
            doc.setFont('helvetica', 'bold')
            doc.setFontSize(18)
            doc.text('Pakalon Overview Export', 40, 44)

            doc.setFont('helvetica', 'normal')
            doc.setFontSize(10)
            doc.text(`Range: ${activeRange.label}`, 40, 64)
            doc.text(`Generated: ${new Date().toLocaleString('en-US')}`, 40, 80)

            autoTable(doc, {
                startY: 98,
                theme: 'grid',
                styles: { fontSize: 10 },
                head: [['Metric', 'Value']],
                body: [
                    ['Total Tokens', fmt(totalTokens)],
                    ['Lines Written', fmt(totalLines)],
                    ['Sessions', fmt(totalSessions)],
                    ['Models Used', fmt(totalModels)],
                    ['Active Contribution Days', heatmapSummary.activeDays.toLocaleString()],
                ],
            })

            autoTable(doc, {
                startY: ((doc as unknown as { lastAutoTable?: { finalY?: number } }).lastAutoTable?.finalY ?? 120) + 18,
                theme: 'striped',
                styles: { fontSize: 9 },
                head: [['Date', 'Tokens']],
                body: filteredDailyTokens.length > 0
                    ? filteredDailyTokens.map(entry => [entry.date, entry.tokens.toLocaleString()])
                    : [['—', '0']],
            })

            autoTable(doc, {
                startY: ((doc as unknown as { lastAutoTable?: { finalY?: number } }).lastAutoTable?.finalY ?? 200) + 18,
                theme: 'striped',
                styles: { fontSize: 9 },
                head: [['Recent Session', 'Model', 'Net Lines', 'Timestamp']],
                body: sessions.length > 0
                    ? sessions.slice(0, 10).map(session => [
                        session.prompt,
                        session.model ?? '—',
                        session.lines.toLocaleString(),
                        session.date,
                    ])
                    : [['No sessions in range', '—', '0', '—']],
            })

            autoTable(doc, {
                startY: ((doc as unknown as { lastAutoTable?: { finalY?: number } }).lastAutoTable?.finalY ?? 280) + 18,
                theme: 'striped',
                styles: { fontSize: 9 },
                head: [['Login Type', 'Browser / Device', 'Machine ID', 'IP', 'Timestamp']],
                body: loginEvents.length > 0
                    ? loginEvents.map(event => [
                        event.login_type,
                        event.browser ?? event.device_name ?? '—',
                        event.machine_id ?? '—',
                        event.ip_address ?? '—',
                        new Date(event.created_at).toLocaleString('en-US'),
                    ])
                    : [['No login events in range', '—', '—', '—', '—']],
            })

            doc.save(`pakalon-overview-${activeRange.startParam}-to-${activeRange.endParam}.pdf`)
        } catch (error) {
            setExportError(error instanceof Error ? error.message : 'Could not export overview as PDF.')
        } finally {
            setIsExporting(false)
        }
    }

    return (
        <div className="p-8 space-y-8">
            {(usageError || statsError) && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-red-400 text-sm flex items-center gap-2">
                    <span className="material-symbols-outlined text-lg">warning</span>
                    Unable to load overview data — please refresh the page.
                </div>
            )}

            {exportError && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-red-400 text-sm flex items-center gap-2">
                    <span className="material-symbols-outlined text-lg">picture_as_pdf</span>
                    {exportError}
                </div>
            )}

            <header className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-col gap-1">
                    <h2 className="text-3xl font-bold tracking-tight">Usage Overview</h2>
                    <p className="text-[#b1b4a2] text-sm">
                        {isLoading ? 'Loading...' : `Track your AI command activity and token consumption for ${activeRange.label}.`}
                    </p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                    <select
                        value={selectedRange}
                        onChange={(event) => setSelectedRange(event.target.value as RangePreset)}
                        className="bg-[#25261e] border border-border-dark text-white text-sm rounded-lg px-3 py-2 outline-none"
                    >
                        {RANGE_OPTIONS.map(option => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                    {selectedRange === 'specific' && (
                        <input
                            type="date"
                            value={specificDate}
                            onChange={(event) => setSpecificDate(event.target.value)}
                            min={accountCreatedAt ? toDateInputValue(accountCreatedAt) : undefined}
                            max={toDateInputValue(new Date())}
                            className="bg-[#25261e] border border-border-dark text-white text-sm rounded-lg px-3 py-2 outline-none"
                        />
                    )}
                    <div className="text-xs text-[#b1b4a2]">Range: {activeRange.label}</div>
                    <button
                        onClick={handleExport}
                        disabled={isExporting || isLoading}
                        className="flex items-center gap-2 bg-primary hover:bg-primary-hover disabled:opacity-60 disabled:cursor-not-allowed text-[#1d1e14] text-sm font-bold py-2 px-4 rounded-lg transition-colors"
                    >
                        <span className="material-symbols-outlined text-lg">download</span>
                        {isExporting ? 'Exporting PDF…' : 'Export PDF'}
                    </button>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-[#1a1b16] border border-border-dark rounded-xl p-5">
                    <div className="flex items-center gap-3 mb-3">
                        <span className="material-symbols-outlined text-primary">token</span>
                        <span className="text-[#b1b4a2] text-sm font-medium">Total Tokens</span>
                    </div>
                    <p className="text-3xl font-bold">{fmt(totalTokens)}</p>
                </div>
                <div className="bg-[#1a1b16] border border-border-dark rounded-xl p-5">
                    <div className="flex items-center gap-3 mb-3">
                        <span className="material-symbols-outlined text-primary">code</span>
                        <span className="text-[#b1b4a2] text-sm font-medium">Lines Written</span>
                    </div>
                    <p className="text-3xl font-bold">{fmt(totalLines)}</p>
                </div>
                <div className="bg-[#1a1b16] border border-border-dark rounded-xl p-5">
                    <div className="flex items-center gap-3 mb-3">
                        <span className="material-symbols-outlined text-primary">chat</span>
                        <span className="text-[#b1b4a2] text-sm font-medium">Sessions</span>
                    </div>
                    <p className="text-3xl font-bold">{fmt(totalSessions)}</p>
                </div>
                <div className="bg-[#1a1b16] border border-border-dark rounded-xl p-5">
                    <div className="flex items-center gap-3 mb-3">
                        <span className="material-symbols-outlined text-primary">model_training</span>
                        <span className="text-[#b1b4a2] text-sm font-medium">Models Used</span>
                    </div>
                    <p className="text-3xl font-bold">{fmt(totalModels)}</p>
                </div>
            </div>

            <div className="bg-[#1a1b16] border border-border-dark rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Contribution Activity</h3>
                    <span className="text-[#b1b4a2] text-sm">Live backend data · {selectedHeatmapYear}</span>
                </div>
                <div className="flex gap-1 overflow-x-auto pb-2">
                    {heatmapWeeks.map((week) => (
                        <div key={week.key} className="flex flex-col gap-1 flex-1 min-w-[12px]">
                            {week.days.map((day, dayIdx) => (
                                <div
                                    key={`${week.key}-${dayIdx}`}
                                    className={`w-3 h-3 rounded-sm ${day ? getContributionColor(day.level) : 'bg-transparent'}`}
                                    title={getContributionTitle(day)}
                                />
                            ))}
                        </div>
                    ))}
                </div>
                <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-[#b1b4a2]">
                    <div className="flex items-center gap-2">
                        <span>Less</span>
                        {[0, 1, 2, 3, 4].map(level => (
                            <div key={level} className={`w-3 h-3 rounded-sm ${getContributionColor(level)}`} />
                        ))}
                        <span>More</span>
                    </div>
                    <span>
                        {heatmapSummary.activeDays.toLocaleString()} active days · +{heatmapSummary.linesAdded.toLocaleString()} / -{heatmapSummary.linesDeleted.toLocaleString()} lines · {formatCompactTokens(heatmapSummary.tokensUsed)} tokens
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-[#1a1b16] border border-border-dark rounded-xl p-6">
                    <h3 className="text-lg font-semibold mb-1">Token Usage</h3>
                    <p className="text-xs text-[#b1b4a2] mb-4">{activeRange.label}</p>
                    <div className="h-64">
                        <TokenUsageChart data={chartData} />
                    </div>
                </div>

                <div className="bg-[#1a1b16] border border-border-dark rounded-xl p-6">
                    <h3 className="text-lg font-semibold mb-4">Recent Sessions</h3>
                    <div className="space-y-3 max-h-64 overflow-y-auto">
                        {sessions.length === 0 ? (
                            <p className="text-[#b1b4a2] text-sm">No sessions in this range</p>
                        ) : (
                            sessions.map(session => (
                                <div key={session.id} className="flex items-center justify-between p-3 bg-[#25261e] rounded-lg">
                                    <div className="flex-1 min-w-0">
                                        <p className="text-white text-sm font-medium truncate">{session.prompt}</p>
                                        <p className="text-[#b1b4a2] text-xs">{session.date}</p>
                                    </div>
                                    <div className="flex items-center gap-3 text-xs text-[#b1b4a2] ml-3">
                                        <span>{session.lines} net lines</span>
                                        <span>{session.model ?? '—'}</span>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>

            <div className="bg-[#1a1b16] border border-border-dark rounded-xl p-6">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary">devices</span>
                        <h3 className="text-lg font-semibold">Login History</h3>
                    </div>
                    <span className="text-[#b1b4a2] text-sm">Recent sign-ins within {activeRange.label}</span>
                </div>
                {statsLoading ? (
                    <p className="text-[#b1b4a2] text-sm">Loading…</p>
                ) : loginEvents.length === 0 ? (
                    <p className="text-[#b1b4a2] text-sm">No login events recorded in this range.</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-border-dark">
                                    <th className="text-left text-[#b1b4a2] font-medium pb-3 pr-4">Browser</th>
                                    <th className="text-left text-[#b1b4a2] font-medium pb-3 pr-4">Machine ID</th>
                                    <th className="text-left text-[#b1b4a2] font-medium pb-3 pr-4">IP Address</th>
                                    <th className="text-left text-[#b1b4a2] font-medium pb-3 pr-4">OS</th>
                                    <th className="text-left text-[#b1b4a2] font-medium pb-3">Timestamp</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border-dark">
                                {loginEvents.map((event) => (
                                    <tr key={event.id} className="hover:bg-[#25261e]/50 transition-colors">
                                        <td className="py-3 pr-4 text-white">
                                            <div className="flex items-center gap-2">
                                                <span className="material-symbols-outlined text-primary text-base">
                                                    {event.login_type === 'device_code' ? 'terminal' : 'language'}
                                                </span>
                                                <span>{event.browser ?? event.device_name ?? '—'}</span>
                                            </div>
                                        </td>
                                        <td className="py-3 pr-4 text-[#b1b4a2] font-mono text-xs" title={event.machine_id ?? undefined}>
                                            {event.machine_id ? `${event.machine_id.slice(0, 24)}${event.machine_id.length > 24 ? '…' : ''}` : '—'}
                                        </td>
                                        <td className="py-3 pr-4 text-[#b1b4a2] font-mono text-xs">{event.ip_address ?? '—'}</td>
                                        <td className="py-3 pr-4 text-[#b1b4a2]">{event.os ?? '—'}</td>
                                        <td className="py-3 text-[#b1b4a2] text-xs whitespace-nowrap">
                                            {new Date(event.created_at).toLocaleString('en-US', {
                                                month: 'short',
                                                day: 'numeric',
                                                year: 'numeric',
                                                hour: 'numeric',
                                                minute: '2-digit',
                                                hour12: true,
                                            })}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    )
}
