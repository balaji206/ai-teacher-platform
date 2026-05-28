"use client";
import { useEffect, useState } from "react";
import { Bell, Menu } from "lucide-react";
import Link from "next/link";
export default function Topbar() {
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
  const logout = () => {

 localStorage.removeItem(
   "token"
 );

 localStorage.removeItem(
   "teacher"
 );

 window.location.href =
  "/login";

};
  return (
    <div className="bg-white rounded-2xl shadow-md px-4 md:px-6 py-4 flex items-center justify-between">

      <div className="flex items-center gap-3">

        <button className="md:hidden">

          <Menu size={24} />

        </button>
        <Link href='/dashboard'>
        <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">

          ←

        </button>
        </Link>

        <h1 className="text-sm md:text-lg font-semibold">
          Assignment
        </h1>

      </div>

      <div className="flex items-center gap-5">
        <Link href="/notifications">
        <div className="relative">

          <Bell size={22} />

          <div className="w-2 h-2 bg-red-500 rounded-full absolute top-0 right-0"></div>

        </div>
        </Link>

        <div className="flex items-center gap-3">

          <img
            src="https://img.magnific.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740&q=80"
            alt="user"
            className="w-9 h-9 rounded-full"
          />

          <p className="hidden md:block text-sm font-medium">
            {
 teacher
 ? teacher.name
 : "Teacher"
}
          </p>
          <button
 onClick={logout}
>

 <img src="/logout.png"className="w-5 h-5 " alt="logout" />

</button>
        </div>

      </div>

    </div>
  );
}