import { OpenAIStream, OpenAIStreamPayload } from "../../utils/OpenAIStream";
import { type NextRequest, NextResponse } from "next/server";
import { initialMessages } from "../../components/ChatAPI";
import { generatePromptFromMessages } from "../../utils/generatePromptFromMessages";

// break the app if the API key is missing
if (!process.env.OPENAI_API_KEY) {
  throw new Error("Missing Environment Variable OPENAI_API_KEY");
}

const botName = "AI";
const userName = "News reporter"; // TODO: move to ENV var
const firstMessge = initialMessages[0].message;

export const config = {
  runtime: "edge",
};

export default async function handler(req: NextRequest) {
  // read body from request
  const body = await req.json();

  // const messages = req.body.messages
  const messagesPrompt = generatePromptFromMessages(
    body.messages,
    botName,
    userName
  );
  const defaultPrompt = `I am Friendly AI Assistant. \n\nThis is the conversation between AI Bot and a news reporter.\n\n${botName}: ${firstMessge}\n${userName}: ${messagesPrompt}\n${botName}: `;
  const finalPrompt = process.env.AI_PROMPT
    ? `${process.env.AI_PROMPT}${messagesPrompt}\n${botName}: `
    : defaultPrompt;

  const payload: OpenAIStreamPayload = {
    model: "text-davinci-003",
    prompt: finalPrompt,
    temperature: process.env.AI_TEMP ? parseFloat(process.env.AI_TEMP) : 0.7,
    max_tokens: process.env.AI_MAX_TOKENS
      ? parseInt(process.env.AI_MAX_TOKENS)
      : 200,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    stop: [`${botName}:`, `${userName}:`],
    stream: true,
    user: body?.user,
    n: 1,
  };

  const stream = await OpenAIStream(payload);
  return new Response(stream);

  // @TODO handle APi errors
  // if (data.error) {
  //   console.error("OpenAI API error: ", data.error);
  //   return NextResponse.json({
  //     text: `ERROR with API integration. ${data.error.message}`,
  //   });
  // }
}
