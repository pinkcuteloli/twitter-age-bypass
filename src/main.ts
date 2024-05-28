import { Timeline, type Tweet } from "./timeline";

const getReactProps = (element: HTMLElement): any | null => {
    const reactPropsName = Object.getOwnPropertyNames(element).filter((name) =>
        name.startsWith("__reactProps$")
    ) as (keyof typeof element)[];
    return reactPropsName.length ? (element[reactPropsName[0]] as unknown as any) : null;
};


const onNewTweet = async (tweet: Tweet) => {
    const reactProps = getReactProps(tweet);

    if (!reactProps) return;

    if (reactProps.children.props.entry.type === "tombstone") {
        console.log("pong");

        const entryId = reactProps.children.props.entry.entryId.replace("tweet-", "") as string

        const event = new CustomEvent("newTweet", { detail: { entryId } });
        window.dispatchEvent(event);
    }
};
const timeline = new Timeline();
timeline.onNewTweet((tweet) => {
    void onNewTweet(tweet);
});