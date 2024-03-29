import Balancer from "react-wrap-balancer";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

// wrap Balancer to remove type errors :( - @TODO - fix this ugly hack
const BalancerWrapper = (props: any) => <Balancer {...props} />;

export type Message = {
  who: "bot" | "user" | undefined;
  message?: string;
};

// loading placeholder animation for the chat line
export const LoadingChatLine = () => (
  <div className="flex min-w-full animate-pulse px-4 py-5 sm:px-6">
    <div className="flex flex-grow space-x-3">
      <div className="min-w-0 flex-1">
        <p className="font-large text-xxl text-gray-900">
          <a href="#" className="hover:underline">
            AI
          </a>
        </p>
        <div className="space-y-4 pt-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2 h-2 rounded bg-zinc-500"></div>
            <div className="col-span-1 h-2 rounded bg-zinc-500"></div>
          </div>
          <div className="h-2 rounded bg-zinc-500"></div>
        </div>
      </div>
    </div>
  </div>
);

// util helper to convert new lines to <br /> tags
const convertNewLines = (text: string) =>
  text.split("\n").map((line, i) => (
    <span key={i}>
      {line}
      <br />
    </span>
  ));

export function ChatLine({ who = "bot", message }: Message) {
  if (!message) {
    return null;
  }
  const formatteMessage = convertNewLines(message);

  return (
    <div
      className={
        who != "bot" ? "float-right clear-both" : "float-left clear-both"
      }
    >
      <div className="float-right mb-5 rounded-lg bg-white px-4 py-5 shadow-lg ring-1 ring-zinc-100 sm:px-6 min-w-100">
        <div className="flex space-x-3">
          <div className="flex-1 gap-4">
            <p
              className={classNames(
                "font-large text-xxl text-gray-900 min-w-100",
                who == "bot" ? "text-left" : "text-right"
              )}
            >
              {who == "bot" ? "AI" : "You"}
            </p>
            <p
              className={classNames(
                "text min-w-100 min-w-fit",
                who == "bot"
                  ? "font-semibold text-left"
                  : "text-gray-400  text-right"
              )}
            >
              <Balancer>{formatteMessage}</Balancer>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
