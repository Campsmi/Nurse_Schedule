import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nurse Shift Manager",
  description: "Manager dashboard for nurse shifts and trades",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">  
      <body className="min-h-screen bg-slate-50">
        {/* Top bar */}
        <header className="border-b border-indigo-300 bg-indigo-100">
          <div className="flex items-center justify-between px-4 py-3">
            <div>
              <h1 className="text-2xl font-semibold text-indigo-900">
                Nurse Manager
              </h1>
              <p className="text-base text-indigo-800 ">
                Department Manager Dashboard
              </p>
            </div>

            <nav className="flex items-center gap-10 text-base text-indigo-900">
              <a href="/">Home</a>
              <a href="/nurses">Nurses</a>
              <a href="/shifts">Shifts</a>
              <a href="/trades">Shift trades</a>
            </nav>
          </div>
        </header>

        {/* Page content */}
        <main className="px-4 py-6 bg-indigo-50 min-h-screen">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}