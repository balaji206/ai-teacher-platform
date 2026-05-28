import {
  GoogleGenerativeAI
} from "@google/generative-ai";

const genAI =
 new GoogleGenerativeAI(
   process.env.GEMINI_API_KEY!
 );

export async function generateQuestions(
  assignment: any
) {

 const model =
  genAI.getGenerativeModel({

    model:
    "gemini-2.5-flash-lite"

  });

 const prompt = `

You are an AI Question Paper Generator.

Generate a PROFESSIONAL EXAM QUESTION PAPER.

IMPORTANT RULES:

1. Return ONLY VALID JSON
2. DO NOT use markdown
3. DO NOT use \`\`\`
4. Generate REALISTIC questions
5. Questions MUST match the subject/topic
6. Generate EXACTLY ${assignment.numberOfQuestions} questions
7. Divide questions into sections
8. Add answers at the bottom
9. Questions should look like real school exam papers

JSON FORMAT:

{
  "schoolName": "VedaAI School",

  "subject": "",

  "class": "",

  "duration": "45 Minutes",

  "totalMarks": 0,

  "sections": [

    {
      "title": "Section A",

      "instruction":
      "Attempt all questions",

      "questions": [

        {
          "question": "",

          "difficulty": "",

          "marks": 0,

          "answer": ""
        }

      ]

    }

  ],

  "answerKey": [

    {
      "questionNumber": 1,

      "answer": ""
    }

  ]

}

NOW GENERATE USING THESE DETAILS:

SUBJECT/TITLE:
${assignment.title}

NUMBER OF QUESTIONS:
${assignment.numberOfQuestions}

TOTAL MARKS:
${assignment.totalMarks}

QUESTION TYPES:
${assignment.questionTypes}

ADDITIONAL INSTRUCTIONS:
${assignment.instructions}

VERY IMPORTANT:

- If subject is Maths → generate maths questions
- If subject is Science → generate science questions
- If subject is History → generate history questions
- If subject is Programming → generate coding questions

DO NOT generate generic placeholder questions.

Generate HIGH QUALITY exam-style content.

`;

 const result =
  await model.generateContent(
    prompt
  );

 return result.response.text();

}