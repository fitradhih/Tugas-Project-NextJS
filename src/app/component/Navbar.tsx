import Link from "next/link";
import { logout } from "../actions/auth";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export default async function Navbar() {
  const cookieStore = await cookies();

  // Inisialisasi Supabase Server Client
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();
  const isAdmin = user?.user_metadata?.role === "admin";

  return (
    <header className="w-full bg-slate-900 border-b border-slate-800 px-8 py-4 flex items-center justify-between sticky top-0 z-40">
      {/* Menu Kiri */}
      <div className="flex items-center gap-6">
        <span className="text-xl font-extrabold text-white tracking-wider">
          FILM APP
        </span>
        <div className="flex items-center gap-4 text-sm font-medium">
          <Link
            href="/movie"
            className="text-slate-300 hover:text-white transition"
          >
            Movies
          </Link>

          {/* Hanya Tampilkan 'Edit Movies' Jika Role Adalah ADMIN */}
          {isAdmin && (
            <Link href="/movie/edit" className="text-slate-300 hover:text-white transition">
              Edit Movies
            </Link>
          )}
        </div>
      </div>

      {/* Tombol Logout Kanan */}
      <form action={logout}>
        <button
          type="submit"
          className="px-4 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 border border-red-500/30 rounded-lg text-sm font-semibold transition cursor-pointer"
        >
          Logout
        </button>
      </form>
    </header>
  );
}