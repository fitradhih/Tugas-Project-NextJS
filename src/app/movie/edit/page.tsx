import prisma from "../../../lib/prisma";
import Link from "next/link";

const page = async () => {
  const movies = await prisma.movie.findMany();

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8 flex flex-col items-center gap-6">
      <h1 className="text-3xl font-bold">Pilih Movie yang Ingin Diedit</h1>
      <div className="w-full max-w-2xl flex flex-col gap-4">
        {movies.map((movie) => (
          <div key={movie.id} className="p-4 bg-slate-800 rounded-lg flex justify-between items-center border border-slate-700">
            <div>
              <h2 className="text-xl font-semibold">{movie.title}</h2>
              <p className="text-slate-400 text-sm">{movie.description ?? "Tidak ada deskripsi"}</p>
            </div>

            <Link
              href={`/movie/${movie.id}/edit`}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md font-medium text-sm transition">
              Edit
            </Link>

            <Link
              href="/movie/create"
              className="fixed bottom-8 right-8 z-50 px-5 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full font-semibold text-sm shadow-lg flex items-center gap-2">
              <span className="text-lg font-bold">+</span> Create Movie
            </Link>
          </div>
        ))}
      </div>

    </div>
  );
};

export default page;