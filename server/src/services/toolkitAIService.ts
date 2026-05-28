import Groq
from "groq-sdk";

const groq =
 new Groq({

   apiKey:
    process.env.GROQ_API_KEY

 });

export async function generateQuizAI(
  data:any
) {

 try {

   const completion =
    await groq.chat.completions.create({

      model:
 "llama-3.3-70b-versatile",

      messages: [

        {
          role: "system",

          content:
           `
You are an expert school teacher.

Generate a professional school quiz.

IMPORTANT:

1. Return ONLY RAW VALID JSON
2. DO NOT RETURN MARKDOWN
3. DO NOT USE \`\`\`
4. Generate meaningful school questions

FORMAT:

{
  "title":"Quiz Title",

  "questions":[
    {
      "question":"",

      "options":[
        "",
        "",
        "",
        ""
      ],

      "answer":""
    }
  ]
}
`
        },

        {
          role: "user",

          content:
           `
Topic:
${data.topic}

Difficulty:
${data.difficulty}

Number Of Questions:
${data.numberOfQuestions}
`
        }

      ],

      temperature: 0.7

    });

   return (
     completion
      .choices[0]
      .message
      .content || ""
   );

 } catch (error) {

    console.log(
      "GROQ ERROR",
      error
    );

    return JSON.stringify({

      title:
       "Fallback Quiz",

      questions: [

        {
          question:
           "What is 2 + 2?",

          options: [
            "3",
            "4",
            "5",
            "6"
          ],

          answer:
           "4"
        }

      ]

    });

 }

}