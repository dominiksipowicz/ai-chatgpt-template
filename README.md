# [AI Chat GPT template](https://ai-chatgpt-template.vercel.app/)

This project is a template for chat bot using Next.js, API Routes, and OpenAI API.

## Components

- Next.js
- OpenAI API (REST endpoint)
- API Routes (Edge runtime)

This project uses the [OpenAI GPT-3 API](https://openai.com/api/) (specifically, text-davinci-003) and [Vercel Edge functions](https://vercel.com/features/edge-functions) with streaming. It constructs a prompt based on the form and user input, sends it to the GPT-3 API via a Vercel Edge function, then streams the response back to the application.

## One-Click Deploy

Deploy the example using [Vercel](https://vercel.com?utm_source=github&utm_medium=readme&utm_campaign=dominiksipowicz):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/dominiksipowicz/ai-chatgpt-template&env=OPENAI_API_KEY&project-name=ai-chat&repo-name=ai-chat)

## Deploying to Vercel from CLI

```bash
vercel
```

## Running Locally

After cloning the repo, go to [OpenAI](https://beta.openai.com/account/api-keys) to make an account and rename [`.env.example`](.env.example) to `.env.local` and add your API key.

````bash:

```bash
cp .env.example .env.local
````

Then, run the application in the command line and it will be available at `http://localhost:3000`.

```bash
npm run dev
```
