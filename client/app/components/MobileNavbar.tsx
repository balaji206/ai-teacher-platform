"use client";

import Link from "next/link";

import {
  Grid2x2,
  BookOpen,
  Plus,
} from "lucide-react";

export default function MobileBottomNav() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black text-white flex justify-around items-center py-3 rounded-t-3xl md:hidden">

      <Link href="/dashboard">

        <div className="flex flex-col items-center text-xs">

          <Grid2x2 size={18} />

          <p>Home</p>

        </div>

      </Link>

      <Link href="/assignments">

        <div className="flex flex-col items-center text-xs">

          <BookOpen size={18} />

          <p>Assignments</p>

        </div>

      </Link>

      <Link href="/create-assignment">

        <div className="flex flex-col items-center text-xs">

          <Plus size={18} />

          <p>Create</p>

        </div>

      </Link>

    </div>
  );
}