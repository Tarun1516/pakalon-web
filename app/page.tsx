'use client'

import Image from 'next/image'
import Link from 'next/link'

export default function LandingPage() {
    return (
        <div className="relative min-h-screen bg-background-dark overflow-x-hidden">
            <nav className="sticky top-0 z-50 w-full border-b border-border-dark bg-background-dark/80 backdrop-blur-md px-6 py-4">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Image
                            src="/assets/Light_theme_TPBG.png"
                            alt="Pakalon"
                            width={195}
                            height={79}
                            className="h-[79px] w-auto object-contain"
                            priority
                        />
                    </div>
                    <div className="flex items-center gap-6">
                        <Link href="/dashboard/docs" className="text-sm text-[#b1b4a2] hover:text-white">
                            Docs
                        </Link>
                        <Link href="/pricing" className="text-sm text-[#b1b4a2] hover:text-white">
                            Pricing
                        </Link>
                        <Link
                            href="/login"
                            className="bg-primary text-background-dark px-4 py-2 rounded-lg font-bold text-sm hover:scale-105 transition-transform"
                        >
                            Get Started
                        </Link>
                    </div>
                </div>
            </nav>

            <section className="max-w-7xl mx-auto px-6 pt-24 pb-32 grid grid-cols-1 lg:grid-cols-2 items-center gap-16">
                <div className="space-y-8">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold">
                        <span className="size-2 bg-primary rounded-full animate-pulse"></span>
                        v2.0 is now live
                    </div>
                    <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1]">
                        The Agentic AI for <span className="text-primary">Modern Devs</span>
                    </h1>
                    <p className="text-lg text-[#b1b4a2] max-w-lg leading-relaxed">
                        Stop wrestling with scattered API keys and undocumented endpoints. Pakalon unifies your AI workflow with seamless authentication and usage tracking right from your terminal.
                    </p>
                    <div className="space-y-3 max-w-md">
                        <label className="text-xs font-bold text-[#b1b4a2] uppercase tracking-wider">
                            Install via CLI
                        </label>
                        <div className="flex items-center bg-surface-dark border border-border-dark rounded-lg overflow-hidden h-12">
                            <div className="size-12 flex items-center justify-center text-primary bg-white/5 border-r border-border-dark">
                                <span className="material-symbols-outlined">chevron_right</span>
                            </div>
                            <input
                                readOnly
                                value="curl -sSL https://pakalon.dev/install.sh | sh"
                                className="bg-transparent px-4 font-mono text-sm text-primary flex-1 outline-none"
                            />
                            <button className="px-4 text-[#b1b4a2] hover:text-white">
                                <span className="material-symbols-outlined text-lg">content_copy</span>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="relative group">
                    <div className="bg-[#0d0e0b] rounded-xl border border-border-dark shadow-2xl overflow-hidden">
                        <div className="flex gap-1.5 px-4 py-3 bg-surface-dark border-b border-border-dark">
                            <div className="size-2.5 rounded-full bg-red-500/80"></div>
                            <div className="size-2.5 rounded-full bg-yellow-500/80"></div>
                            <div className="size-2.5 rounded-full bg-green-500/80"></div>
                        </div>
                        <div className="p-8 font-mono text-sm space-y-4 h-[350px] flex flex-col justify-end">
                            <div className="space-y-2 opacity-80">
                                <div className="flex gap-2">
                                    <span className="text-primary">$</span>{' '}
                                    <span className="text-white">pakalon auth login</span>
                                </div>
                                <div className="text-primary">✓ Authenticated as dev@example.com</div>
                                <br />
                                <div className="flex gap-2">
                                    <span className="text-primary">$</span>{' '}
                                    <span className="text-white">pakalon explain --last</span>
                                </div>
                                <div className="border-l-2 border-primary/20 pl-4 py-2 space-y-2">
                                    <p className="text-white font-bold">Explanation:</p>
                                    <p className="text-xs text-[#b1b4a2]">
                                        Your last command updated the OAuth2 middleware. It successfully configured PKCE
                                        flows for local development.
                                    </p>
                                </div>
                                <div className="flex gap-2 animate-pulse">
                                    <span className="text-primary">$</span>
                                    <div className="w-2 h-5 bg-primary"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="absolute -inset-4 bg-primary/5 blur-3xl -z-10 group-hover:bg-primary/10 transition-all"></div>
                </div>
            </section>

            <section className="bg-surface-dark border-y border-border-dark py-24">
                <div className="max-w-7xl mx-auto px-6 text-center space-y-16">
                    <h2 className="text-3xl lg:text-4xl font-bold">
                        Built for the <span className="text-primary">Command Line</span>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                        {[
                            {
                                label: 'Secure Auth',
                                icon: 'lock',
                                desc: 'Effortless API key rotation. Never hardcode credentials again.',
                            },
                            {
                                label: 'Instant Docs',
                                icon: 'menu_book',
                                desc: 'Context-aware help right in your terminal. Get parameters instantly.',
                            },
                            {
                                label: 'Usage Analytics',
                                icon: 'monitoring',
                                desc: 'Real-time tracking of token usage across all providers.',
                            },
                        ].map((f, i) => (
                            <div
                                key={i}
                                className="bg-background-dark border border-border-dark p-8 rounded-xl hover:border-primary/30 transition-all"
                            >
                                <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-6">
                                    <span className="material-symbols-outlined text-3xl">{f.icon}</span>
                                </div>
                                <h3 className="text-xl font-bold mb-2">{f.label}</h3>
                                <p className="text-[#b1b4a2] text-sm leading-relaxed">{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <footer className="py-12 border-t border-border-dark text-center text-[#b1b4a2] text-sm">
                <p>© 2024 Pakalon Inc. All rights reserved.</p>
            </footer>
        </div>
    )
}
