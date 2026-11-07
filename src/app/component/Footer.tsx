export default function Footer() {
  return (
    <footer className="w-full bg-slate-900 border-t border-slate-800 text-slate-400 py-6 px-8 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-xs">
        <div>
          <p className="font-semibold text-slate-300">FILM APP</p>
          <p className="text-slate-500 mt-0.5">
            Sistem Kelola Katalog Film & Series
          </p>
        </div>

        <div className="flex items-center gap-4 text-slate-400">
          <span>Powered by Next.js & Supabase</span>
          <span>•</span>
          <span>© {new Date().getFullYear()} Fitra Project</span>
        </div>
      </div>
    </footer>
  );
}