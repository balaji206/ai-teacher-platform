"use client";

import api
from "@/app/utils/api";
import { useEffect } from "react";
import {
 useState
}
from "react";

import jsPDF
from "jspdf";

import Sidebar from "@/app/components/Sidebar";
import Topbar from "@/app/components/Topbar";
import MobileBottomNav from "@/app/components/MobileNavbar";

export default function ToolkitPage() {

  
 const [
   form,
   setForm
 ] = useState({

    topic: "",
    difficulty: "",
    numberOfQuestions: 5

 });
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
   quiz,
   setQuiz
 ] = useState<any>(null);

 const [
   loading,
   setLoading
 ] = useState(false);

 // GENERATE QUIZ
 const generateQuiz =
  async () => {

   try {

      setLoading(true);

      const response =
       await api.post(

         "/toolkits/quiz",

         form

       );

      setQuiz(
        response.data
      );

   } catch (error) {

      console.log(error);

   } finally {

      setLoading(false);

   }

 };

 // DOWNLOAD PDF
 const downloadPDF =
  () => {

   if (!quiz) return;

   const pdf =
    new jsPDF();

   let y = 20;

   pdf.setFontSize(20);

   pdf.text(
     quiz.title,
     20,
     y
   );

   y += 20;

   quiz.questions.forEach(

    (
      q:any,
      index:number
    ) => {

      pdf.setFontSize(14);

      const question =
       `${index + 1}. ${q.question}`;

      const splitQuestion =
       pdf.splitTextToSize(
         question,
         170
       );

      pdf.text(
        splitQuestion,
        20,
        y
      );

      y +=
       splitQuestion.length * 8;

      q.options.forEach(
        (
          option:string
        ) => {

          const splitOption =
           pdf.splitTextToSize(
             `• ${option}`,
             160
           );

          pdf.text(
            splitOption,
            30,
            y
          );

          y +=
           splitOption.length * 8;

        }
      );

      pdf.setTextColor(
        0,
        128,
        0
      );

      pdf.text(
        `Answer: ${q.answer}`,
        30,
        y
      );

      pdf.setTextColor(
        0,
        0,
        0
      );

      y += 15;

      // NEW PAGE
      if (y > 260) {

         pdf.addPage();

         y = 20;

      }

    }

   );

   pdf.save(
    `${quiz.title}.pdf`
   );

 };

 return (

  <div className="min-h-screen bg-[#f5f5f5] p-3">

   <div className="flex gap-3 h-[97vh]">

    <Sidebar />

    <div className="flex-1 flex flex-col">

     <Topbar />

     <div className="flex-1 bg-white rounded-2xl shadow-md mt-4 p-6 overflow-y-auto">

      <h1 className="text-3xl font-bold">

       AI Teacher Toolkit

      </h1>

      <p className="text-gray-500 mt-2">

       Generate AI powered quizzes

      </p>

      {/* FORM */}

      <div className="mt-10 max-w-md space-y-4">

       <input
        type="text"
        placeholder="Topic"
        value={form.topic}
        onChange={(e)=>

         setForm({

           ...form,

           topic:
            e.target.value

         })

        }
        className="w-full border p-3 rounded-xl"
       />

       <select
        value={form.difficulty}
        onChange={(e)=>

         setForm({

           ...form,

           difficulty:
            e.target.value

         })

        }
        className="w-full border p-3 rounded-xl"
       >

        <option value="">
          Select Difficulty
        </option>

        <option value="Easy">
          Easy
        </option>

        <option value="Medium">
          Medium
        </option>

        <option value="Hard">
          Hard
        </option>

       </select>

       <input
        type="number"
        placeholder="Questions"
        value={form.numberOfQuestions}
        onChange={(e)=>

         setForm({

           ...form,

           numberOfQuestions:
            Number(e.target.value)

         })

        }
        className="w-full border p-3 rounded-xl"
       />

       <button
        onClick={generateQuiz}
        className="bg-black text-white px-6 py-3 rounded-full"
       >

        {
          loading
          ? "Generating..."
          : "Generate Quiz"
        }

       </button>

       <p className="text-sm text-gray-500">

       
       </p>

      </div>

      {/* QUIZ */}

      {quiz && (

       <div className="mt-14">

        <div className="flex items-center justify-between">

          <h2 className="text-2xl font-bold">

            {quiz.title}

          </h2>

          <button
            onClick={downloadPDF}
            className="bg-green-600 text-white px-6 py-3 rounded-full"
          >

            Download PDF

          </button>

        </div>

        <div className="space-y-8 mt-8">

         {quiz.questions.map(
          (
            q:any,
            index:number
          ) => (

           <div
            key={index}
            className="bg-[#f8f8f8] rounded-2xl p-6"
           >

            <p className="font-semibold text-lg">

             {index + 1}.
             {" "}
             {q.question}

            </p>

            <div className="mt-4 space-y-3">

             {q.options.map(
              (
                option:string,
                i:number
              ) => (

               <div
                 key={i}
                 className="bg-white p-3 rounded-xl"
               >

                {option}

               </div>

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

      )}

     </div>

    </div>

   </div>

   <MobileBottomNav />

  </div>

 );

}