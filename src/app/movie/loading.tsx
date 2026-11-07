export default function Loading() {
  return (
    <div className="min-h-screen bg-slate-950 p-8 flex flex-col items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-white">Loading...</h1>
        <h2 className="text-lg font-medium text-slate-400">Please wait while we fetch the movies.</h2>
      </div>
    </div>
  );
}