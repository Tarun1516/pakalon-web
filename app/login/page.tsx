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
                            width={235}
                            height={95}
                            className="h-[95px] w-auto object-contain"
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
                            <span className="material-symbols-outlined text-primary text-lg">info</span>
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
                                <Image
                                    src="/assets/Light_theme_TPBG.png"
                                    alt="Pakalon"
                                    width={95}
                                    height={43}
                                    className="h-[43px] w-auto object-contain invert"
                                />
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
