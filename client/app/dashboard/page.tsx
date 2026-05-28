"use client";

import Link from "next/link";

import api
from "@/app/utils/api";

import {
  useEffect,
  useState
} from "react";

import {
  Bell,
  BookOpen,
  Folder,
  Grid2x2,
  Library,
  Settings,
  Plus,
  Menu,
} from "lucide-react";

export default function DashboardPage() {
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
  const [
    assignments,
    setAssignments
  ] = useState<any[]>([]);

  useEffect(() => {

    fetchAssignments();

  }, []);
useEffect(() => {

 const token =
  localStorage.getItem(
    "token"
  );

 if (!token) {

    window.location.href =
     "/login";

 }

}, []);
  const fetchAssignments =
   async () => {

    try {

      const response =
       await api.get(
         "/assignments"
       );

      setAssignments(
        response.data
      );

    } catch (error) {

      console.log(error);

    }

  };
  

  return (

    <div className="min-h-screen bg-[#f5f5f5] p-2 md:p-3">

      <div className="flex gap-3 h-[97vh]">

        {/* SIDEBAR */}
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

            {/* CREATE BUTTON */}
            <Link href="/create-assignment">

              <button className="w-full bg-black text-white py-3 rounded-full flex items-center justify-center gap-2 hover:bg-gray-800 transition">

                <Plus size={18} />

                Create Assignment

              </button>

            </Link>

            {/* MENU */}
            <div className="mt-10 space-y-2">

              <div className="flex items-center gap-3 bg-gray-100 text-black px-4 py-3 rounded-xl">

                <Grid2x2 size={18} />

                <p className="font-medium">

                  Home

                </p>

              </div>

              <Link href="/my-groups">

                <div className="flex items-center gap-3 text-gray-500 px-4 py-3 rounded-xl hover:bg-gray-100 cursor-pointer">

                  <Folder size={18} />

                  <p>My Groups</p>

                </div>

              </Link>

              <Link href="/assignments">

                <div className="flex items-center gap-3 text-gray-500 px-4 py-3 rounded-xl hover:bg-gray-100 cursor-pointer">

                  <BookOpen size={18} />

                  <p>Assignments</p>

                </div>

              </Link>

              <Link href="/ai-teacher-toolkit">

                <div className="flex items-center gap-3 text-gray-500 px-4 py-3 rounded-xl hover:bg-gray-100 cursor-pointer">

                  <Library size={18} />

                  <p>AI Teacher Toolkit</p>

                </div>

              </Link>

              <Link href="/my-library">

                <div className="flex items-center gap-3 text-gray-500 px-4 py-3 rounded-xl hover:bg-gray-100 cursor-pointer">

                  <BookOpen size={18} />

                  <p>My Library</p>

                </div>

              </Link>

            </div>

          </div>

          {/* BOTTOM */}
          <div>

            <Link href="/settings">

              <div className="flex items-center gap-3 text-gray-500 px-4 py-3 rounded-xl hover:bg-gray-100 cursor-pointer">

                <Settings size={18} />

                <p>Settings</p>

              </div>

            </Link>

            {/* SCHOOL CARD */}
            <div className="bg-gray-100 rounded-2xl p-3 mt-4 flex items-center gap-3">

              <img
            src="https://img.magnific.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740&q=80"
            alt="user"
            className="w-9 h-9 rounded-full"
          />

              <div>

                <h2 className="font-semibold text-sm">

                  {
 teacher?.schoolName
 || "School Name"
}

                </h2>

                <p className="text-xs text-gray-500">

                  {
 teacher?.schoolLocation
 || "School Location"
}

                </p>

              </div>

            </div>

          </div>

        </div>

        {/* MAIN */}
        <div className="flex-1 flex flex-col">

          {/* TOPBAR */}
          <div className="bg-white rounded-2xl shadow-md px-4 md:px-6 py-4 flex items-center justify-between">

            <div className="flex items-center gap-3">

              <button className="md:hidden">

                <Menu size={24} />

              </button>

              <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">

                ←

              </button>

              <h1 className="text-sm md:text-lg font-semibold">

                Dashboard

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

  <div className="hidden md:flex flex-col">

    <p className="font-semibold text-sm">

      {
        teacher
        ? teacher.name
        : "Teacher"
      }

    </p>

    <p className="text-xs text-gray-500">

      {
        teacher
        ? teacher.email
        : ""
      }

    </p>

  </div>

  <button
    onClick={logout}
    className="
      hover:bg-gray-100
      p-2
      rounded-full
      transition
    "
  >

    <img
      src="/logout.png"
      className="w-5 h-5"
      alt="logout"
    />

  </button>

</div>

            </div>

          </div>

          {/* DASHBOARD CONTENT */}
          <div className="flex-1 bg-white rounded-2xl shadow-md mt-3 p-5 overflow-y-auto">

            {assignments.length === 0 ? (

              <div className="h-full flex items-center justify-center">

                <div className="text-center max-w-md">

                  <img
                    src="https://cdn-icons-png.flaticon.com/512/7486/7486740.png"
                    alt="empty"
                    className="w-40 md:w-56 mx-auto"
                  />

                  <h2 className="text-xl md:text-2xl font-bold mt-6">

                    No assignments yet

                  </h2>

                  <p className="text-gray-500 mt-3 text-sm md:text-base">

                    Create your first assignment
                    to start collecting and grading
                    student submissions.

                  </p>

                </div>

              </div>

            ) : (

              <div>

                <div className="flex justify-between items-center mb-6">

                  <div>

                    <h1 className="text-2xl font-bold">

                      Assignments

                    </h1>

                    <p className="text-gray-500 mt-1">

                      Manage your generated assessments

                    </p>

                  </div>

                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">

                  {assignments.map(
                    (assignment: any) => (

                      <Link
                        key={assignment._id}
                        href={`/assignment/${assignment._id}`}
                      >

                        <div className="bg-[#f8f8f8] rounded-3xl p-6 hover:shadow-xl transition cursor-pointer border border-gray-100">

                          <div className="flex justify-between items-start">

                            <h2 className="text-xl font-bold">

                              {assignment.title}

                            </h2>

                            <div className="w-2 h-2 rounded-full bg-green-500"></div>

                          </div>

                          <div className="mt-5 space-y-2 text-sm text-gray-600">

                            <p>

                              Due:
                              {" "}
                              {assignment.dueDate}

                            </p>

                            <p>

                              Questions:
                              {" "}
                              {assignment.numberOfQuestions}

                            </p>

                            <p>

                              Total Marks:
                              {" "}
                              {assignment.totalMarks}

                            </p>

                          </div>

                          <div className="mt-5">

                            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">

                              {assignment.status}

                            </span>

                          </div>

                        </div>

                      </Link>

                    )
                  )}

                </div>

              </div>

            )}

          </div>

        </div>

      </div>

      {/* MOBILE NAV */}
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

    </div>

  );

}