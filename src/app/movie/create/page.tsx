import CreateMovieForm from "@/app/component/CreateMovieForm";

export default function CreateMoviePage() {
  return (
    <div className="min-h-screen bg-slate-900 text-white p-8 flex flex-col items-center gap-6">
      <h1 className="text-3xl font-bold">Tambah Movie Baru</h1>
      <CreateMovieForm />
    </div>
  );
}