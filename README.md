# twitter-age-bypass

Chrome extension to circumvent Twitter's 18+ age limit

## Core Concept

- Listen for tweets and get React Props to obtain tweet IDs.
- Based on the tweet ID, a request is made to a dedicated API that wraps the internal API, and the response is embedded in the UI.
