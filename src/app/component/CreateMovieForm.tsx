"use client";

import { createMovie } from "@/app/actions/movie";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { toast } from "sonner";

export default function CreateMovieForm() {
  const router = useRouter();
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    const formData = new FormData(e.currentTarget);
    const res = await createMovie(formData);

    setLoading(false);

    if (res?.success) {
      toast.success(res.message);
      (e.target as HTMLFormElement).reset();
      router.push("/movie");
      router.refresh();
    } else if (res?.error) {
      setErrors(res.error);
      toast.error("Gagal menambahkan film. Periksa inputanmu!");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="text-white p-6 bg-slate-800 rounded-xl flex flex-col gap-4 w-full max-w-2xl border border-slate-700 mb-8 shadow-lg"
    >
      <h2 className="text-xl font-bold text-white mb-2">Tambah Film Baru</h2>

      <div>
        <label className="block text-xs text-slate-400 mb-1">Judul Film</label>
        <input
          type="text"
          name="title"
          placeholder="Contoh: Inception"
          className="p-2.5 rounded-lg bg-slate-700 border border-slate-600 w-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.title && <p className="text-red-400 text-xs mt-1">{errors.title[0]}</p>}
      </div>

      <div>
        <label className="block text-xs text-slate-400 mb-1">Deskripsi</label>
        <textarea
          name="description"
          placeholder="Ringkasan jalan cerita film..."
          rows={3}
          className="p-2.5 rounded-lg bg-slate-700 border border-slate-600 w-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.description && <p className="text-red-400 text-xs mt-1">{errors.description[0]}</p>}
      </div>

      <div>
        <label className="block text-xs text-slate-400 mb-1">URL Poster</label>
        <input
          type="text"
          name="posterUrl"
          placeholder="https://..."
          className="p-2.5 rounded-lg bg-slate-700 border border-slate-600 w-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.posterUrl && <p className="text-red-400 text-xs mt-1">{errors.posterUrl[0]}</p>}
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div>
          <label className="block text-xs text-slate-400 mb-1">Tahun Rilis</label>
          <input
            type="number"
            name="releaseYear"
            placeholder="2024"
            className="p-2.5 rounded-lg bg-slate-700 border border-slate-600 w-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.releaseYear && <p className="text-red-400 text-xs mt-1">{errors.releaseYear[0]}</p>}
        </div>
        <div>
          <label className="block text-xs text-slate-400 mb-1">Durasi (Menit)</label>
          <input
            type="number"
            name="duration"
            placeholder="120"
            className="p-2.5 rounded-lg bg-slate-700 border border-slate-600 w-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.duration && <p className="text-red-400 text-xs mt-1">{errors.duration[0]}</p>}
        </div>
        <div>
          <label className="block text-xs text-slate-400 mb-1">Rating (0 - 10)</label>
          <input
            type="number"
            step="0.1"
            name="rating"
            placeholder="8.5"
            className="p-2.5 rounded-lg bg-slate-700 border border-slate-600 w-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.rating && <p className="text-red-400 text-xs mt-1">{errors.rating[0]}</p>}
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-2 py-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-semibold rounded-lg text-sm transition cursor-pointer"
      >
        {loading ? "Menambahkan..." : "Tambah Film"}
      </button>
    </form>
  );
}