import { AnimatePresence } from "framer-motion";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import DropDown, { ModeType } from "../components/DropDown";
import Footer from "../components/Footer";
import Github from "../components/GitHub";
import Header from "../components/Header";
import ResizablePanel from "../components/ResizablePanel";
import Balancer from "react-wrap-balancer";

import { Chat as ChatAPIRoute } from "../components/ChatAPI";

const Home: NextPage = () => {
  const [mode, setMode] = useState<ModeType>("Simple");

  return (
    <div className="flex max-w-5xl mx-auto flex-col items-center justify-center py-2 min-h-screen">
      <Head>
        <title>Twitter Generator</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 mt-12 sm:mt-20">
        <a
          className="flex max-w-fit items-center justify-center space-x-2 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm text-gray-600 shadow-md transition-colors hover:bg-gray-100 mb-5"
          href="https://github.com/dominiksipowicz/ai-chatgpt-template"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Github />
          <p>Star on GitHub</p>
        </a>

        <h1 className="sm:text-6xl text-4xl max-w-2xl font-bold text-slate-900">
          <Balancer>2 versions of Chat bot</Balancer>
        </h1>
        <p className="text-slate-500 mt-5">
          <Balancer>
            There are differences in OpenAI API usage (API vs. browser), history
            context, and the prompt.
          </Balancer>
        </p>
        <div className="max-w-xl w-full">
          <div className="flex mt-10 items-start space-x-3">
            <Image
              src="/1-black.png"
              width={30}
              height={30}
              alt="1 icon"
              className="mb-5 sm:mb-0"
            />
            <p className="text-left font-medium">
              Simple -{" "}
              <span className="text-slate-500">
                The Chat uses an API Route and the prompt is hidden behind the
                API call. This simple example sets the context history to 6 last
                messages. To limit API usage, the response is on purpose delayed
              </span>
              .
            </p>
          </div>
        </div>

        <div className="max-w-xl w-full">
          <div className="flex mt-10 space-x-3 flex-row items-start">
            <Image
              src="/2-black.png"
              width={30}
              height={30}
              alt="2 icon"
              className="mb-5 sm:mb-0"
            />
            <p className="text-left font-medium">
              Advanced -{" "}
              <span className="text-slate-500">
                Fast. This is the BYOK (Bring Your Own Key) version. OpenAI API
                is directly accessed through the browser in the Chat. No
                middleman. The key is only stored in the browser, not on the
                Vercel server. OpenAI context history is set to the last 12
                messages, and there is no artificial delay in response times.
                You pay to OpenAI directly what you use as a normal
                Pay-As-You-Go
              </span>
              .
            </p>
          </div>

          <div className="flex my-5 items-center space-x-3">
            <p className="text-left font-medium">
              You can switch between 2 versions:
            </p>
          </div>
          <div className="block">
            <DropDown mode={mode} setMode={(newMode) => setMode(newMode)} />
          </div>
        </div>

        <h2 className="sm:text-6xl my-10 text-4xl max-w-2xl font-bold text-slate-900">
          Chat
        </h2>

        <ResizablePanel>
          <AnimatePresence mode="wait">
            <ChatAPIRoute />
          </AnimatePresence>
        </ResizablePanel>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
