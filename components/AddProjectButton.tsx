"use client";

import Link from "next/link";

export default function AddProjectButton() {
  return (
    <div className="flex items-center text-white">
      <Link
        href="/projects/create"
        className="flex-shrink-0 whitespace-nowrap px-6 py-2 border rounded bg-blue-600 text-white hover:bg-blue-700 transition"
      >
        Add Project
      </Link>
    </div>
  );
}
