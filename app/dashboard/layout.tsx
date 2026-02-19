import Sidebar from '@/components/Sidebar'

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex h-screen w-full bg-background-dark overflow-hidden">
            <Sidebar />
            <main className="flex-1 overflow-y-auto bg-background-dark">
                {children}
            </main>
        </div>
    )
}
