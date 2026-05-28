"use client";

import {
 useState
}
from "react";
import { useEffect } from "react";
import api
from "@/app/utils/api";

import Sidebar
from "@/app/components/Sidebar";

import Topbar
from "@/app/components/Topbar";

import MobileBottomNav
from "@/app/components/MobileNavbar";
export default function SettingsPage() {

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
const [
  teacher,
  setTeacher
] = useState<any>(null);

const [
 form,
 setForm
] = useState({

   name: "",

   email: "",

   password: ""

});
useEffect(() => {

 const storedTeacher =
  localStorage.getItem(
    "teacher"
  );

 if (storedTeacher) {

    const parsedTeacher =
     JSON.parse(
       storedTeacher
     );

    setTeacher(
      parsedTeacher
    );

    setForm({

      name:
       parsedTeacher.name || "",

      email:
       parsedTeacher.email || "",

      password: ""

    });

 }

}, []);
 const updateProfile =
  async () => {

   try {

      const response =
       await api.put(

         "/teacher/profile",

         form

       );

      // UPDATE LOCAL STORAGE
      localStorage.setItem(

        "teacher",

        JSON.stringify(
          response.data.teacher
        )

      );

      alert(
        "Profile Updated"
      );
      window.location.href =
 "/dashboard";

   } catch (error) {

      console.log(error);

   }

 };

 return (

  <div className="min-h-screen bg-[#f5f5f5] p-3">

    <div className="flex gap-3 h-[97vh]">

      {/* SIDEBAR */}
      <Sidebar />

      <div className="flex-1 flex flex-col">

        {/* TOPBAR */}
        <Topbar />

        {/* CONTENT */}
        <div
          className="
            flex-1
            bg-white
            rounded-2xl
            shadow-md
            mt-4
            p-6
            overflow-y-auto
          "
        >

          <h1 className="text-3xl font-bold">

            Settings

          </h1>

          <p className="text-gray-500 mt-2">

            Manage your profile settings

          </p>

          <div className="mt-10 max-w-md space-y-4">

            <input
              type="text"
              placeholder="Name"
              value={form.name}
              onChange={(e)=>

               setForm({

                 ...form,

                 name:
                  e.target.value

               })

              }
              className="
                w-full
                border
                p-3
                rounded-xl
              "
            />

            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e)=>

               setForm({

                 ...form,

                 email:
                  e.target.value

               })

              }
              className="
                w-full
                border
                p-3
                rounded-xl
              "
            />

            <input
              type="password"
              placeholder="New Password"
              value={form.password}
              onChange={(e)=>

               setForm({

                 ...form,

                 password:
                  e.target.value

               })

              }
              className="
                w-full
                border
                p-3
                rounded-xl
              "
            />

            <button
              onClick={updateProfile}
              className="
                bg-black
                text-white
                px-6
                py-3
                rounded-xl
              "
            >

              Save Changes

            </button>

          </div>

        </div>

      </div>

    </div>

    {/* MOBILE NAVBAR */}
    <MobileBottomNav />

  </div>

);

}