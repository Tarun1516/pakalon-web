'use client'

import { Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

function DocsContent() {
    const searchParams = useSearchParams()
    const from = searchParams.get('from')
    const backHref = from === 'dashboard' ? '/dashboard' : '/'
    const backLabel = from === 'dashboard' ? 'Back to Dashboard' : 'Back to Home'

    const sections = [
        {
            href: '/docs/not-initialized',
            icon: 'radio_button_unchecked',
            iconColor: 'text-[#b1b4a2]',
            title: 'Pakalon-Agents Not Initialized',
            description: 'Learn how Pakalon behaves when agents are offline and how to initialize them.',
            figLabel: 'Fig 1.8',
            accent: 'hover:border-red-500/30',
        },
        {
            href: '/docs/initialized',
            icon: 'radio_button_unchecked',
            iconColor: 'text-[#b1b4a2]',
            title: 'Pakalon-Agents Initialized',
            description: 'Explore all capabilities available once agents are connected and running.',
            figLabel: 'Fig 1.0',
            accent: 'hover:border-primary/30',
        },
    ]

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

                {/* Page header */}
                <div className="space-y-2 border-b border-white/8 pb-8">
                    <h1 className="text-4xl font-bold tracking-tight text-white">Agents Configuration</h1>
                    <p className="text-[#b1b4a2] text-lg font-light leading-relaxed">
                        Select a section below to learn how Pakalon agents behave in each state.
                    </p>
                </div>

                {/* Clickable section cards */}
                <div className="space-y-4">
                    {sections.map((s) => (
                        <Link
                            key={s.href}
                            href={s.href}
                            className={`group flex items-center gap-5 bg-[#161712] border border-white/8 rounded-2xl p-7 transition-all ${s.accent} hover:bg-[#1a1c15]`}
                        >
                            <span className={`material-symbols-outlined text-3xl ${s.iconColor} shrink-0`}>{s.icon}</span>
                            <div className="flex-1 space-y-1">
                                <h2 className="text-xl font-bold text-white group-hover:text-white">{s.title}</h2>
                                <p className="text-sm text-[#b1b4a2]">{s.description}</p>
                            </div>
                            <div className="flex flex-col items-end gap-2 shrink-0">
                                <span className="material-symbols-outlined text-[#b1b4a2] group-hover:translate-x-0.5 transition-transform">arrow_forward</span>
                                <span className="text-[10px] font-mono text-white/20">{s.figLabel}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </main>

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
