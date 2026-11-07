"use client";

import { updateMovie } from "../actions/movie";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function EditMovieForm({ movie }: { movie: any }) {
  const router = useRouter();
  // menampung pesan error Bahasa Indonesia dari zod
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); // Mencegah reload browser & memaksa eksekusi di Client Side
    setErrors({});      // Reset error sebelum submit

    const formData = new FormData(e.currentTarget);
    const res = (await updateMovie(formData)) as any;

    if (res?.success) {
      console.log(res.message);
      toast.success(res.message);

      setTimeout(() => {
        router.push("/movie");
      }, 1200);
    } else {
      if (res?.error) {
        setErrors(res.error); // Simpan pesan error per field
      }
      toast.error("Gagal memperbarui film. Periksa inputanmu!");
    }
  }

  return (
    // Gunakan onSubmit={handleSubmit} dan noValidate
    <form onSubmit={handleSubmit} noValidate className="text-white p-5 bg-slate-800 rounded text-xl flex flex-col gap-4 w-full max-w-2xl">
      <input type="hidden" name="id" defaultValue={movie.id} />
      <div>
        <input type="text" name="title" defaultValue={movie.title} placeholder="Title" className="p-2 rounded bg-slate-700 w-full" />
        {errors.title && <p className="text-red-400 text-sm mt-1">{errors.title[0]}</p>}
      </div>
      <div>
        <input type="text" name="description" defaultValue={movie.description ?? ""} placeholder="Description" className="p-2 rounded bg-slate-700 w-full" />
        {errors.description && <p className="text-red-400 text-sm mt-1">{errors.description[0]}</p>}
      </div>
      <div>
        <input type="text" name="posterUrl" defaultValue={movie.posterUrl} placeholder="Poster URL" className="p-2 rounded bg-slate-700 w-full" />
        {errors.posterUrl && <p className="text-red-400 text-sm mt-1">{errors.posterUrl[0]}</p>}
      </div>
      <div>
        <input 
          type="number" 
          name="rating" 
          defaultValue={movie.rating ?? 0} 
          step="0.1" 
          placeholder="Rating (0-10)" 
          className="p-2 rounded bg-slate-700 w-full" 
        />
        {errors.rating && <p className="text-red-400 text-sm mt-1">{errors.rating[0]}</p>}
      </div>
      <div>
        <input 
          type="number" 
          name="releaseYear" 
          defaultValue={movie.releaseYear ?? 0} 
          placeholder="Release Year (min 1888)" 
          className="p-2 rounded bg-slate-700 w-full" 
        />
        {errors.releaseYear && <p className="text-red-400 text-sm mt-1">{errors.releaseYear[0]}</p>}
      </div>

      <div>
        <input 
          type="number" 
          name="duration" 
          defaultValue={movie.duration ?? 0} 
          placeholder="Duration in minutes (e.g. 120)" 
          className="p-2 rounded bg-slate-700 w-full" 
        />
        {errors.duration && <p className="text-red-400 text-sm mt-1">{errors.duration[0]}</p>}
      </div>

      <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Update Movie
      </button>
    </form>
  );
}