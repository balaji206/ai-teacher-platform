"use client";

import {
 useState
}
from "react";

import api
from "@/app/utils/api";

export default function LoginPage() {

 const [
   form,
   setForm
 ] = useState({

    email: "",
    password: ""

 });

 const [
   loading,
   setLoading
 ] = useState(false);

 const login =
  async () => {

   try {

      setLoading(true);

      const response =
       await api.post(

         "http://localhost:5000/auth/login",

         form

       );

      // SAVE TOKEN
      localStorage.setItem(

        "token",

        response.data.token

      );

      // SAVE TEACHER
      localStorage.setItem(

        "teacher",

        JSON.stringify(
          response.data.teacher
        )

      );

      // REDIRECT
      window.location.href =
       "/dashboard";

   } catch (error) {

      console.log(error);

      alert(
        "Login Failed"
      );

   } finally {

      setLoading(false);

   }

 };

 return (

  <div className="min-h-screen flex items-center justify-center bg-[#f5f5f5]">

   <div className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-md">

    <h1 className="text-3xl font-bold text-center">

      Teacher Login

    </h1>

    <p className="text-gray-500 text-center mt-2">

      Login to continue

    </p>

    <div
  className="
    mt-6
    bg-[#f8f8f8]
    border
    border-gray-200
    rounded-2xl
    p-4
  "
>

  <p className="font-semibold text-sm">

    Demo Account

  </p>

  <div className="mt-3 space-y-1 text-sm text-gray-600">

    <p>

      Email:
      {" "}
      <span className="font-medium text-black">

        teacher@vedaai.com

      </span>

    </p>

    <p>

      Password:
      {" "}
      <span className="font-medium text-black">

        123456

      </span>

    </p>

  </div>

</div>
    <div className="mt-8 space-y-4">

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
        className="w-full border p-3 rounded-xl"
      />

      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e)=>

          setForm({

             ...form,

             password:
              e.target.value

          })

        }
        className="w-full border p-3 rounded-xl"
      />

      <button
        onClick={login}
        className="w-full bg-black text-white py-3 rounded-xl"
      >

        {
          loading
          ? "Logging in..."
          : "Login"
        }

      </button>

      <p className="text-center text-sm text-gray-500">

        Don't have an account?

        <a
          href="/signup"
          className="text-black font-semibold ml-1"
        >

          Signup

        </a>

      </p>

    </div>

   </div>

  </div>

 );

}