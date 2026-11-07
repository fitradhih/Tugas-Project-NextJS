import Link from 'next/link';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {/* Navbar di atas */}
      <nav className="flex gap-4 p-4 bg-slate-800 text-white">
        <Link href="/" className="font-bold">Home</Link>
        <Link href="/courses/nextjs-basic">Course Next.js</Link>
        <Link href="/login">Login</Link>
      </nav>
      <main className="p-6">{children}</main>
    </div>
  );
}