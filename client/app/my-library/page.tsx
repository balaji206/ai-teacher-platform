"use client";

import api
from "@/app/utils/api";

import {
  useEffect,
  useState
}
from "react";

import Sidebar
from "@/app/components/Sidebar";

import Topbar
from "@/app/components/Topbar";

import MobileBottomNav
from "@/app/components/MobileNavbar";

export default function MyLibraryPage() {

  const [
    library,
    setLibrary
  ] = useState<any[]>([]);

  const [
    form,
    setForm
  ] = useState({

     title: "",
     type: ""

  });

  const [
    file,
    setFile
  ] = useState<File | null>(
    null
  );

  const [
  selectedQuiz,
  setSelectedQuiz
] = useState<any>(null);
  // AUTH + FETCH
  useEffect(() => {

    const token =
     localStorage.getItem(
       "token"
     );

    if (!token) {

       window.location.href =
        "/login";

       return;

    }

    fetchLibrary();

  }, []);

  // FETCH LIBRARY
  const fetchLibrary =
   async () => {

    try {

      const response =
       await api.get(
         "/library"
       );

      setLibrary(
        response.data
      );

    } catch (error) {

      console.log(error);

    }

  };

  // UPLOAD MATERIAL
  const uploadMaterial =
   async () => {

    try {

      // FOR NORMAL FILES
      if (
        form.type !== "quiz"
        &&
        !file
      ) return;

      const formData =
       new FormData();

      formData.append(
        "title",
        form.title
      );

      formData.append(
        "type",
        form.type
      );

      // ONLY APPEND FILE IF EXISTS
      if (file) {

         formData.append(
           "file",
           file
         );

      }

      await api.post(

        "/library/upload",

        formData,

        {

          headers: {

             "Content-Type":
              "multipart/form-data"

          }

        }

      );

      setForm({

        title: "",
        type: ""

      });

      setFile(null);

      fetchLibrary();

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div className="min-h-screen bg-[#f5f5f5] p-3">

      <div className="flex gap-3 h-[97vh]">

        <Sidebar />

        <div className="flex-1 flex flex-col">

          <Topbar />

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

              My Library

            </h1>

            <p className="text-gray-500 mt-2">

              Upload and manage materials

            </p>

            {/* UPLOAD FORM */}

            <div className="mt-10 max-w-md space-y-4">

              <input
                type="text"
                placeholder="Title"
                value={form.title}
                onChange={(e)=>

                  setForm({

                    ...form,

                    title:
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
                placeholder="Type"
                value={form.type}
                onChange={(e)=>

                  setForm({

                    ...form,

                    type:
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
                type="file"
                onChange={(e)=>

                  setFile(
                    e.target.files?.[0]
                    || null
                  )

                }
                className="
                  w-full
                  border
                  p-3
                  rounded-xl
                "
              />

              <button
                onClick={uploadMaterial}
                className="
                  bg-black
                  text-white
                  px-6
                  py-3
                  rounded-full
                "
              >

                Upload Material

              </button>

            </div>

            {/* LIBRARY ITEMS */}

            <div
              className="
                grid
                grid-cols-1
                md:grid-cols-2
                xl:grid-cols-3
                gap-5
                mt-12
              "
            >

              {library.map((item:any)=>(

                <div
                  key={item._id}
                  className="
                    bg-[#f8f8f8]
                    rounded-3xl
                    p-6
                    border
                    border-gray-100
                    hover:shadow-xl
                    transition
                  "
                >

                  <h2 className="text-xl font-bold">

                    {item.title}

                  </h2>

                  <p className="text-gray-500 mt-2">

                    Type:
                    {" "}
                    {item.type}

                  </p>

                  <p className="text-gray-500 mt-2">

                    Uploaded By:
                    {" "}
                    {item.uploadedBy}

                  </p>

                  {
                    item.type === "quiz"
                    ? (

                      <button
  className="
    inline-block
    mt-5
    bg-black
    text-white
    px-5
    py-2
    rounded-full
  "
  onClick={()=>

    setSelectedQuiz(
      item.quiz
    )

  }
>

  View Quiz

</button>

                    )
                    : (

                      <a
                        href={`http://localhost:5000/uploads/${item.fileUrl}`}
                        target="_blank"
                        className="
                          inline-block
                          mt-5
                          bg-black
                          text-white
                          px-5
                          py-2
                          rounded-full
                        "
                      >

                        Download

                      </a>

                    )
                  }

                </div>

              ))}

            </div>
{
 selectedQuiz && (

  <div
    className="
      fixed
      inset-0
      bg-black/50
      flex
      items-center
      justify-center
      z-50
    "
  >

    <div
      className="
        bg-white
        w-[90%]
        max-w-2xl
        rounded-3xl
        p-8
        max-h-[85vh]
        overflow-y-auto
      "
    >

      <div className="flex justify-between items-center">

        <h2 className="text-3xl font-bold">

          {selectedQuiz.title}

        </h2>

        <button
          onClick={()=>

            setSelectedQuiz(null)

          }
          className="
            bg-red-500
            text-white
            px-4
            py-2
            rounded-full
          "
        >

          Close

        </button>

      </div>

      <div className="mt-8 space-y-8">

        {selectedQuiz.questions.map(

          (
            q:any,
            index:number
          ) => (

            <div
              key={index}
              className="
                bg-[#f8f8f8]
                rounded-2xl
                p-6
              "
            >

              <p className="font-semibold text-lg">

                {index + 1}.
                {" "}
                {q.question}

              </p>

              <div className="mt-4 space-y-2">

                {q.options.map(

                  (
                    option:string,
                    i:number
                  ) => (

                    <p key={i}>

                      • {option}

                    </p>

                  )

                )}

              </div>

              <p className="mt-5 text-green-600 font-medium">

                Answer:
                {" "}
                {q.answer}

              </p>

            </div>

          )

        )}

      </div>

    </div>

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