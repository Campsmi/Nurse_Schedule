"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AddNewNursePage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError("Name is required");
      return;
    }

    try {
      setSubmitting(true);

      const res = await fetch("/api/nurses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to create nurse");
      }

      router.push("/nurses");
      router.refresh();
    } catch (err: any) {
      setError(err.message ?? "Unknown error");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-indigo-800">Add New Nurse</h1>

      <div className="rounded-xl bg-white border border-slate-200 p-6 shadow-sm max-w-md">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-base font-medium text-indigo-800">
              Name
            </label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border border-slate-600 px-3 py-2 text-base text-indigo-900 placeholder-indigo-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Alice Johnson"
            />
          </div>

          {error && (
            <p className="text-sm text-rose-600">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-base font-semibold text-white shadow-sm hover:bg-indigo-700 disabled:opacity-60"
          >
            {submitting ? "Saving..." : "Save Nurse"}
          </button>
        </form>
      </div>

      <Link href="/nurses" className="text-indigo-700 hover:underline">
        ← Back to nurses
      </Link>
    </div>
  );
}
