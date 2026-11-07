'use client';

import { useActionState } from 'react';
import { supabase } from '../../../lib/supabase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();

  const submitForm = async (prevState: string | null, formData: FormData) => {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return error.message;
    }

    router.push('/movie');
    router.refresh();
    return null;
  };

  const [state, formAction, isPending] = useActionState(submitForm, null);

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 p-4">
      <form
        action={formAction}
        className="w-full max-w-md rounded-2xl bg-slate-900 border border-slate-800 p-8 shadow-2xl space-y-5"
      >
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-bold text-white tracking-wide">Masuk Akun</h1>
          <p className="text-sm text-slate-400">Silakan masuk untuk mengelola daftar film</p>
        </div>

        {state && (
          <div className="rounded-xl bg-red-950/50 p-3.5 text-sm text-red-400 border border-red-800/60">
            {state}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Email</label>
            <input
              name="email"
              type="email"
              placeholder="nama@email.com"
              required
              className="w-full rounded-xl bg-slate-800 border border-slate-700 px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Kata Sandi</label>
            <input
              name="password"
              type="password"
              placeholder="••••••••"
              required
              className="w-full rounded-xl bg-slate-800 border border-slate-700 px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white hover:bg-blue-500 focus:ring-2 focus:ring-blue-400 disabled:opacity-50 transition shadow-lg shadow-blue-600/20"
        >
          {isPending ? 'Memproses...' : 'Masuk'}
        </button>

        <p className="text-center text-xs text-slate-400 pt-2">
          Belum punya akun?{' '}
          <Link href="/register" className="text-blue-400 hover:text-blue-300 font-medium underline-offset-4 hover:underline">
            Daftar
          </Link>
        </p>
      </form>
    </div>
  );
}