"use client";

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

import api
from "@/app/utils/api";

interface Notification {

  title: string;

  message: string;

  time: string;

  type: string;

}

export default function NotificationsPage() {

  const [
    notifications,
    setNotifications
  ] = useState<Notification[]>([]);

  const [
    loading,
    setLoading
  ] = useState(true);

  // AUTH CHECK
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

  // FETCH DATA
  useEffect(() => {

    fetchNotifications();

  }, []);

  const fetchNotifications =
   async () => {

    try {

      // FETCH ASSIGNMENTS
      const assignmentRes =
       await api.get(
         "/assignments"
       );

      // FETCH GROUPS
      const groupRes =
       await api.get(
         "/groups"
       );

      // FETCH LIBRARY
      const libraryRes =
       await api.get(
         "/library"
       );

      const assignmentNotifications =
       assignmentRes.data.map(
        (assignment:any) => ({

          title:
           "New Assignment Created",

          message:
           `${assignment.title} assignment has been generated successfully.`,

          time:
           new Date(
             assignment.createdAt
           ).toLocaleDateString(),

          type:
           "assignment"

        })
       );

      const groupNotifications =
       groupRes.data.map(
        (group:any) => ({

          title:
           "Group Activity",

          message:
           `${group.name} group is active with ${group.students?.length || 0} students.`,

          time:
           new Date(
             group.createdAt
           ).toLocaleDateString(),

          type:
           "group"

        })
       );

      const libraryNotifications =
       libraryRes.data.map(
        (item:any) => ({

          title:
           "Library Updated",

          message:
           `${item.title} has been uploaded to your library.`,

          time:
           new Date(
             item.createdAt
           ).toLocaleDateString(),

          type:
           "library"

        })
       );

      // COMBINE
      const combined = [

        ...assignmentNotifications,

        ...groupNotifications,

        ...libraryNotifications

      ];

      setNotifications(
        combined.reverse()
      );

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  const getColor =
   (type:string) => {

    switch(type) {

      case "assignment":
        return "bg-black";

      case "group":
        return "bg-orange-500";

      case "library":
        return "bg-green-500";

      default:
        return "bg-blue-500";

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

        {/* SIDEBAR */}
        <Sidebar />

        {/* MAIN */}
        <div className="flex-1 flex flex-col">

          {/* TOPBAR */}
          <Topbar />

          {/* CONTENT */}
          <div className="flex-1 bg-white rounded-2xl shadow-md mt-4 p-6 overflow-y-auto">

            {/* HEADER */}
            <div className="flex items-center justify-between">

              <div>

                <h1 className="text-3xl font-bold">

                  Notifications

                </h1>

                <p className="text-gray-500 mt-2">

                  Stay updated with assignments and activities

                </p>

              </div>

              <button
                className="
                  bg-black
                  text-white
                  px-5
                  py-2
                  rounded-full
                "
              >

                Notifications

              </button>

            </div>

            {/* EMPTY STATE */}
            {
              notifications.length === 0
              ? (

                <div className="h-full flex items-center justify-center">

                  <div className="text-center">

                    <img
                      src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
                      className="w-40 mx-auto"
                      alt="empty"
                    />

                    <h2 className="text-2xl font-bold mt-5">

                      No Notifications

                    </h2>

                    <p className="text-gray-500 mt-2">

                      Notifications will appear here

                    </p>

                  </div>

                </div>

              )
              : (

                <div className="mt-8 space-y-5">

                  {
                    notifications.map(

                      (
                        notification,
                        index
                      ) => (

                        <div
                          key={index}
                          className="
                            bg-gray-100
                            rounded-2xl
                            p-5
                            flex
                            items-start
                            gap-4
                            hover:shadow-md
                            transition
                          "
                        >

                          <div
                            className={`
                              w-12
                              h-12
                              rounded-full
                              text-white
                              flex
                              items-center
                              justify-center
                              font-bold
                              ${getColor(notification.type)}
                            `}
                          >

                            {
                              notification.title[0]
                            }

                          </div>

                          <div className="flex-1">

                            <div className="flex items-center justify-between">

                              <h2 className="font-semibold text-lg">

                                {notification.title}

                              </h2>

                              <p className="text-sm text-gray-500">

                                {notification.time}

                              </p>

                            </div>

                            <p className="text-gray-600 mt-2">

                              {notification.message}

                            </p>

                          </div>

                        </div>

                      )

                    )
                  }

                </div>

              )
            }

          </div>

        </div>

      </div>

      {/* MOBILE NAV */}
      <MobileBottomNav />

    </div>

  );

}