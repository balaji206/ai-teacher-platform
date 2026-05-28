"use client";

import { useState } from "react";
import api
from "@/app/utils/api";
import { useRouter } from "next/navigation";

import Sidebar from "@/app/components/Sidebar";
import Topbar from "@/app/components/Topbar";
import MobileBottomNav from "@/app/components/MobileNavbar";

export default function CreateAssignmentPage() {

  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    dueDate: "",
    questionType: "Multiple Choice Questions",
    numberOfQuestions: "",
    totalMarks: "",
    instructions: "",
  });

  const [file, setFile] = useState<File | null>(null);

  // HANDLE INPUT CHANGE
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement |
      HTMLSelectElement
    >
  ) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  // HANDLE FILE CHANGE
  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
    }

  };

  // HANDLE SUBMIT
  const handleSubmit = async () => {

    try {

      // VALIDATION
      if (
        !formData.title ||
        !formData.dueDate ||
        !formData.numberOfQuestions ||
        !formData.totalMarks ||
        !formData.instructions
      ) {

        alert("Please fill all fields");
        return;
      }

      setLoading(true);

      const response = await api.post(
        "/assignments",
        {
          title: formData.title,

          dueDate: formData.dueDate,

          questionTypes: [
            formData.questionType,
          ],

          numberOfQuestions:
            Number(formData.numberOfQuestions),

          totalMarks:
            Number(formData.totalMarks),

          instructions:
            formData.instructions,
        }
      );

      const assignmentId =
        response.data.assignmentId;

      // REDIRECT TO GENERATED PAPER PAGE
      router.push(
        `/assignment/${assignmentId}`
      );

    } catch (error) {

      console.log(error);

      alert("Something went wrong");

    } finally {

      setLoading(false);

    }

  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] p-3">

      <div className="flex gap-3 h-[97vh]">

        {/* SIDEBAR */}
        <Sidebar />

        {/* MAIN CONTENT */}
        <div className="flex-1 flex flex-col">

          {/* TOPBAR */}
          <Topbar />

          {/* CONTENT */}
          <div className="flex-1 overflow-y-auto mt-4 bg-white rounded-2xl shadow-md p-6">

            <h1 className="text-2xl font-bold">
              Create Assignment
            </h1>

            <p className="text-gray-500 mt-1">
              Generate assessments for students
            </p>

            {/* FORM CONTAINER */}
            <div className="mt-8 max-w-3xl mx-auto bg-[#f8f8f8] rounded-3xl p-8">

              {/* TITLE */}
              <div>

                <label className="block mb-2 font-medium">
                  Assignment Title
                </label>

                <input
                  type="text"
                  name="title"
                  placeholder="Enter assignment title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full border p-3 rounded-xl outline-none"
                />

              </div>

              {/* FILE UPLOAD */}
              <div className="border-2 border-dashed border-gray-300 rounded-2xl p-10 text-center mt-6">

                <p className="font-medium">
                  Upload PDF / DOC
                </p>

                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="hidden"
                  id="fileUpload"
                />

                <label
                  htmlFor="fileUpload"
                  className="inline-block mt-4 bg-black text-white px-6 py-2 rounded-full cursor-pointer"
                >
                  Browse Files
                </label>

                {file && (
                  <p className="mt-4 text-sm text-gray-500">
                    {file.name}
                  </p>
                )}

              </div>

              {/* FORM */}
              <div className="mt-8 space-y-6">

                {/* DUE DATE */}
                <div>

                  <label className="block mb-2 font-medium">
                    Due Date
                  </label>

                  <input
                    type="date"
                    name="dueDate"
                    value={formData.dueDate}
                    onChange={handleChange}
                    className="w-full border p-3 rounded-xl outline-none"
                  />

                </div>

                {/* QUESTION TYPE */}
                <div>

                  <label className="block mb-2 font-medium">
                    Question Type
                  </label>

                  <select
                    name="questionType"
                    value={formData.questionType}
                    onChange={handleChange}
                    className="w-full border p-3 rounded-xl outline-none"
                  >

                    <option>
                      Multiple Choice Questions
                    </option>

                    <option>
                      Short Questions
                    </option>

                    <option>
                      Long Answer Questions
                    </option>

                  </select>

                </div>

                {/* QUESTIONS + MARKS */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                  <div>

                    <label className="block mb-2 font-medium">
                      No. of Questions
                    </label>

                    <input
                      type="number"
                      name="numberOfQuestions"
                      value={formData.numberOfQuestions}
                      onChange={handleChange}
                      placeholder="Enter number"
                      className="w-full border p-3 rounded-xl outline-none"
                    />

                  </div>

                  <div>

                    <label className="block mb-2 font-medium">
                      Total Marks
                    </label>

                    <input
                      type="number"
                      name="totalMarks"
                      value={formData.totalMarks}
                      onChange={handleChange}
                      placeholder="Enter marks"
                      className="w-full border p-3 rounded-xl outline-none"
                    />

                  </div>

                </div>

                {/* INSTRUCTIONS */}
                <div>

                  <label className="block mb-2 font-medium">
                    Additional Instructions
                  </label>

                  <textarea
                    rows={5}
                    name="instructions"
                    value={formData.instructions}
                    onChange={handleChange}
                    placeholder="Enter instructions"
                    className="w-full border p-3 rounded-xl outline-none"
                  />

                </div>

                {/* BUTTON */}
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="w-full bg-black text-white py-4 rounded-full font-semibold hover:bg-gray-800 transition"
                >

                  {loading
                    ? "Generating..."
                    : "Generate Question Paper"}

                </button>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* MOBILE NAV */}
      <MobileBottomNav />

    </div>
  );
}