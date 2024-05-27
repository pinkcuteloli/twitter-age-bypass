// Reference: https://github.com/Robot-Inventor/twi-ext/blob/36565147e3c2662712c65ebd44a1c6bb9718b289/src/timeline.ts

import { asyncQuerySelector } from "async-query";
import { v4 as uuidv4 } from "uuid";

export interface Tweet extends HTMLElement { }

interface TimelineOptions {
    /**
     * The maximum time to wait for the timeline element to be found.
     * @default 10000
     */
    timeoutMs: number;
}

/**
 * A class that observes the timeline and calls a callback when a new tweet is added.
 */
class Timeline {
    private readonly OBSERVER_OPTIONS = {
        childList: true,
        subtree: true
    } as const;

    private onNewTweetCallback: ((tweet: Tweet) => void) | null = null;

    /**
     * A class that observes the timeline and calls a callback when a new tweet is added.
     * @param options Options for the timeline observer.
     */
    public constructor(options?: Partial<TimelineOptions>) {
        // Generate a unique data attribute name for each instance.
        const checkedDataAttribute = `twi-ext-checked${uuidv4()}`;

        const defaultOptions: TimelineOptions = {
            timeoutMs: 10000
        } as const;
        const mergedOptions = { ...defaultOptions, ...options };

        const timelineObserver = new MutationObserver(() => {
            if (!this.onNewTweetCallback) return;

            const tweets = document.querySelectorAll<HTMLElement>(
                `.css-175oi2r.r-1igl3o0.r-qklmqi.r-1adg3ll.r-1ny4l3l:not([${checkedDataAttribute}])`
            );
            if (!tweets.length) return;

            for (const tweet of tweets) {
                const nestedDiv = tweet.querySelector('div.css-175oi2r');
                if (nestedDiv instanceof HTMLElement) {
                    tweet.setAttribute(checkedDataAttribute, "");
                    this.onNewTweetCallback(nestedDiv);
                }
            }
        });

        void asyncQuerySelector("main", document, mergedOptions.timeoutMs).then((main) => {
            if (!main) throw new Error("twi-ext: Failed to get main element");

            timelineObserver.observe(main, this.OBSERVER_OPTIONS);
        });
    }

    /**
     * Set a callback that is called when a new tweet is added.
     * @param callback A callback that is called when a new tweet is added.
     */
    public onNewTweet(callback: (tweet: Tweet) => void): void {
        this.onNewTweetCallback = callback;
    }
}

export { Timeline };
