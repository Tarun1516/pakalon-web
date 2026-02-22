'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function PricingPage() {
    const router = useRouter()
    const [showWaitlist, setShowWaitlist] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const [form, setForm] = useState({ name: '', location: '', email: '' })

    const handleSelect = () => {
        router.push('/dashboard')
    }

    const handleWaitlistSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setSubmitted(true)
    }

    return (
        <div className="p-8 lg:p-16 space-y-24 max-w-6xl mx-auto">

            {/* Back button */}
            <div>
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-sm text-[#b1b4a2] hover:text-white transition-colors group"
                >
                    <span className="material-symbols-outlined text-lg group-hover:-translate-x-0.5 transition-transform">
                        arrow_back
                    </span>
                    Back to Home
                </Link>
            </div>

            <div className="text-center space-y-6">
                <div className="inline-flex items-center px-4 py-1 rounded-full border border-border-dark bg-surface-dark text-primary text-sm font-medium">
                    Simple, transparent pricing
                </div>
                <h1 className="text-5xl lg:text-7xl font-bold text-white tracking-tight">
                    Scale your AI workflows <br />
                    <span className="text-primary">effortlessly.</span>
                </h1>
                <p className="text-lg text-[#b1b4a2] max-w-xl mx-auto">
                    Choose the plan that fits your development needs. Whether hacking on a project or scaling
                    production.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Free plan */}
                <div className="bg-surface-dark border border-border-dark rounded-2xl p-8 space-y-8 hover:border-white/10 transition-colors">
                    <div className="space-y-2">
                        <h3 className="text-2xl font-bold">Free</h3>
                        <p className="text-[#b1b4a2] text-sm">Perfect for hobbyists and side projects.</p>
                    </div>
                    <div className="flex items-baseline gap-2">
                        <span className="text-5xl font-bold text-white">$0</span>
                        <span className="text-[#b1b4a2] text-sm">/ month</span>
                    </div>
                    <button
                        onClick={handleSelect}
                        className="w-full py-3 rounded-lg border border-border-dark font-bold hover:bg-white/5 transition-colors"
                    >
                        Get Started
                    </button>
                    <div className="space-y-4">
                        <p className="text-xs font-bold text-[#b1b4a2] uppercase tracking-wider">
                            What&apos;s included
                        </p>
                        <ul className="space-y-3">
                            {[
                                '30-day free trial',
                                'Access to free AI models',
                                'Basic security scanning (Bandit, sqlmap)',
                                'Penpot for wireframing and designing',
                            ].map((f, i) => (
                                <li key={i} className="flex items-center gap-3 text-sm text-[#b1b4a2]">
                                    <span className="material-symbols-outlined text-lg">check_circle</span> {f}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Pro plan */}
                <div className="bg-surface-dark border-2 border-primary rounded-2xl p-8 space-y-8 relative shadow-[0_0_40px_-10px_rgba(215,225,157,0.15)]">
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-background-dark text-[10px] font-bold px-3 py-1 rounded-full uppercase">
                        Recommended
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-2xl font-bold">Pro</h3>
                        <p className="text-[#b1b4a2] text-sm">For professional developers and teams.</p>
                    </div>
                    <div className="flex items-baseline gap-2">
                        <span className="text-5xl font-bold text-white">$19</span>
                        <span className="text-[#b1b4a2] text-sm">/ month</span>
                    </div>
                    <button
                        onClick={() => setShowWaitlist(true)}
                        className="w-full py-3 rounded-lg bg-primary text-background-dark font-bold hover:brightness-110 transition-all"
                    >
                        Join the Waitlist
                    </button>
                    <div className="space-y-4">
                        <p className="text-xs font-bold text-primary uppercase tracking-wider">
                            Everything in Free, plus
                        </p>
                        <ul className="space-y-3">
                            {[
                                'Everything in Free, plus:',
                                'All 550+ AI models',
                                'Advanced security tools (Semgrep, OWASP ZAP)',
                                'Priority support',
                                'Extended context windows',
                                'Unlimited sessions',
                            ].map((f, i) => (
                                <li key={i} className="flex items-center gap-3 text-sm text-white">
                                    <span className="material-symbols-outlined text-lg text-primary">
                                        check_circle
                                    </span>{' '}
                                    {f}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* FAQ */}
            <div className="space-y-12">
                <h2 className="text-3xl font-bold text-center">Frequently Asked Questions</h2>
                <div className="max-w-3xl mx-auto space-y-4">
                    {[
                        {
                            q: 'What happens if I exceed my limit?',
                            a: 'Requests are softly throttled and we send email alerts.',
                        },
                        {
                            q: 'Can I change plans at any time?',
                            a: 'Yes, proration is handled automatically.',
                        },
                        {
                            q: 'Do you offer annual discounts?',
                            a: 'We offer 20% off for annual commitments.',
                        },
                        {
                            q: 'How do I manage my API keys?',
                            a: 'Manage everything from the Developer Dashboard.',
                        },
                    ].map((item, i) => (
                        <details
                            key={i}
                            className="group bg-surface-dark border border-border-dark rounded-xl p-4 cursor-pointer hover:border-primary/20"
                        >
                            <summary className="flex items-center justify-between font-medium text-white list-none">
                                {item.q}
                                <span className="material-symbols-outlined transition-transform group-open:rotate-180">
                                    expand_more
                                </span>
                            </summary>
                            <div className="mt-4 text-sm text-[#b1b4a2] leading-relaxed pb-2">{item.a}</div>
                        </details>
                    ))}
                </div>
            </div>

            {/* Waitlist Modal */}
            {showWaitlist && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/70 backdrop-blur-sm">
                    <div className="w-full max-w-md bg-surface-dark border border-border-dark rounded-2xl p-8 space-y-6 shadow-2xl relative">
                        <button
                            onClick={() => { setShowWaitlist(false); setSubmitted(false); setForm({ name: '', location: '', email: '' }) }}
                            className="absolute top-4 right-4 text-[#b1b4a2] hover:text-white transition-colors"
                        >
                            <span className="material-symbols-outlined">close</span>
                        </button>

                        {submitted ? (
                            <div className="text-center py-8 space-y-4">
                                <div className="size-16 mx-auto rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-3xl text-primary">check_circle</span>
                                </div>
                                <h2 className="text-2xl font-bold text-white">You&apos;re on the list!</h2>
                                <p className="text-[#b1b4a2] text-sm">
                                    We&apos;ll reach out at <span className="text-primary">{form.email}</span> when Pro launches.
                                </p>
                                <button
                                    onClick={() => { setShowWaitlist(false); setSubmitted(false); setForm({ name: '', location: '', email: '' }) }}
                                    className="mt-4 px-6 py-2 rounded-lg bg-primary text-background-dark font-bold text-sm hover:brightness-110 transition-all"
                                >
                                    Done
                                </button>
                            </div>
                        ) : (
                            <>
                                <div className="space-y-1">
                                    <h2 className="text-2xl font-bold text-white">Join the Waitlist</h2>
                                    <p className="text-[#b1b4a2] text-sm">
                                        Be first to access Pakalon Pro when it rolls out.
                                    </p>
                                </div>

                                <form
                                    className="space-y-4"
                                    onSubmit={handleWaitlistSubmit}
                                >
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-[#b1b4a2] uppercase tracking-wider">
                                            Full Name
                                        </label>
                                        <input
                                            required
                                            type="text"
                                            placeholder="Jane Smith"
                                            value={form.name}
                                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                                            className="w-full bg-background-dark border border-border-dark rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary placeholder:text-[#b1b4a2]/50"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-[#b1b4a2] uppercase tracking-wider">
                                            Location
                                        </label>
                                        <input
                                            required
                                            type="text"
                                            placeholder="San Francisco, CA"
                                            value={form.location}
                                            onChange={(e) => setForm({ ...form, location: e.target.value })}
                                            className="w-full bg-background-dark border border-border-dark rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary placeholder:text-[#b1b4a2]/50"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-[#b1b4a2] uppercase tracking-wider">
                                            Email ID
                                        </label>
                                        <input
                                            required
                                            type="email"
                                            placeholder="jane@example.com"
                                            value={form.email}
                                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                                            className="w-full bg-background-dark border border-border-dark rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary placeholder:text-[#b1b4a2]/50"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full py-3 rounded-lg bg-primary text-background-dark font-bold hover:brightness-110 transition-all mt-2"
                                    >
                                        Join Waitlist
                                    </button>
                                </form>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}
