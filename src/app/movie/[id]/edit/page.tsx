import prisma from "../../../../lib/prisma";
import { notFound } from "next/navigation";
import DeleteButton from "@/app/component/page";
import EditMovieForm from "@/app/component/EditMovieForm";

const EditMovie = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const movieId = Number(id);

  if (Number.isNaN(movieId)) notFound();

  const movie = await prisma.movie.findUnique({
    where: {
      id: movieId,
    },
  });

  if (!movie) notFound();

  return (
    <div className="p-8 bg-slate-900 min-h-screen flex flex-col items-center gap-4">
      <h1 className="text-3xl font-bold text-white">Edit Movies</h1>
      
      <EditMovieForm movie={movie} />

      <div className="mt-4">
        <DeleteButton id={movie.id} title={movie.title} />
      </div>
    </div>
    
  );
};



export default EditMovie;