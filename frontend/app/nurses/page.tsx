"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Nurse = {
  id: number;
  name: string;
};

export default function NursesPage() {
  const [nurses, setNurses] = useState<Nurse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadNurses() {
      try {
        const res = await fetch("/api/nurses"); // calls our BFF route
        if (!res.ok) {
          throw new Error("Failed to fetch nurses");
        }
        const data: Nurse[] = await res.json();
        setNurses(data);
      } catch (err: any) {
        setError(err.message ?? "Unknown error");
      } finally {
        setLoading(false);
      }
    }

    loadNurses();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-slate-900">Nurses</h1>
        <Link href="/" className="text-sm text-indigo-700 hover:underline">
          Back to dashboard
        </Link>
      </div>

      <div className="rounded-xl bg-white border border-slate-200 p-4 shadow-sm">
        {loading && (
          <p className="text-center text-slate-500 py-4">Loading nurses...</p>
        )}

        {error && (
          <p className="text-center text-rose-500 py-4">
            Error: {error}
          </p>
        )}

        {!loading && !error && nurses.length === 0 && (
          <p className="text-center text-slate-400 py-4">
            No nurses in the system yet.
          </p>
        )}

        {!loading && !error && nurses.length > 0 && (
          <table className="min-w-full text-base">
            <thead>
              <tr className="border-b bg-slate-50">
                <th className="py-2 px-4 text-left font-medium text-slate-600">
                  ID
                </th>
                <th className="py-2 px-4 text-left font-medium text-slate-600">
                  Name
                </th>
              </tr>
            </thead>
            <tbody>
              {nurses.map((nurse) => (
                <tr key={nurse.id} className="border-b last:border-0">
                  <td className="py-2 px-4 text-slate-800">{nurse.id}</td>
                  <td className="py-2 px-4 text-slate-800">{nurse.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Add Nurse button */}
        <div className="mt-4 flex gap-8">
          <Link
            href="/nurses/addnew"
            className="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700"
          >
            Add Nurse
          </Link>
         {/* Delete Nurse button */}
        
          <Link
            href="/nurses/delete"
            className="inline-flex items-center rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-700"
          >
            Delete Nurse
          </Link>
        </div>
      </div>
    </div>
  );
}