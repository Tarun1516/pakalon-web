'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

interface NavItem {
  label: string
  icon: string
  href: string
}

export default function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const navItems: NavItem[] = [
    { label: 'Usage', icon: 'bar_chart', href: '/dashboard' },
    { label: 'Billing', icon: 'credit_card', href: '/dashboard/billing' },
    { label: 'Profile', icon: 'person', href: '/dashboard/profile' },
    { label: 'Documentation', icon: 'menu_book', href: '/dashboard/docs' },
    { label: 'Contact Us', icon: 'mail', href: '/dashboard/support' },
  ]

  return (
    <aside className="w-64 flex-shrink-0 border-r border-border-dark bg-[#11120d] flex flex-col justify-between p-4 h-full hidden lg:flex">
      <div className="flex flex-col gap-6">
        <Link href="/" className="flex items-center gap-3 px-2">
          <Image
            src="/assets/Light_theme_TPBG.png"
            alt="Pakalon"
            width={195}
            height={79}
            className="h-[79px] w-auto object-contain"
            priority
          />
        </Link>

        <nav className="flex flex-col gap-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${isActive
                  ? 'bg-primary/20 text-primary border border-primary/10'
                  : 'text-[#b1b4a2] hover:text-white hover:bg-[#34362b]'
                  }`}
              >
                <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>
                  {item.icon}
                </span>
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            )
          })}
        </nav>
      </div>

      <div className="flex items-center gap-3 px-3 py-3 rounded-lg bg-[#25261e] border border-border-dark">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://picsum.photos/seed/devin/100"
          alt="Avatar"
          className="h-8 w-8 rounded-full bg-[#4d4f40] object-cover"
        />
        <div className="flex flex-col overflow-hidden">
          <p className="text-white text-sm font-medium truncate">Devin Chen</p>
          <p className="text-[#b1b4a2] text-xs truncate">Pro Plan</p>
        </div>
        <button
          className="ml-auto text-[#b1b4a2] hover:text-white"
          onClick={() => router.push('/')}
          aria-label="Logout"
        >
          <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>logout</span>
        </button>
      </div>
    </aside>
  )
}
