import { GoogleGenAI } from "@google/genai";
import { configDotenv } from "dotenv";
configDotenv({});

const genAI = new GoogleGenAI({ apiKey: process.env.GENAI_API_KEY });

export async function genai(req, res) {
    const { prompt } = req.body;
    res.setHeader('Content-Type', 'text');
  try {
       const result = await genAI.models.generateContentStream({
        model: "gemini-2.5-flash-lite",
        contents: prompt,
      });

        // print text as it comes in
        for await (const chunk of result) {
            const chunkText = chunk.text;
            res.write(chunkText);
          }
        res.end();
  } catch (error) {
    res.status(400).json({error});
  }
}
