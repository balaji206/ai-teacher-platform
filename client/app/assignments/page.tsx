"use client";

import {
 useEffect,
 useState
}
from "react";

import api
from "@/app/utils/api";

import Sidebar from "@/app/components/Sidebar";
import Topbar from "@/app/components/Topbar";
import MobileBottomNav from "@/app/components/MobileNavbar";
import AssignmentCard from "@/app/components/AssignmentCard";

export default function AssignmentsPage() {

 const [
   assignments,
   setAssignments
 ] = useState<any[]>([]);

 const [
   loading,
   setLoading
 ] = useState(true);

useEffect(() => {

 const token =
  localStorage.getItem(
    "token"
  );

 // IF NO TOKEN
 if (!token) {

    window.location.href =
     "/login";

    return;

 }

 // FETCH ASSIGNMENTS
 fetchAssignments();

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

   } finally {

      setLoading(false);

   }

 };

 if (loading) {

   return (

    <div className="h-screen flex items-center justify-center">

      Loading...

    </div>

   );

 }

 return (

  <div className="min-h-screen bg-[#f5f5f5] p-3">

    <div className="flex gap-3 h-[97vh]">

      <Sidebar />

      <div className="flex-1 flex flex-col">

        <Topbar />

        <div className="mt-4 overflow-y-auto">

          <div className="flex items-center justify-between">

            <div>

              <h1 className="text-3xl font-bold">

                Assignments

              </h1>

              <p className="text-gray-500 mt-1">

                View your created assignments

              </p>

            </div>

            <a
              href="/create-assignment"
              className="
                bg-black
                text-white
                px-6
                py-3
                rounded-full
              "
            >

              Create Assignment

            </a>

          </div>

          {/* EMPTY STATE */}

          {
            assignments.length === 0
            ? (

              <div
                className="
                  bg-white
                  rounded-3xl
                  shadow-md
                  p-10
                  mt-10
                  text-center
                "
              >

                <h2 className="text-2xl font-bold">

                  No Assignments Yet

                </h2>

                <p className="text-gray-500 mt-3">

                  Start by creating your first assignment

                </p>

              </div>

            )
            : (

              <div
                className="
                  grid
                  grid-cols-1
                  md:grid-cols-2
                  xl:grid-cols-3
                  gap-5
                  mt-8
                "
              >

                {assignments.map(

                  (
                    assignment:any
                  ) => (

                    <AssignmentCard
                      key={assignment._id}

                      id={assignment._id}

                      title={assignment.title}

                      assignedDate={
                        new Date(
                          assignment.createdAt
                        )
                        .toLocaleDateString()
                      }

                      dueDate={
                        new Date(
                          assignment.dueDate
                        )
                        .toLocaleDateString()
                      }
                    />

                  )

                )}

              </div>

            )
          }

        </div>

      </div>

    </div>

    <MobileBottomNav />

  </div>

 );

}