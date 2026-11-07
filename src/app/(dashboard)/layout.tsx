'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen">
      {/* Sidebar Samping */}
      <aside className="w-64 bg-slate-900 text-white p-4 space-y-4">
        <h2 className="text-xl font-bold mb-6">Dashboard Menu</h2>
        <nav className="flex flex-col gap-2">
          <Link
            href="/dashboard"
            className={`p-2 rounded transition ${
              pathname === '/dashboard' ? 'bg-blue-600 font-bold' : 'hover:bg-slate-800'
            }`}
          >
            Dashboard Utama
          </Link>
          <Link
            href="/dashboard/settings"
            className={`p-2 rounded transition ${
              pathname === '/dashboard/settings' ? 'bg-blue-600 font-bold' : 'hover:bg-slate-800'
            }`}
          >
            Settings
          </Link>
        </nav>
      </aside>

      {/* Konten Utama */}
      <main className="flex-1 p-6 bg-slate-50">{children}</main>
    </div>
  );
}