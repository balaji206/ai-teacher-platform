"use client";

import {
 useState
}
from "react";

import api
from "@/app/utils/api";

export default function SignupPage() {

const [
 form,
 setForm
] = useState({

  name:"",

  email:"",

  password:"",

  schoolName:"",

  schoolLocation:""

});

 const [
   loading,
   setLoading
 ] = useState(false);

 const signup =
  async () => {

   try {

      setLoading(true);

      const response =
       await api.post(

         "/auth/signup",

         form

       );

      // SAVE TOKEN
      localStorage.setItem(

        "token",

        response.data.token

      );

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
        "Signup Failed"
      );

   } finally {

      setLoading(false);

   }

 };

 return (

  <div className="min-h-screen flex items-center justify-center bg-[#f5f5f5]">

   <div className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-md">

    <h1 className="text-3xl font-bold text-center">

      Teacher Signup

    </h1>

    <p className="text-gray-500 text-center mt-2">

      Create your account

    </p>

    <div className="mt-8 space-y-4">

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
        className="w-full border p-3 rounded-xl"
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
      <input
 type="text"
 placeholder="School Name"
 value={form.schoolName}
 onChange={(e)=>

  setForm({

    ...form,

    schoolName:
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
 type="text"
 placeholder="School Location"
 value={form.schoolLocation}
 onChange={(e)=>

  setForm({

    ...form,

    schoolLocation:
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
        onClick={signup}
        className="w-full bg-black text-white py-3 rounded-xl"
      >

        {
          loading
          ? "Creating..."
          : "Signup"
        }

      </button>

      <p className="text-center text-sm text-gray-500">

        Already have an account?

        <a
          href="/login"
          className="text-black font-semibold ml-1"
        >

          Login

        </a>

      </p>

    </div>

   </div>

  </div>

 );

}