import {
  GoogleGenerativeAI
} from "@google/generative-ai";

import Groq
from "groq-sdk";

import Anthropic
from "@anthropic-ai/sdk";

// GEMINI
const genAI =
 new GoogleGenerativeAI(
   process.env.GEMINI_API_KEY!
 );

// GROQ
const groq =
 new Groq({
   apiKey:
    process.env.GROQ_API_KEY
 });

// CLAUDE
const anthropic =
 new Anthropic({
   apiKey:
    process.env.CLAUDE_API_KEY
 });

export async function generateQuestions(
  assignment: any
) {

const prompt = `
You are an expert school exam paper setter.

Generate a PROFESSIONAL school question paper.

IMPORTANT RULES:

1. NEVER mention:
- PDF
- document
- uploaded file
- reference material
- source material
- based on the PDF
- according to the document
- consulting the PDF

2. Questions should look like REAL school exam questions.

3. Generate ONLY direct questions.

4. Questions should be clean and natural.

5. Include proper answers.

6. Divide questions into sections.

7. Return ONLY VALID JSON.

8. Do NOT include markdown.

9. Do NOT include \`\`\`json.

10. Do NOT include LaTeX symbols like:
$
\\
^

11. Do NOT include mathematical formatting.

12. Use plain text math only.

13. Escape all double quotes correctly.

14. Return parsable JSON only.

15. Do not include explanation before or after JSON.

FORMAT:

{
  "schoolName":"VedaAI School",
  "subject":"",
  "class":"10th",
  "duration":"45 Minutes",
  "totalMarks":50,

  "sections":[
    {
      "title":"Section A",

      "instruction":"Attempt all questions",

      "questions":[
        {
          "question":"",

          "difficulty":"easy",

          "marks":5,

          "answer":""
        }
      ]
    }
  ]
}

ASSIGNMENT DETAILS:

Subject:
${assignment.title}

Number Of Questions:
${assignment.numberOfQuestions}

Total Marks:
${assignment.totalMarks}

Instructions:
${assignment.instructions}

Question Types:
${assignment.questionTypes}
`;

  // =====================
  // GEMINI
  // =====================

  try {

    console.log(
      "Trying Gemini..."
    );

    const model =
      genAI.getGenerativeModel({
        model:
        "gemini-2.5-flash-lite"
      });

    const result =
      await model.generateContent(
        prompt
      );

    return result.response.text();

  } catch (error) {

    console.log(
      "Gemini Failed"
    );

  }

  // =====================
  // GROQ
  // =====================

  try {

    console.log(
      "Trying Groq..."
    );

    const completion =
      await groq.chat.completions.create({

        messages: [
          {
            role: "user",
            content: prompt
          }
        ],

        model:
        "llama-3.3-70b-versatile",

      });

    return completion
      .choices[0]
      .message
      .content;

  } catch (error) {

    console.log(
      "Groq Failed"
    );

  }

  // =====================
  // CLAUDE
  // =====================

  try {

    console.log(
      "Trying Claude..."
    );

    const message =
      await anthropic.messages.create({

        model:
        "claude-3-haiku-20240307",

        max_tokens: 2000,

        messages: [
          {
            role: "user",
            content: prompt
          }
        ]

      });

    return message.content[0]
      .type === "text"

      ? message.content[0].text

      : "";

  } catch (error) {

    console.log(
      "Claude Failed"
    );

  }

  // =====================
  // LOCAL FALLBACK
  // =====================

  console.log(
    "Using Local Fallback"
  );

  return JSON.stringify({

    sections: [

      {
        title: "Section A",

        instruction:
        "Attempt all questions",

        questions:
         Array.from({

            length:
             assignment.numberOfQuestions

         }).map((_, index) => ({

            question:
             `${assignment.title} Question ${index + 1}`,

            difficulty:
             index % 2 === 0
             ? "easy"
             : "medium",

            marks:
             Math.floor(
               assignment.totalMarks /
               assignment.numberOfQuestions
             ),

            answer:
             "Sample Answer"

         }))

      }

    ]

  });

}