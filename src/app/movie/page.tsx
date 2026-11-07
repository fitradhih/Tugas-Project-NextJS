import prisma from "../../lib/prisma";
import EmptyState from "../component/EmptyState";
import { logout } from "../actions/auth";

const page = async () => {
  const movies = await prisma.movie.findMany();

  if (movies.length === 0) {
    return (
      <div className="min-h-screen bg-slate-950 p-8 flex flex-col items-center justify-center gap-6">
        <EmptyState
          title="No Movies Found"
          description="It looks like there are no movies available at the moment."
        />
        {/* Tetap sediakan tombol Logout saat data kosong */}
        <form action={logout}>
          <button
            type="submit"
            className="px-4 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 border border-red-500/30 rounded-lg text-sm font-semibold transition cursor-pointer"
          >
            Logout
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 p-8 flex flex-col items-center gap-6">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-white">MOVIES</h1>
        <h2 className="text-lg font-medium text-slate-400">List of Movies</h2>
      </div>

      <div className="w-full max-w-7xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="p-5 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-xl text-white text-left flex flex-col justify-between shadow-lg hover:shadow transition duration-200">
            <div className="flex flex-col gap-2">
              <h2 className="text-xl font-bold text-slate-100">{movie.title}</h2>
              <p className="text-sm text-slate-300 line-clamp-3 leading-relaxed">
                {movie.description ?? "Tidak ada deskripsi."}
              </p>
            </div>

            <div className="">
              <p>
                {movie.posterUrl ? (
                  <img
                    src={movie.posterUrl} 
                    alt={movie.title}
                    className="w-full h-auto rounded-md"
                  />
                ) : (
                  <div className="bg-slate-700 border border-slate-600 rounded-md w-full h-full flex items-center justify-center p-4">
                    <span className="text-slate-400">No Image Available</span>
                  </div>
                )}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-700 flex justify-between items-center text-xs text-slate-400 font-medium">
              <span className="bg-amber-800 text-amber-400 px-2.5 py-1 rounded-md border border-amber-600">
                {movie.rating}
              </span>
              <span>{movie.releaseYear}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;