export default function ProfilePage() {
    return (
        <div className="max-w-4xl mx-auto p-8 lg:p-12 space-y-10">
            <div>
                <h2 className="text-3xl font-bold tracking-tight text-white mb-2">Profile Settings</h2>
                <p className="text-[#b1b4a2]">Manage your personal information and CLI configuration.</p>
            </div>

            <div className="bg-surface-dark border border-border-dark rounded-2xl overflow-hidden p-8 space-y-8">
                <div className="flex flex-col md:flex-row gap-8 items-start">
                    <div className="relative shrink-0 mx-auto md:mx-0">
                        <div className="h-32 w-32 rounded-full overflow-hidden border-4 border-background-dark shadow-xl">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src="https://picsum.photos/seed/alex/200"
                                alt="Avatar"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <button className="absolute bottom-1 right-1 h-8 w-8 rounded-full bg-primary hover:bg-primary-hover text-background-dark flex items-center justify-center border-2 border-surface-dark">
                            <span className="material-symbols-outlined text-[18px]">edit</span>
                        </button>
                    </div>

                    <div className="flex-1 w-full space-y-6">
                        <div className="space-y-4">
                            <label className="text-sm font-medium text-gray-300">Display Name</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    defaultValue="Alex Chen"
                                    className="w-full bg-background-dark border border-border-dark rounded-lg px-4 py-3 text-white focus:ring-1 focus:ring-primary focus:border-primary outline-none"
                                />
                                <span className="material-symbols-outlined absolute right-3 top-3.5 text-gray-500">
                                    badge
                                </span>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <label className="text-sm font-medium text-gray-300">Email Address</label>
                            <div className="relative">
                                <input
                                    type="email"
                                    defaultValue="alex.chen@example.com"
                                    readOnly
                                    className="w-full bg-surface-hover/50 border border-transparent rounded-lg px-4 py-3 text-gray-400 cursor-not-allowed"
                                />
                                <div className="absolute right-3 top-3.5 flex items-center gap-2">
                                    <span className="text-xs text-gray-500 font-mono">ID: usr_8923</span>
                                    <span className="material-symbols-outlined text-gray-500">lock</span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                                CLI Configuration
                                <span className="px-1.5 py-0.5 rounded text-[10px] bg-primary/20 text-primary font-bold uppercase">
                                    Auto-Generated
                                </span>
                            </label>
                            <div className="bg-black/40 rounded-lg p-3 border border-border-dark font-mono text-sm text-gray-400 flex justify-between items-center group cursor-pointer hover:border-gray-600">
                                <code>pakalon config --user &quot;usr_8923&quot;</code>
                                <span className="material-symbols-outlined text-gray-500 group-hover:text-white transition-colors">
                                    content_copy
                                </span>
                            </div>
                        </div>

                        <div className="flex gap-4 pt-4">
                            <button className="h-12 px-6 rounded-lg bg-primary hover:bg-primary-hover text-background-dark font-bold text-sm flex items-center gap-2">
                                <span className="material-symbols-outlined text-[20px]">save</span>
                                Save Changes
                            </button>
                            <button className="h-12 px-6 rounded-lg border border-border-dark hover:border-gray-500 text-gray-300 font-medium text-sm flex items-center gap-2">
                                <span className="material-symbols-outlined text-[20px]">logout</span>
                                Sign Out
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="border border-red-900/30 bg-red-950/10 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="space-y-1">
                    <h3 className="text-lg font-bold text-red-400 flex items-center gap-2">
                        <span className="material-symbols-outlined">warning</span>
                        Delete Account
                    </h3>
                    <p className="text-gray-400 text-sm max-w-md">
                        Permanently remove your account and all data. This action cannot be undone.
                    </p>
                </div>
                <button className="shrink-0 h-10 px-5 rounded-lg border border-red-500/50 text-red-400 hover:bg-red-500/10 transition-colors text-sm font-medium">
                    Delete Account
                </button>
            </div>
        </div>
    )
}
