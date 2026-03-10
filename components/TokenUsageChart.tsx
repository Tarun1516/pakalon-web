'use client'

import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts'

interface ChartDataPoint {
    name: string
    tokens: number
}

interface Props {
    data?: ChartDataPoint[]
}

const TOKEN_AXIS_MAX = 2_000_000
const TOKEN_AXIS_TICKS = [0, 56_000, 128_000, 256_000, 512_000, 1_000_000, 1_500_000, 2_000_000]

const TOKEN_AXIS_LABELS: Record<number, string> = {
    0: '0',
    56_000: '56k',
    128_000: '128k',
    256_000: '256k',
    512_000: '512k',
    1_000_000: '1m',
    1_500_000: '1.5m',
    2_000_000: '2m',
}

function formatTokenTick(value: number) {
    return TOKEN_AXIS_LABELS[value] ?? value.toLocaleString()
}

const EMPTY_DATA: ChartDataPoint[] = Array.from({ length: 7 }, (_, i) => ({
    name: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i],
    tokens: 0,
}))

export default function TokenUsageChart({ data }: Props) {
    const chartData = data && data.length > 0 ? data : EMPTY_DATA
    return (
        <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                    <defs>
                        <linearGradient id="colorTokens" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#d7e19d" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#d7e19d" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#34362b" />
                    <XAxis
                        dataKey="name"
                        stroke="#b1b4a2"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                    />
                    <YAxis
                        stroke="#b1b4a2"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        width={60}
                        domain={[0, TOKEN_AXIS_MAX]}
                        ticks={TOKEN_AXIS_TICKS}
                        allowDecimals={false}
                        tickFormatter={formatTokenTick}
                    />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: '#25261e',
                            border: '1px solid #34362b',
                            borderRadius: '8px',
                        }}
                        itemStyle={{ color: '#d7e19d' }}
                        labelStyle={{ color: '#b1b4a2' }}
                        formatter={(value: number) => [`${value.toLocaleString()} tokens`, 'Tokens']}
                    />
                    <Area
                        type="monotone"
                        dataKey="tokens"
                        stroke="#d7e19d"
                        fillOpacity={1}
                        fill="url(#colorTokens)"
                        strokeWidth={2}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    )
}
