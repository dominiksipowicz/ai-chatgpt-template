import { useEffect, useState } from "react";
import { InputMessage } from "./InputMessage";
import { type Message, ChatLine, LoadingChatLine } from "./ChatLine";
import { useCookies } from "react-cookie";

const COOKIE_NAME = "nextjs-example-ai-chat-gpt3";

// default first message to display in UI (not necessary to define the prompt)
export const initialMessages: Message[] = [
  {
    who: "bot",
    message: "Hi! I’m A friendly AI assistant. Ask me anything!",
  },
];

export function Chat() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [cookie, setCookie] = useCookies([COOKIE_NAME]);

  useEffect(() => {
    if (!cookie[COOKIE_NAME]) {
      // generate a semi random short id
      const randomId = Math.random().toString(36).substring(7);
      setCookie(COOKIE_NAME, randomId);
    }
  }, [cookie, setCookie]);

  // send message to API /api/chat endpoint
  const sendMessage = async (message: string) => {
    setLoading(true);
    const newMessages = [
      ...messages,
      { message: message, who: "user" } as Message,
    ];
    setMessages(newMessages);
    const last10messages = newMessages.slice(-6); // remember last 6 messages

    // ====== REMOVE THIS IN PRODUCTION ======
    // wait 2 seconds before making a call to the API
    await new Promise((resolve) => {
      console.warn(
        "[ === artificial delay === ] Waiting 2 seconds before calling the API..."
      );
      setTimeout(resolve, 2000);
    });
    // ====== REMOVE THIS IN PRODUCTION ======

    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: last10messages,
        user: cookie[COOKIE_NAME],
      }),
    });

    console.log("Edge function returned.");

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    // This data is a ReadableStream
    const data = response.body;
    if (!data) {
      return;
    }

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;

    let lastMessage = "";

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);

      lastMessage = lastMessage + chunkValue;

      setMessages([
        ...newMessages,
        { message: lastMessage, who: "bot" } as Message,
      ]);

      // setMessages((prev: Message[]) => {
      //   const last = prev[prev.length - 1];
      //   if (last && last.who === "bot") {
      //     last.message = last.message + chunkValue;
      //     const allButLast = prev.slice(0, -1);
      //     const newMessages = [...allButLast, last];
      //     console.log("newMessages", newMessages);
      //     return [...newMessages];
      //   }
      //   return [...prev, { message: chunkValue, who: "bot" } as Message];
      // });
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border-zinc-100  lg:border lg:p-6">
      {messages.map(({ message, who }, index) => (
        <ChatLine key={index} who={who} message={message} />
      ))}

      {loading && <LoadingChatLine />}

      {messages.length < 2 && (
        <span className="mx-auto flex flex-grow text-gray-600 clear-both">
          Type a message to start the conversation
        </span>
      )}
      <InputMessage
        input={input}
        setInput={setInput}
        sendMessage={sendMessage}
      />
    </div>
  );
}
