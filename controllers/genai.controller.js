const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GENAI_API_KEY);

async function genai(req, res) {
    const { prompt } = req.body;
    res.setHeader('Content-Type', 'text');
  try {
      // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
       // Choose a model that's appropriate for your use case.
       const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
  
       const result = await model.generateContentStream([prompt]);
       const {totalTokens} = await model.countTokens(prompt);
 
       console.log(`Total token were used: ${totalTokens}`);

        // print text as it comes in
        for await (const chunk of result.stream) {
            const chunkText = chunk.text();
            res.write(chunkText);
          }
        res.end();
  } catch (error) {
    res.status(400).json({error});
  }
}

module.exports = genai;
