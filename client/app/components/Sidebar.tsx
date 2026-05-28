"use client";

import Link from "next/link";
import { useEffect,useState } from "react";
import {
  BookOpen,
  Folder,
  Grid2x2,
  Library,
  Settings,
  Plus,
} from "lucide-react";

export default function Sidebar() {
  const [
  teacher,
  setTeacher
] = useState<any>(null);

useEffect(() => {

 const storedTeacher =
  localStorage.getItem(
    "teacher"
  );

 if (storedTeacher) {

    setTeacher(
      JSON.parse(
        storedTeacher
      )
    );

 }

}, []);
  return (
    <div className="hidden md:flex w-[260px] bg-white rounded-2xl shadow-md p-4 flex-col justify-between">

      <div>

        {/* LOGO */}
        <div className="flex items-center gap-2 mb-8">

          <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center text-white font-bold text-xl">
            V
          </div>

          <h1 className="text-3xl font-bold">
            VedaAI
          </h1>

        </div>

        {/* BUTTON */}
        <Link href="/create-assignment">

          <button className="w-full bg-black text-white py-3 rounded-full flex items-center justify-center gap-2">

            <Plus size={18} />

            Create Assignment

          </button>

        </Link>

        {/* MENU */}
        <div className="mt-10 space-y-2">

          <Link href="/dashboard">

            <div className="flex items-center gap-3 text-gray-500 px-4 py-3 rounded-xl hover:bg-gray-100">

              <Grid2x2 size={18} />

              <p>Home</p>

            </div>

          </Link>

          <Link href="/my-groups">
          <div className="flex items-center gap-3 text-gray-500 px-4 py-3 rounded-xl hover:bg-gray-100">

            <Folder size={18} />

            <p>My Groups</p>

          </div>
          </Link>

          <Link href="/assignments">

            <div className="flex items-center gap-3 text-gray-500 px-4 py-3 rounded-xl hover:bg-gray-100">

              <BookOpen size={18} />

              <p>Assignments</p>

            </div>

          </Link>

          <Link href="/ai-teacher-toolkit">
          <div className="flex items-center gap-3 text-gray-500 px-4 py-3 rounded-xl hover:bg-gray-100">

            <Library size={18} />

            <p>AI Teacher Toolkit</p>

          </div>
          </Link>

        </div>

      </div>

      {/* BOTTOM */}
      <div>

        <Link href="/settings">
        <div className="flex items-center gap-3 text-gray-500 px-4 py-3 rounded-xl hover:bg-gray-100">

          <Settings size={18} />

          <p>Settings</p>

        </div>
        </Link>

      </div>

    </div>
  );
}