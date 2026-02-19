'use client'

import { useRouter } from 'next/navigation'

export default function PricingPage() {
    const router = useRouter()

    const handleSelect = () => {
        router.push('/dashboard')
    }

    return (
        <div className="p-8 lg:p-16 space-y-24 max-w-6xl mx-auto">
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
                                'Unlimited local auth',
                                'Basic docs access',
                                'Community support',
                                '1,000 requests/day',
                            ].map((f, i) => (
                                <li key={i} className="flex items-center gap-3 text-sm text-[#b1b4a2]">
                                    <span className="material-symbols-outlined text-lg">check_circle</span> {f}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

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
                        onClick={handleSelect}
                        className="w-full py-3 rounded-lg bg-primary text-background-dark font-bold hover:brightness-110 transition-all"
                    >
                        Upgrade to Pro
                    </button>
                    <div className="space-y-4">
                        <p className="text-xs font-bold text-primary uppercase tracking-wider">
                            Everything in Free, plus
                        </p>
                        <ul className="space-y-3">
                            {[
                                'Advanced analytics',
                                '100k requests/day',
                                'Priority email support',
                                'Custom integrations',
                                'Collaboration tools',
                            ].map((f, i) => (
                                <li key={i} className="flex items-center gap-3 text-sm text-white">
                                    <span className="material-symbols-outlined text-lg text-primary">check_circle</span>{' '}
                                    {f}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

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
        </div>
    )
}
