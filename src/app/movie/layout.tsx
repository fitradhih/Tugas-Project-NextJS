import Navbar from "@/app/component/Navbar";
import Footer from "@/app/component/Footer";

export default function MovieLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-between">
      {/* Header / Navbar */}
      <Navbar />

      {/* Konten Utama */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <Footer />
    </div>
  );
}