"use client";

import { useEffect, useState } from "react";

import api
from "@/app/utils/api";
import { use } from "react"
import Sidebar from "@/app/components/Sidebar";
import Topbar from "@/app/components/Topbar";
import MobileBottomNav from "@/app/components/MobileNavbar";
import jsPDF from "jspdf";

import html2canvas from "html2canvas";

interface Question {
  question: string;
  difficulty: string;
  marks: number;
  answer: string;
}

interface Section {
  title: string;
  instruction: string;
  questions: Question[];
}

export default function QuestionPaperPage({
   params,
}: {
  params: Promise<{ id: string }>;
}) {
  
  const { id } = use(params);
  const [assignment, setAssignment] =
    useState<any>(null);

  useEffect(() => {

    fetchAssignment();

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

  const fetchAssignment =
   async () => {

    try {

      const response =
       await api.get(
         `/assignments/${id}`
       );

      setAssignment(
        response.data
      );

    } catch (error) {

      console.log(error);

    }

  };

  if (!assignment) {

    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );

  }
const downloadPDF =
 async () => {

   try {

      const element =
       document.getElementById(
         "paper"
       );

      if (!element) return;

      // CLONE PAPER
      const clonedElement =
  element.cloneNode(true) as HTMLElement;

      // CLEAN STYLES
      clonedElement.style.background =
       "#ffffff";

      clonedElement.style.color =
       "#000000";

      clonedElement.style.padding =
       "20px";

      // TEMP WRAPPER
      const wrapper =
       document.createElement(
         "div"
       );

      wrapper.style.position =
       "fixed";

      wrapper.style.top =
       "-99999px";

      wrapper.style.left =
       "-99999px";

      wrapper.style.background =
       "#ffffff";

      wrapper.appendChild(
       clonedElement
      );

      document.body.appendChild(
       wrapper
      );

     const canvas =
 await html2canvas(
   clonedElement,
   {

     backgroundColor:
      "#ffffff",

     useCORS: true,

     scale: 2,

     logging: false,

     foreignObjectRendering: false,

     ignoreElements: (element) => {

       const style =
        window.getComputedStyle(
          element
        );

       return (
         style.backgroundColor.includes(
           "lab"
         )
       );

     }

   }
 );

      document.body.removeChild(
       wrapper
      );

      const imgData =
       canvas.toDataURL(
         "image/png"
       );

      const pdf =
       new jsPDF(
         "p",
         "mm",
         "a4"
       );

      const pdfWidth =
       pdf.internal.pageSize.getWidth();

      const pageHeight =
 pdf.internal.pageSize.getHeight();

const pdfHeight =
 (canvas.height * pdfWidth)
/ canvas.width;

      let heightLeft =
 pdfHeight;

let position = 0;

pdf.addImage(
  imgData,
  "PNG",
  0,
  position,
  pdfWidth,
  pdfHeight
);

heightLeft -=
 pdf.internal.pageSize.getHeight()-10;

while (heightLeft > 0) {

   position =
    heightLeft - pdfHeight-10;

   pdf.addPage();

   pdf.addImage(
     imgData,
     "PNG",
     0,
     position,
     pdfWidth,
     pdfHeight
   );

   heightLeft -=
    pdf.internal.pageSize.getHeight();

}

pdf.save(
 `${assignment.title}.pdf`
);

   } catch (error) {

      console.log(
       "PDF ERROR",
       error
      );

   }

};
  return (
    <div className="min-h-screen bg-[#f5f5f5] p-3">

      <div className="flex gap-3 h-[97vh]">

        <Sidebar />

        <div className="flex-1 flex flex-col">

          <Topbar />

          <div className="flex-1 overflow-y-auto bg-white rounded-2xl shadow-md mt-4 p-8 font-serif">
<div className="flex justify-center mt-6">

  <button
    onClick={downloadPDF}
    className="bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition"
  >

    Download PDF

  </button>

</div>
           <div
  id="paper"
  className="
    max-w-4xl
    mx-auto
    bg-white
    text-black
    pb-20
  "
>

              {/* HEADER */}
              <h1 className="text-3xl font-bold text-center">
                {assignment.title}
              </h1>

              
              <div className="flex justify-between mt-10">

                <p>
                  Due Date:
                  {" "}
                  {assignment.dueDate}
                </p>

                <p>
                  Total Marks:
                  {" "}
                  {assignment.totalMarks}
                </p>

              </div>

              {/* STUDENT INFO */}
              <div className="mt-10 space-y-4">

                <p>
                  Name:
                  __________________
                </p>

                <p>
                  Roll Number:
                  __________________
                </p>

                <p>
                  Section:
                  __________________
                </p>

              </div>

              {/* QUESTIONS */}
              <div className="mt-12">

                {assignment.generatedPaper?.sections?.map(
                  (
                    section: Section,
                    index: number
                  ) => (

                    <div
                      key={index}
                      className="mb-10"
                    >

                      <h2 className="text-2xl font-bold text-center">

                        {section.title}

                      </h2>

                      <p className="italic mt-2">

                        {section.instruction}

                      </p>

                      <div className="mt-8 space-y-8">

                        {section.questions.map(
                          (
                            question: Question,
                            qIndex: number
                          ) => (

                            <div key={qIndex}>

                              <p className="text-lg">

                                {qIndex + 1}.
                                {" "}
                                {question.question}

                              </p>

                              <div className="flex gap-3 mt-3">

                                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">

                                  {question.difficulty}

                                </span>

                                <span>

                                  {question.marks}
                                  {" "}
                                  Marks

                                </span>

                              </div>

                            </div>

                          )
                        )}

                      </div>

                    </div>

                  )
                )}

              </div>
              {/* ANSWER KEY */}
<div className="mt-20">

  <h2 className="text-2xl font-bold">

    Answer Key:

  </h2>

  <div className="mt-8 space-y-6">

    {assignment.generatedPaper?.sections?.map(
      (
        section: Section
      ) =>

        section.questions.map(
          (
            question: Question,
            index: number
          ) => (

            <div
              key={index}
              className="space-y-2"
            >

              <p className="font-semibold">

                {index + 1}.
                {" "}
                {question.answer}

              </p>

            </div>

          )
        )
    )}

  </div>

</div>

            </div>

          </div>

        </div>

      </div>

      <MobileBottomNav />

    </div>
  );
}