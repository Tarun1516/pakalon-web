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

const data = [
    { name: 'Mon', tokens: 80000 },
    { name: 'Tue', tokens: 110000 },
    { name: 'Wed', tokens: 130000 },
    { name: 'Thu', tokens: 160000 },
    { name: 'Fri', tokens: 140000 },
    { name: 'Sat', tokens: 175000 },
    { name: 'Sun', tokens: 185000 },
]

export default function TokenUsageChart() {
    return (
        <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
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
                        tickFormatter={(val) => `${val / 1000}k`}
                    />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: '#25261e',
                            border: '1px solid #34362b',
                            borderRadius: '8px',
                        }}
                        itemStyle={{ color: '#d7e19d' }}
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
