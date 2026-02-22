'use client'

import Image from 'next/image'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function GithubLoginPage() {
    const [isConnecting, setIsConnecting] = useState(false)
    const router = useRouter()

    const handleLogin = () => {
        setIsConnecting(true)
        setTimeout(() => {
            router.push('/pricing')
        }, 1500)
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-background-dark relative">
            {/* Back button */}
            <div className="absolute top-6 left-6 z-20">
                <a
                    href="/"
                    className="inline-flex items-center gap-2 text-sm text-[#b1b4a2] hover:text-white transition-colors group"
                >
                    <span className="material-symbols-outlined text-lg group-hover:-translate-x-0.5 transition-transform">arrow_back</span>
                    Back to Home
                </a>
            </div>
            {/* Decorative background elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
                <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-primary rounded-full blur-[120px]"></div>
                <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-primary/30 rounded-full blur-[120px]"></div>
            </div>

            <div className="w-full max-w-md space-y-8 z-10">
                <div className="text-center space-y-4">
                    <div className="mx-auto flex items-center justify-center">
                        <Image
                            src="/assets/Light_theme_TPBG.png"
                            alt="Pakalon"
                            width={265}
                            height={125}
                            className="h-[125px] w-auto object-contain"
                            priority
                        />
                    </div>
                    <div className="space-y-1">
                        <h1 className="text-3xl font-bold tracking-tight text-white">Welcome Back</h1>
                        <p className="text-[#b1b4a2]">Sign in to Pakalon with your GitHub account</p>
                    </div>
                </div>

                <div className="bg-surface-dark border border-border-dark p-8 rounded-2xl shadow-xl space-y-6">
                    <div className="flex items-center gap-4 p-4 rounded-xl bg-background-dark/50 border border-border-dark">
                        <div className="size-10 bg-primary rounded-lg flex items-center justify-center text-background-dark shrink-0">
                            <span className="material-symbols-outlined font-bold">terminal</span>
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-bold text-white leading-none">Pakalon CLI</p>
                            <p className="text-[10px] text-primary uppercase font-bold tracking-widest mt-1">
                                Official OAuth Application
                            </p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center gap-3 text-sm text-[#b1b4a2]">
                            <span className="material-symbols-outlined text-green-400 text-lg">check_circle</span>
                            <span>Read access to your public profile</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-[#b1b4a2]">
                            <span className="material-symbols-outlined text-green-400 text-lg">check_circle</span>
                            <span>Email address verification</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-[#b1b4a2]">
                            <span className="material-symbols-outlined text-green-400 text-lg">check_circle</span>
                            <span>Secure CLI session management</span>
                        </div>
                    </div>

                    <button
                        onClick={handleLogin}
                        disabled={isConnecting}
                        className={`w-full h-14 rounded-xl font-bold flex items-center justify-center gap-3 transition-all ${isConnecting
                            ? 'bg-surface-hover text-[#b1b4a2] cursor-not-allowed'
                            : 'bg-white text-black hover:bg-gray-200 hover:scale-[1.01] active:scale-[0.98]'
                            }`}
                    >
                        {isConnecting ? (
                            <>
                                <div className="size-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin"></div>
                                Connecting...
                            </>
                        ) : (
                            <>
                                <svg height="20" viewBox="0 0 16 16" version="1.1" width="20" aria-hidden="true">
                                    <path
                                        fill="currentColor"
                                        d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
                                    />
                                </svg>
                                Continue with GitHub
                            </>
                        )}
                    </button>

                    <p className="text-[11px] text-center text-[#b1b4a2] px-4">
                        By continuing, you agree to Pakalon&apos;s{' '}
                        <a href="#" className="underline hover:text-white">
                            Terms of Service
                        </a>{' '}
                        and{' '}
                        <a href="#" className="underline hover:text-white">
                            Privacy Policy
                        </a>
                        .
                    </p>
                </div>

                <div className="flex justify-center gap-6 text-xs text-[#b1b4a2]">
                    <a href="#" className="hover:text-white transition-colors">Help</a>
                    <a href="#" className="hover:text-white transition-colors">Security</a>
                    <a href="#" className="hover:text-white transition-colors">API Status</a>
                </div>
            </div>
        </div>
    )
}
