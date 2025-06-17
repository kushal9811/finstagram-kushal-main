import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY)

export async function enhanceCaption(prompt) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" })
  const result = await model.generateContent(
    `Make this social media post more engaging and attractive.
Return only one short, improved caption (1–2 lines max) with emojis and hashtags, and nothing else:
"${prompt}"`
  )
  const response = await result.response
  return response.text()
}