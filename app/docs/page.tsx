'use client'

import { useState, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

function DocsContent() {
    const [helpful, setHelpful] = useState<'yes' | 'no' | null>(null)
    const searchParams = useSearchParams()
    const from = searchParams.get('from')
    const backHref = from === 'dashboard' ? '/dashboard' : '/'
    const backLabel = from === 'dashboard' ? 'Back to Dashboard' : 'Back to Home'

    return (
        <div className="min-h-screen bg-[#0d0e0b] text-white flex flex-col">

            {/* ── Top Nav ── */}
            <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#0d0e0b]/90 backdrop-blur-md px-6 py-3">
                <div className="max-w-5xl mx-auto flex items-center justify-between">
                    {/* Back + Brand */}
                    <div className="flex items-center gap-4">
                        <Link
                            href={backHref}
                            className="inline-flex items-center gap-1.5 text-sm text-[#b1b4a2] hover:text-white transition-colors group"
                        >
                            <span className="material-symbols-outlined text-base group-hover:-translate-x-0.5 transition-transform">arrow_back</span>
                            {backLabel}
                        </Link>
                        <div className="w-px h-5 bg-white/10" />
                        <div className="flex items-center gap-2.5">
                            <span className="font-bold text-white text-base tracking-tight">Pakalon Docs</span>
                            <span className="px-2 py-0.5 rounded-full bg-primary/20 border border-primary/30 text-primary text-[10px] font-bold tracking-wide">
                                v 1.0
                            </span>
                        </div>
                    </div>

                    {/* Links */}
                    <div className="flex items-center gap-6 text-sm text-[#b1b4a2]">
                        <Link href="/" className="hover:text-white transition-colors">Home</Link>
                        <a href="#" className="hover:text-white transition-colors">API Reference</a>
                        <a href="https://github.com/Tarun1516/pakalon-web" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">GitHub</a>
                        <Link href="/dashboard/support" className="hover:text-white transition-colors">Support</Link>
                    </div>

                    {/* CTA */}
                    <a
                        href="#"
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-background-dark text-sm font-bold hover:brightness-110 transition-all"
                    >
                        <span className="material-symbols-outlined text-base">download</span>
                        Download CLI
                    </a>
                </div>
            </nav>

            {/* ── Main content ── */}
            <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-10 space-y-10">

                {/* Breadcrumb */}
                <nav className="flex items-center gap-1 text-xs text-[#b1b4a2]">
                    <span>Docs</span>
                    <span className="material-symbols-outlined text-sm">chevron_right</span>
                </nav>

                {/* ── Section 1: Not Initialized ── */}
                <section className="space-y-4">
                    <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-2xl text-[#b1b4a2]">radio_button_unchecked</span>
                        <h2 className="text-xl font-bold text-white">Pakalon-Agents Not Initialized</h2>
                    </div>

                    {/* Card */}
                    <div className="relative bg-[#161712] border border-white/8 rounded-2xl overflow-hidden min-h-[260px] p-6 flex flex-col justify-between">
                        {/* Content */}
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
                </section>

                {/* ── Section 2: Initialized ── */}
                <section className="space-y-4">
                    <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-2xl text-green-400">check_circle</span>
                        <h2 className="text-xl font-bold text-white">Pakalon-Agents Initialized</h2>
                    </div>

                    {/* Card */}
                    <div className="relative bg-[#161712] border border-white/8 rounded-2xl overflow-hidden min-h-[400px] p-6 flex flex-col justify-between">
                        {/* Content */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-3">
                                <div className="size-10 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-green-400">cloud_done</span>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-white">Active Bidirectional Stream</p>
                                    <p className="text-xs text-[#b1b4a2]">Secure WSS connection established</p>
                                </div>
                            </div>

                            {/* WSS diagram */}
                            <div className="flex items-center justify-center gap-6 py-4">
                                <div className="flex flex-col items-center gap-2">
                                    <div className="size-14 rounded-xl bg-black/40 border border-border-dark flex items-center justify-center shadow-lg">
                                        <span className="material-symbols-outlined text-white">terminal</span>
                                    </div>
                                    <span className="text-[10px] text-[#b1b4a2] font-mono">CLI</span>
                                </div>
                                <div className="flex-1 max-w-[120px] flex flex-col items-center gap-1">
                                    <div className="w-full h-px bg-primary/40 relative">
                                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#161712] px-1.5 text-[9px] font-mono text-primary whitespace-nowrap">
                                            WSS://
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <div className="size-1.5 rounded-full bg-green-400 animate-pulse" />
                                        <span className="text-[9px] text-green-400 font-mono">LIVE</span>
                                    </div>
                                </div>
                                <div className="flex flex-col items-center gap-2">
                                    <div className="size-14 rounded-xl bg-black/40 border border-primary flex items-center justify-center shadow-lg">
                                        <span className="material-symbols-outlined text-primary">cloud_done</span>
                                    </div>
                                    <span className="text-[10px] text-[#b1b4a2] font-mono">CLOUD</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                {[
                                    { icon: 'check', label: 'Automated error reporting', color: 'text-green-400' },
                                    { icon: 'check', label: 'Live context injection', color: 'text-green-400' },
                                    { icon: 'check', label: 'Persistent session history', color: 'text-green-400' },
                                ].map((item) => (
                                    <div key={item.label} className="flex items-center gap-2 text-xs text-[#b1b4a2] bg-black/20 rounded-lg px-3 py-2">
                                        <span className={`material-symbols-outlined text-base ${item.color}`}>{item.icon}</span>
                                        {item.label}
                                    </div>
                                ))}
                            </div>

                            {/* Verification command */}
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
                                    <p><span className="text-primary">pakalon</span> status --verbose --json</p>
                                    <div className="text-[11px] text-[#b1b4a2] border-t border-white/5 pt-2 mt-1 space-y-1">
                                        <p className="text-green-400">➜ Status: Online</p>
                                        <p>➜ Bridge: v2.4.1 connected</p>
                                        <p>➜ Latency: 42ms</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Fig label */}
                        <div className="absolute bottom-3 right-4 text-[10px] font-mono text-white/20 select-none">Fig 1.0</div>
                    </div>
                </section>

            </main>

            {/* ── Was this helpful? ── */}
            <div className="border-t border-white/8 bg-[#0d0e0b] py-8">
                <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                        <p className="text-sm font-medium text-white">Was this page helpful?</p>
                        <p className="text-xs text-[#b1b4a2] mt-0.5">Your feedback helps us improve the documentation.</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setHelpful('yes')}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-all ${helpful === 'yes'
                                ? 'bg-green-500/10 border-green-500/40 text-green-400'
                                : 'border-border-dark text-[#b1b4a2] hover:border-white/20 hover:text-white'
                                }`}
                        >
                            <span className="material-symbols-outlined text-base">thumb_up</span>
                            Yes
                        </button>
                        <button
                            onClick={() => setHelpful('no')}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-all ${helpful === 'no'
                                ? 'bg-red-500/10 border-red-500/40 text-red-400'
                                : 'border-border-dark text-[#b1b4a2] hover:border-white/20 hover:text-white'
                                }`}
                        >
                            <span className="material-symbols-outlined text-base">thumb_down</span>
                            No
                        </button>
                    </div>
                </div>
            </div>

            {/* ── Footer ── */}
            <footer className="border-t border-white/5 bg-[#0d0e0b] py-4">
                <p className="text-center text-xs text-[#b1b4a2]">© 2026 Pakalon Inc. All rights reserved.</p>
            </footer>
        </div>
    )
}

export default function DocsPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-[#0d0e0b]" />}>
            <DocsContent />
        </Suspense>
    )
}
