import { Timeline, type Tweet } from "twi-ext";

const getReactProps = (element: HTMLElement): object | null => {
    const properties = Object.getOwnPropertyNames(element) as (keyof typeof element)[];
    const reactPropsNames: (keyof HTMLElement)[] = properties.filter((name) => name.startsWith("__reactProps$"));
    if (!reactPropsNames.length) return null;

    return element[reactPropsNames[0]] as object;
};

const onNewTweet = async (tweet: Tweet): Promise<void> => {

    console.log(tweet.element)
}

const timeline = new Timeline();

timeline.onNewTweet((tweet) => {
    void onNewTweet(tweet);
});