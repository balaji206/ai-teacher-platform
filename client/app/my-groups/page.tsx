"use client";

import api
from "@/app/utils/api";

import {
  useEffect,
  useState
} from "react";

import Sidebar from "@/app/components/Sidebar";
import Topbar from "@/app/components/Topbar";
import MobileBottomNav from "@/app/components/MobileNavbar";

export default function MyGroupsPage() {

  const [
    groups,
    setGroups
  ] = useState<any[]>([]);

  // CREATE GROUP FORM
  const [
    form,
    setForm
  ] = useState({

     name: "",
     subject: ""

  });

  // JOIN GROUP FORM
  const [
    joinForm,
    setJoinForm
  ] = useState({

     joinCode: "",
     name: "",
     email: ""

  });

  useEffect(() => {

    fetchGroups();

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

  // FETCH GROUPS
  const fetchGroups =
   async () => {

    try {

      const response =
       await api.get(
         "/groups"
       );

      setGroups(
        response.data
      );

    } catch (error) {

      console.log(error);

    }

  };

  // CREATE GROUP
  const createGroup =
   async () => {

    try {

      await api.post(
        "/groups",
        form
      );

      setForm({

        name: "",
        subject: ""

      });

      fetchGroups();

    } catch (error) {

      console.log(error);

    }

  };

  // JOIN GROUP
  const joinGroup =
   async () => {

    try {

      await api.post(

        "/groups/join",

        {

          joinCode:
           joinForm.joinCode,

          student: {

             name:
              joinForm.name,

             email:
              joinForm.email

          }

        }

      );

      setJoinForm({

        joinCode: "",
        name: "",
        email: ""

      });

      fetchGroups();

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

          <div className="flex-1 bg-white rounded-2xl shadow-md mt-4 p-6 overflow-y-auto">

            <h1 className="text-3xl font-bold">

              My Groups

            </h1>

            <p className="text-gray-500 mt-2">

              Manage your class groups

            </p>

            {/* CREATE GROUP */}

            <div className="mt-10 max-w-md space-y-4">

              <h2 className="text-2xl font-bold">

                Create Group

              </h2>

              <input
                type="text"
                placeholder="Group Name"
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
                type="text"
                placeholder="Subject"
                value={form.subject}
                onChange={(e)=>

                  setForm({

                    ...form,

                    subject:
                     e.target.value

                  })

                }
                className="w-full border p-3 rounded-xl"
              />

              <button
                onClick={createGroup}
                className="bg-black text-white px-6 py-3 rounded-full"
              >

                Create Group

              </button>

            </div>

            {/* JOIN GROUP */}

            <div className="mt-12 max-w-md space-y-4">

              <h2 className="text-2xl font-bold">

                Join Group

              </h2>

              <input
                type="text"
                placeholder="Join Code"
                value={joinForm.joinCode}
                onChange={(e)=>

                  setJoinForm({

                    ...joinForm,

                    joinCode:
                     e.target.value

                  })

                }
                className="w-full border p-3 rounded-xl"
              />

              <input
                type="text"
                placeholder="Name"
                value={joinForm.name}
                onChange={(e)=>

                  setJoinForm({

                    ...joinForm,

                    name:
                     e.target.value

                  })

                }
                className="w-full border p-3 rounded-xl"
              />

              <input
                type="email"
                placeholder="Email"
                value={joinForm.email}
                onChange={(e)=>

                  setJoinForm({

                    ...joinForm,

                    email:
                     e.target.value

                  })

                }
                className="w-full border p-3 rounded-xl"
              />

              <button
                onClick={joinGroup}
                className="bg-blue-600 text-white px-6 py-3 rounded-full"
              >

                Join Group

              </button>

            </div>

            {/* GROUPS */}

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mt-12">

              {groups.map((group: any) => (

                <div
                  key={group._id}
                  className="bg-[#f8f8f8] rounded-3xl p-6 border border-gray-100 hover:shadow-xl transition"
                >

                  <h2 className="text-xl font-bold">

                    {group.name}

                  </h2>

                  <p className="text-gray-500 mt-2">

                    Subject:
                    {" "}
                    {group.subject}

                  </p>

                  <p className="text-gray-500 mt-2">

                    Join Code:
                    {" "}
                    {group.joinCode}

                  </p>

                  <p className="text-gray-500 mt-2">

                    Students:
                    {" "}
                    {group.students.length}

                  </p>

                  {/* STUDENTS */}

                  <div className="mt-4 space-y-2">

                    {
  group.students
   ?.filter(
     (student:any) => student
   )
   .map(

    (
      student:any,
      index:number
    ) => (

      <div
        key={index}
        className="bg-white rounded-xl p-3"
      >

        <p className="font-medium">

          {student?.name || "No Name"}

        </p>

        <p className="text-sm text-gray-500">

          {student?.email || "No Email"}

        </p>

      </div>

    )

   )
}

                  </div>

                </div>

              ))}

            </div>

          </div>

        </div>

      </div>

      <MobileBottomNav />

    </div>

  );

}