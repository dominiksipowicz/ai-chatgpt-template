import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta
            name="description"
            content="AI Chat bot with OpenAI GPT-3 API"
          />
          <meta
            property="og:site_name"
            content="ai-chatgpt-template.vercel.app"
          />
          <meta
            property="og:description"
            content="Talk with Chatbot powered by OpenAI GPT-3 API"
          />
          <meta property="og:title" content="Chat bot" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Chat bot" />
          <meta
            name="twitter:description"
            content="Talk with Chatbot powered by OpenAI GPT-3 API"
          />
          <meta
            property="og:image"
            content="https://twitterbio.com/og-image.png"
          />
          <meta
            name="twitter:image"
            content="https://twitterbio.com/og-image.png"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
