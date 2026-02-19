'use client'

export default function SupportPage() {
    return (
        <div className="max-w-5xl mx-auto p-8 lg:p-12 space-y-8">
            <div className="space-y-2">
                <h1 className="text-4xl font-bold tracking-tight text-white">Contact &amp; Support</h1>
                <p className="text-[#b1b4a2] max-w-xl">
                    We&apos;re here to help with your CLI integration, authentication issues, or any other
                    questions.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-4 flex flex-col gap-4">
                    {[
                        { label: 'Email Us', desc: 'support@pakalon.dev', icon: 'mail' },
                        { label: 'Documentation', desc: 'Explore the CLI docs', icon: 'menu_book' },
                        { label: 'HQ Location', desc: 'San Francisco, CA', icon: 'location_on' },
                    ].map((card, i) => (
                        <div
                            key={i}
                            className="flex items-start gap-4 p-5 rounded-2xl bg-surface-dark border border-border-dark group hover:border-primary/50 transition-all cursor-pointer"
                        >
                            <div className="bg-surface-dark/30 p-3 rounded-xl group-hover:bg-primary/20 transition-colors border border-border-dark">
                                <span className="material-symbols-outlined text-white group-hover:text-primary">
                                    {card.icon}
                                </span>
                            </div>
                            <div>
                                <h3 className="text-white font-bold mb-1">{card.label}</h3>
                                <p className="text-[#b1b4a2] text-sm group-hover:text-white">{card.desc}</p>
                            </div>
                        </div>
                    ))}

                    <div className="relative w-full h-48 rounded-2xl overflow-hidden border border-border-dark bg-surface-dark">
                        <div className="absolute inset-0 bg-[radial-gradient(#4d4f40_1px,transparent_1px)] bg-[length:20px_20px] opacity-20"></div>
                        <div className="absolute bottom-4 left-4 z-20">
                            <p className="text-xs font-bold text-primary uppercase tracking-wider mb-1">Global HQ</p>
                            <p className="text-white font-bold text-lg">San Francisco</p>
                        </div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-3 bg-primary rounded-full shadow-[0_0_20px_rgba(215,225,157,0.6)] animate-pulse"></div>
                    </div>
                </div>

                <div className="lg:col-span-8">
                    <div className="bg-surface-dark border border-border-dark rounded-2xl p-8 space-y-8">
                        <div className="space-y-1">
                            <h2 className="text-2xl font-bold text-white">Send us a message</h2>
                            <p className="text-[#b1b4a2]">Got a bug report or feature request? We&apos;d love to hear from you.</p>
                        </div>

                        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-white">Subject</label>
                                    <input
                                        type="text"
                                        placeholder="What is this regarding?"
                                        className="w-full bg-background-dark/50 border border-border-dark rounded-xl px-4 py-3 text-white focus:ring-1 focus:ring-primary focus:border-primary outline-none"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-white">Category</label>
                                    <select className="w-full bg-background-dark/50 border border-border-dark rounded-xl px-4 py-3 text-white outline-none">
                                        <option>General Support</option>
                                        <option>Bug Report</option>
                                        <option>Feature Request</option>
                                    </select>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-white">Message</label>
                                <textarea
                                    rows={6}
                                    placeholder="Tell us more about what you need help with..."
                                    className="w-full bg-background-dark/50 border border-border-dark rounded-xl px-4 py-3 text-white focus:ring-1 focus:ring-primary focus:border-primary outline-none resize-none"
                                />
                            </div>
                            <div className="flex justify-end gap-4 pt-4">
                                <button type="button" className="text-[#b1b4a2] hover:text-white font-bold text-sm">
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-3 bg-primary text-background-dark rounded-lg font-bold text-sm flex items-center gap-2 hover:bg-primary-hover"
                                >
                                    Send Message{' '}
                                    <span className="material-symbols-outlined text-sm">send</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
