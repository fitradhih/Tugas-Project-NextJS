import prisma from "../../lib/prisma";

const ShowsPage = async () => {
  const shows = await prisma.shows.findMany();

  return (
    <div className="min-h-screen flex flex-col items-center gap-3 p-2 text-center">
      <h1 className="text-3xl font-bold text-white">SHOWS</h1>
      <h2 className="text-xl font-semibold text-slate-400">List of Shows Series</h2>
      <div className="flex gap-4 p-4 bg-slate-800 rounded text-white text-left">
        {shows.map((show) => (
          <div key={show.id}>
            <h2>{show.title}</h2>
            <p>{show.description}</p>
            <p>Rating: {show.rating}</p>
            <p>Release Year: {show.releaseYear}</p>
            <p>Total Seasons: {show.totalSeasons}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowsPage;