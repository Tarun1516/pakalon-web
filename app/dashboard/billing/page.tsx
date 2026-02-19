export default function BillingPage() {
    return (
        <div className="max-w-6xl mx-auto p-8 lg:p-12 space-y-12">
            <div className="flex flex-col md:flex-row justify-between items-end gap-4">
                <div className="space-y-2">
                    <h2 className="text-3xl font-bold tracking-tight text-white">Billing &amp; Subscription</h2>
                    <p className="text-[#b1b4a2]">Manage your plan, payment method, and invoices.</p>
                </div>
                <button className="px-4 py-2 rounded-lg border border-border-dark text-white hover:bg-surface-dark transition-all text-sm font-bold">
                    Contact Support
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-surface-dark border border-border-dark rounded-xl p-6 relative overflow-hidden group">
                    <div className="flex flex-col h-full justify-between">
                        <div className="space-y-1">
                            <p className="text-[#b1b4a2] text-xs font-bold uppercase tracking-wider">Current Plan</p>
                            <div className="flex items-center gap-2">
                                <h3 className="text-white text-2xl font-bold">Pro Plan</h3>
                                <span className="bg-primary/20 text-primary text-[10px] font-bold px-2 py-0.5 rounded-full border border-primary/20">
                                    Active
                                </span>
                            </div>
                            <p className="text-white text-lg font-bold mt-2">
                                $19.00 <span className="text-[#b1b4a2] text-sm font-normal">/ month</span>
                            </p>
                        </div>
                        <button className="w-full mt-6 py-2 px-4 bg-primary text-background-dark font-bold text-sm rounded hover:bg-primary-hover transition-colors">
                            Change Plan
                        </button>
                    </div>
                    <span className="material-symbols-outlined text-8xl text-primary absolute -right-6 -top-6 opacity-5 rotate-12">
                        verified
                    </span>
                </div>

                <div className="bg-surface-dark border border-border-dark rounded-xl p-6">
                    <div className="flex flex-col h-full justify-between gap-6">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-[#b1b4a2] text-xs font-bold uppercase tracking-wider">Next Payment</p>
                                <h3 className="text-white text-2xl font-bold">Oct 24, 2023</h3>
                            </div>
                            <p className="text-primary font-bold text-xl">$19.00</p>
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between text-xs text-[#b1b4a2]">
                                <span>Billing cycle</span>
                                <span>14 days left</span>
                            </div>
                            <div className="h-2 w-full bg-background-dark rounded-full overflow-hidden">
                                <div className="h-full bg-primary" style={{ width: '54%' }}></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-surface-dark border border-border-dark rounded-xl p-6">
                    <div className="flex flex-col h-full justify-between">
                        <div className="space-y-1">
                            <p className="text-[#b1b4a2] text-xs font-bold uppercase tracking-wider">Payment Method</p>
                            <div className="flex items-center gap-3 mt-4">
                                <div className="bg-white rounded p-1 h-8 w-12 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-gray-900">credit_card</span>
                                </div>
                                <div className="flex flex-col">
                                    <p className="text-white font-mono text-sm">•••• •••• •••• 4242</p>
                                    <p className="text-[#b1b4a2] text-xs">Expires 12/25</p>
                                </div>
                            </div>
                        </div>
                        <button className="text-sm font-bold text-white hover:text-primary transition-colors flex items-center gap-2 group mt-6">
                            Update Method
                            <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">
                                arrow_forward
                            </span>
                        </button>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold text-white">Invoice History</h3>
                    <button className="text-sm text-primary hover:text-white flex items-center gap-1 transition-colors">
                        <span className="material-symbols-outlined text-[18px]">download</span>
                        Download All
                    </button>
                </div>
                <div className="bg-surface-dark border border-border-dark rounded-xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-[#2a2c22] border-b border-border-dark text-[#b1b4a2] text-xs font-semibold uppercase">
                                <tr>
                                    <th className="p-4">Date</th>
                                    <th className="p-4">Invoice ID</th>
                                    <th className="p-4">Amount</th>
                                    <th className="p-4">Status</th>
                                    <th className="p-4"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border-dark text-sm">
                                {[1, 2, 3].map((i) => (
                                    <tr key={i} className="hover:bg-[#2a2c22] transition-colors group">
                                        <td className="p-4 text-white font-medium">Oct {24 - i}, 2023</td>
                                        <td className="p-4 text-[#b1b4a2] font-mono">INV-2023-00{i}</td>
                                        <td className="p-4 text-white font-medium">$19.00</td>
                                        <td className="p-4">
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-900/30 text-green-400 border border-green-900/50">
                                                <span className="size-1.5 rounded-full bg-green-400"></span> Paid
                                            </span>
                                        </td>
                                        <td className="p-4 text-right">
                                            <button className="text-[#b1b4a2] hover:text-primary transition-colors">
                                                <span className="material-symbols-outlined text-[20px]">description</span>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
