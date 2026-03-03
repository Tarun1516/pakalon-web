import Link from 'next/link'

export default function NotInitializedPage() {
    return (
        <div className="min-h-screen bg-[#0d0e0b] text-white flex flex-col">

            {/* ── Top Nav ── */}
            <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#0d0e0b]/90 backdrop-blur-md px-6 py-3">
                <div className="max-w-5xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link
                            href="/docs"
                            className="inline-flex items-center gap-1.5 text-sm text-[#b1b4a2] hover:text-white transition-colors group"
                        >
                            <span className="material-symbols-outlined text-base group-hover:-translate-x-0.5 transition-transform">arrow_back</span>
                            Back to Docs
                        </Link>
                        <div className="w-px h-5 bg-white/10" />
                        <div className="flex items-center gap-2.5">
                            <span className="font-bold text-white text-base tracking-tight">Pakalon Docs</span>
                            <span className="px-2 py-0.5 rounded-full bg-primary/20 border border-primary/30 text-primary text-[10px] font-bold tracking-wide">
                                v 1.0
                            </span>
                        </div>
                    </div>
                    <div className="flex items-center gap-6 text-sm text-[#b1b4a2]">
                        <Link href="/" className="hover:text-white transition-colors">Home</Link>
                        <a href="https://github.com/Tarun1516/pakalon-web" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">GitHub</a>
                    </div>
                    <a href="#" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-background-dark text-sm font-bold hover:brightness-110 transition-all">
                        <span className="material-symbols-outlined text-base">download</span>
                        Download CLI
                    </a>
                </div>
            </nav>

            {/* ── Content ── */}
            <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-10 space-y-10">

                {/* Breadcrumb */}
                <nav className="flex items-center gap-1 text-xs text-[#b1b4a2]">
                    <Link href="/docs" className="hover:text-white transition-colors">Docs</Link>
                    <span className="material-symbols-outlined text-sm">chevron_right</span>
                    <span className="text-white">Pakalon-Agents Not Initialized</span>
                </nav>

                {/* Header */}
                <div className="flex items-center gap-3 border-b border-white/8 pb-8">
                    <div className="size-10 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-red-400 text-[22px]">cloud_off</span>
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-white">Pakalon-Agents Not Initialized</h1>
                        <p className="text-[#b1b4a2] mt-1 text-sm">Agents are offline. The CLI runs in local mode with limited functionality.</p>
                    </div>
                </div>

                {/* Card */}
                <div className="relative bg-[#161712] border border-white/8 rounded-2xl p-7 space-y-8">

                    {/* Status + diagram */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="size-10 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-red-400">cloud_off</span>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-white">No Active Connection</p>
                                    <p className="text-xs text-[#b1b4a2]">Agents are offline — running in local mode</p>
                                </div>
                            </div>
                            <div className="bg-surface-dark border border-red-500/20 rounded-lg p-4 space-y-3">
                                <h4 className="text-red-400 text-sm font-medium flex items-center gap-2">
                                    <span className="material-symbols-outlined text-sm">warning</span>
                                    Limitations
                                </h4>
                                <ul className="space-y-2 text-xs text-[#b1b4a2]">
                                    <li className="flex gap-2"><span className="text-red-400">✗</span> No cloud context injection</li>
                                    <li className="flex gap-2"><span className="text-red-400">✗</span> No live usage tracking</li>
                                    <li className="flex gap-2"><span className="text-red-400">✗</span> No persistent session sync</li>
                                </ul>
                            </div>
                        </div>

                        {/* Offline Diagram */}
                        <div className="bg-black/20 border border-border-dark rounded-xl p-6 flex items-center justify-center">
                            <div className="flex flex-col items-center gap-4">
                                <div className="flex items-center gap-8">
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="size-14 rounded-xl bg-black/40 border border-border-dark flex items-center justify-center">
                                            <span className="material-symbols-outlined text-white">terminal</span>
                                        </div>
                                        <span className="text-[10px] text-[#b1b4a2] font-mono">CLI</span>
                                    </div>
                                    <div className="flex flex-col items-center gap-1">
                                        <div className="w-20 h-px bg-red-500/30 relative">
                                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#161712] px-1 text-[9px] font-mono text-red-400 whitespace-nowrap">OFFLINE</div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="size-14 rounded-xl bg-black/40 border border-red-500/40 flex items-center justify-center">
                                            <span className="material-symbols-outlined text-red-400">cloud_off</span>
                                        </div>
                                        <span className="text-[10px] text-[#b1b4a2] font-mono">CLOUD</span>
                                    </div>
                                </div>
                                <span className="text-[10px] text-[#b1b4a2] font-mono uppercase">No Active Connection</span>
                            </div>
                        </div>
                    </div>

                    {/* Limitations grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {[
                            { icon: 'block', label: 'No cloud context injection', color: 'text-red-400' },
                            { icon: 'block', label: 'No live usage tracking', color: 'text-red-400' },
                            { icon: 'block', label: 'No persistent session sync', color: 'text-red-400' },
                        ].map((item) => (
                            <div key={item.label} className="flex items-center gap-2 text-xs text-[#b1b4a2] bg-black/20 rounded-lg px-3 py-2">
                                <span className={`material-symbols-outlined text-base ${item.color}`}>{item.icon}</span>
                                {item.label}
                            </div>
                        ))}
                    </div>

                    {/* Initialize command */}
                    <div>
                        <h3 className="text-sm font-medium text-white mb-3">Initialize Agents</h3>
                        <div className="rounded-xl border border-border-dark bg-black overflow-hidden">
                            <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/5">
                                <div className="flex gap-1.5">
                                    <div className="size-2 rounded-full bg-red-500/60" />
                                    <div className="size-2 rounded-full bg-yellow-500/60" />
                                    <div className="size-2 rounded-full bg-green-500/60" />
                                </div>
                                <span className="text-[10px] font-mono text-[#b1b4a2]">bash</span>
                            </div>
                            <div className="p-4 font-mono text-sm space-y-1.5">
                                <p><span className="text-primary">pakalon</span> agents init</p>
                                <div className="text-[11px] text-[#b1b4a2] border-t border-white/5 pt-2 mt-1 space-y-1">
                                    <p className="text-yellow-400">➜ No agents detected. Starting initialization...</p>
                                    <p>➜ Connecting to Pakalon cloud...</p>
                                    <p className="text-green-400">➜ Agents initialized successfully.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Fig label */}
                    <div className="absolute bottom-3 right-4 text-[10px] font-mono text-white/20 select-none">Fig 1.8</div>
                </div>
            </main>

            <footer className="border-t border-white/5 bg-[#0d0e0b] py-4">
                <p className="text-center text-xs text-[#b1b4a2]">© 2026 Pakalon Inc. All rights reserved.</p>
            </footer>
        </div>
    )
}
