import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { Figtree } from "next/font/google";
import { cn } from "@/lib/utils";

const figtree = Figtree({ subsets: ['latin'], variable: '--font-sans' });

export const metadata = {
  title: "Aplikasi Next.js Saya",
  description: "Tugas System Routing Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={cn("font-sans", figtree.variable)}>
      <body className="antialiased bg-slate-50 text-slate-900">
        {children}
        <Toaster position="top-right" richColors /> 
      </body>
    </html>
  );
}