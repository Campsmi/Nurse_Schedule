// app/nurses/page.tsx
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
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [deleting, setDeleting] = useState(false);

  // Load nurses
  useEffect(() => {
    async function loadNurses() {
      try {
        const res = await fetch("/api/nurses");
        if (!res.ok) throw new Error("Failed to fetch nurses");
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

  function toggleSelect(id: number, checked: boolean) {
    setSelectedIds((prev) =>
      checked ? [...prev, id] : prev.filter((x) => x !== id)
    );
  }

  function toggleSelectAll(checked: boolean) {
    if (checked) {
      setSelectedIds(nurses.map((n) => n.id));
    } else {
      setSelectedIds([]);
    }
  }

  async function handleDeleteSelected() {
    setError(null);

    if (selectedIds.length === 0) {
      setError("Please select at least one nurse to delete.");
      return;
    }


    try {
      setDeleting(true);

      // Delete one by one (simple and fine for small datasets)
      for (const id of selectedIds) {
        const res = await fetch(`/api/nurses/${id}`, {
          method: "DELETE",
        });

        const data = await res.json().catch(() => ({}));

        if (!res.ok) {
          throw new Error(data.detail || data.error || `Failed to delete nurse ${id}`);
        }
      }

      // Update UI: remove deleted nurses from state
      setNurses((prev) => prev.filter((n) => !selectedIds.includes(n.id)));
      setSelectedIds([]);
    } catch (err: any) {
      setError(err.message ?? "Unknown error");
    } finally {
      setDeleting(false);
    }
  }

  const allSelected =
    nurses.length > 0 && selectedIds.length === nurses.length;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-slate-900">Nurses</h1>

      <div className="rounded-xl bg-white border border-slate-200 p-4 shadow-sm">
        {loading && (
          <p className="text-center text-slate-500 py-4">Loading nurses...</p>
        )}

        {error && (
          <p className="text-center text-rose-500 py-2">{error}</p>
        )}

        {!loading && !error && nurses.length === 0 && (
          <p className="text-center text-slate-400 py-4">
            No nurses in the system yet.
          </p>
        )}

        {!loading && !error && nurses.length > 0 && (
          <>
            <table className="min-w-full text-base mb-4">
              <thead>
                <tr className="border-b bg-slate-50">
                  <th className="py-2 px-2 text-left">
                    <input
                      type="checkbox"
                      checked={allSelected}
                      onChange={(e) => toggleSelectAll(e.target.checked)}
                    />
                  </th>
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
                    <td className="py-2 px-2">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(nurse.id)}
                        onChange={(e) =>
                          toggleSelect(nurse.id, e.target.checked)
                        }
                      />
                    </td>
                    <td className="py-2 px-4 text-slate-800">{nurse.id}</td>
                    <td className="py-2 px-4 text-slate-800">{nurse.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Buttons under the table */}
            <div className="flex gap-4">
              <Link
                href="/nurses/addnew"
                className="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700"
              >
                Add Nurse
              </Link>

              <button
                onClick={handleDeleteSelected}
                disabled={deleting || selectedIds.length === 0}
                className="inline-flex items-center rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-700 disabled:opacity-60"
              >
                {deleting
                  ? "Deleting..."
                  : selectedIds.length === 0
                  ? "Delete"
                  : `Delete ${selectedIds.length} selected`}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
