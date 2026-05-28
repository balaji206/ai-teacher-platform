"use client";

import {
 useEffect
}
from "react";

export default function HomePage() {

 useEffect(() => {

   const token =
    localStorage.getItem(
      "token"
    );

   // IF LOGGED IN
   if (token) {

      window.location.href =
       "/dashboard";

   }

   // IF NOT LOGGED IN
   else {

      window.location.href =
       "/login";

   }

 }, []);

 return null;

}