import { Timeline, type Tweet } from "./timeline";

const getReactProps = (element: HTMLElement): object | null => {
    const properties = Object.getOwnPropertyNames(element) as (keyof typeof element)[];
    const reactPropsNames: (keyof HTMLElement)[] = properties.filter((name) => name.startsWith("__reactProps$"));
    if (!reactPropsNames.length) return null;

    return element[reactPropsNames[0]] as object;
};

const onNewTweet = async (tweet: Tweet): Promise<void> => {

    const reactProps = getReactProps(tweet);

    console.log(reactProps)

}

const timeline = new Timeline();

timeline.onNewTweet((tweet) => {
    void onNewTweet(tweet);
});