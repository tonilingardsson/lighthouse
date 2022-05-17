# User Flows in Lighthouse

Historically, Lighthouse has analyzed the cold pageload of a page. Starting in 2022 (Lighthouse v10), it can analyze and report on the entire page lifecycle via "user flows".

#### You might be interested in flows if…

* … you want to run Lighthouse on your whole webapp, not just the landing page.
* … you want to know if the checkout process is accessible.
* … you want to know the Cumulative Layout Shift of my SPA page transition

In these cases, you want Lighthouse on a _flow_, not just a page load.

## The three modes: Navigation, Timespan, Snapshot

Lighthouse can now run in three modes: navigations, timespans, and snapshots. Each mode has its own unique use cases, benefits, and limitations. Later, you'll create a flow by combining these three core report types.

* **Navigation mode** analyzes a single page load. Prior to v10, all Lighthouse runs were essentially in this mode.
* **Timespan mode** analyzes an arbitrary period of time, typically containing user interactions.
* **Snapshot mode** analyzes the page in a particular state.

| | Navigation | Timespan | Snapshot |
|-|-|-|-|
| | <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 241 240"><g clip-path="url(#a)"><rect x=".5" width="240" height="240" rx="120" fill="#fff"/><rect x="42.5" width="24" height="240" rx="12" fill="#F1F3F4"/><circle cx="54.5" cy="120" r="16" fill="#fff" stroke="#1A73E8" stroke-width="4"/><path fill="#DADCE0" d="M52.5-4h4V96h-4zM52.5 144h4v100h-4z"/><rect x="82.5" y="80" width="120" height="80" rx="6" fill="#DEF"/><path d="M82.5 86a6 6 0 0 1 6-6h108a6 6 0 0 1 6 6v14h-120V86Z" fill="#BDF"/><circle cx="93.5" cy="90" r="3" fill="#fff"/><circle cx="105.5" cy="90" r="3" fill="#fff"/><circle cx="117.5" cy="90" r="3" fill="#fff"/><rect x="168.5" y="126" width="48" height="48" rx="24" fill="#fff"/><g clip-path="url(#b)"><circle cx="192.5" cy="150" r="20" fill="#0DCE6B" fill-opacity=".08"/><circle cx="192.5" cy="150" r="20" stroke="#0DCE6B"/><mask id="c" fill="#fff"><path d="M192.5 131c0-.552.448-1.003 1-.975a20 20 0 1 1-5.725.541.963.963 0 0 1 1.165.771c.103.542-.254 1.063-.79 1.196a18.002 18.002 0 0 0-6.794 31.603 18 18 0 1 0 12.144-32.108c-.552-.031-1-.476-1-1.028Z"/></mask><path d="M192.5 131c0-.552.448-1.003 1-.975a20 20 0 1 1-5.725.541.963.963 0 0 1 1.165.771c.103.542-.254 1.063-.79 1.196a18.002 18.002 0 0 0-6.794 31.603 18 18 0 1 0 12.144-32.108c-.552-.031-1-.476-1-1.028Z" stroke="#0DCE6B" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" mask="url(#c)"/><path d="m187.737 155.288-1.344-.928 1.248-1.76 1.248-1.76-.064-.064a1.918 1.918 0 0 1-.496.208c-.192.043-.4.064-.624.064a3.216 3.216 0 0 1-1.616-.448 3.772 3.772 0 0 1-1.264-1.264c-.33-.533-.496-1.147-.496-1.84 0-.683.176-1.301.528-1.856a3.913 3.913 0 0 1 1.392-1.344 3.693 3.693 0 0 1 1.872-.496c.598 0 1.131.112 1.6.336.48.213.891.496 1.232.848.672.715 1.008 1.568 1.008 2.56a4.3 4.3 0 0 1-.432 1.92 12.3 12.3 0 0 1-1.04 1.776c-.458.672-.917 1.349-1.376 2.032a109.29 109.29 0 0 1-1.376 2.016Zm.416-5.712c.374 0 .72-.091 1.04-.272.32-.181.576-.427.768-.736.203-.32.304-.683.304-1.088a1.96 1.96 0 0 0-.288-1.056 2.038 2.038 0 0 0-.784-.752 2.076 2.076 0 0 0-1.04-.272c-.384 0-.736.091-1.056.272-.32.181-.576.432-.768.752a1.96 1.96 0 0 0-.288 1.056c0 .405.096.768.288 1.088.203.309.464.555.784.736.32.181.667.272 1.04.272Zm7.286 5.68-1.488-.8c.8-1.451 1.605-2.901 2.416-4.352a1735.51 1735.51 0 0 0 2.416-4.368l-.032-.048h-5.328v-1.632h7.248v1.728l-2.624 4.736c-.864 1.579-1.733 3.157-2.608 4.736Z" fill="#1E8E3E"/></g><circle cx="142.5" cy="130" r="16" fill="#7CB1F3"/><path d="m150.63 123.41-1.41-1.41-9.19 9.19-4.25-4.24-1.41 1.41 5.66 5.66 10.6-10.61ZM149.5 136h-14v2h14v-2Z" fill="#fff"/><path d="m107 73.5-8.5-14M127 167l-8 14.5" stroke="#000" stroke-dasharray="2 2"/><path d="M85.5 51a8 8 0 1 1 16 0 8 8 0 0 1-16 0Z" fill="#fff"/><circle cx="93.5" cy="51" r="5" fill="#0CCE6A"/><path d="M105.5 190a8 8 0 1 1 16 0 8 8 0 0 1-16 0Z" fill="#fff"/><path fill="#FFA400" d="M109 185.5h9v9h-9z"/><path d="m171.5 73.5 5-9" stroke="#000" stroke-dasharray="2 2"/><path d="M172.5 54a8 8 0 1 1 16 0 8 8 0 0 1-16 0Z" fill="#fff"/><path d="m180.5 48.5 6 10h-12l6-10Z" fill="#FF4E43"/><path d="m223.129 138.045-4.734 1.108m-1.687-12.864-4.199 3.631m-6.221-11.89-.886 4.707" stroke="#3C4043" stroke-dasharray="2 2"/></g><defs><clipPath id="a"><rect x=".5" width="240" height="240" rx="120" fill="#fff"/></clipPath><clipPath id="b"><path fill="#fff" transform="translate(172.5 130)" d="M0 0h40v40H0z"/></clipPath></defs></svg> | <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 241 240"><rect x=".5" width="240" height="240" rx="120" fill="#fff"/><rect x="42.5" width="24" height="240" rx="12" fill="#F1F3F4"/><path fill="#1A73E8" d="M52.5 60h4v120h-4z"/><path fill="#DADCE0" d="M52.5 0h4v28h-4zM52.5 212h4v28h-4z"/><circle cx="54.5" cy="44" r="10" fill="#fff" stroke="#DADCE0" stroke-width="4"/><circle cx="54.5" cy="196" r="10" fill="#fff" stroke="#DADCE0" stroke-width="4"/><path d="M30.854 60.646a.5.5 0 0 0-.708 0l-3.181 3.182a.5.5 0 1 0 .707.707l2.828-2.828 2.828 2.828a.5.5 0 1 0 .707-.707l-3.181-3.182Zm-.708 118.708a.5.5 0 0 0 .708 0l3.181-3.182a.501.501 0 0 0-.707-.708l-2.828 2.829-2.828-2.829a.5.5 0 0 0-.707.708l3.181 3.182ZM30 61v.983h1V61h-1Zm0 2.95v1.967h1V63.95h-1Zm0 3.933v1.967h1v-1.967h-1Zm0 3.934v1.966h1v-1.966h-1Zm0 3.933v1.967h1V75.75h-1Zm0 3.933v1.967h1v-1.967h-1Zm0 3.934v1.966h1v-1.966h-1Zm0 3.933v1.967h1V87.55h-1Zm0 3.933v1.967h1v-1.967h-1Zm0 3.934v1.966h1v-1.966h-1Zm0 3.933v1.967h1V99.35h-1Zm0 3.933v1.967h1v-1.967h-1Zm0 3.934v1.966h1v-1.966h-1Zm0 3.933v1.967h1v-1.967h-1Zm0 3.933v1.967h1v-1.967h-1Zm0 3.934v1.966h1v-1.966h-1Zm0 3.933v1.967h1v-1.967h-1Zm0 3.933v1.967h1v-1.967h-1Zm0 3.934v1.966h1v-1.966h-1Zm0 3.933v1.967h1v-1.967h-1Zm0 3.933v1.967h1v-1.967h-1Zm0 3.934v1.966h1v-1.966h-1Zm0 3.933v1.967h1v-1.967h-1Zm0 3.933v1.967h1v-1.967h-1Zm0 3.934v1.966h1v-1.966h-1Zm0 3.933v1.967h1v-1.967h-1Zm0 3.933v1.967h1v-1.967h-1Zm0 3.934v1.966h1v-1.966h-1Zm0 3.933v1.967h1v-1.967h-1Zm0 3.933v1.967h1v-1.967h-1Zm0 3.934V179h1v-.983h-1Z" fill="#3C4043"/><rect x="82.5" y="80" width="120" height="80" rx="6" fill="#DEF"/><path d="M82.5 86a6 6 0 0 1 6-6h108a6 6 0 0 1 6 6v14h-120V86Z" fill="#BDF"/><circle cx="93.5" cy="90" r="3" fill="#fff"/><circle cx="105.5" cy="90" r="3" fill="#fff"/><circle cx="117.5" cy="90" r="3" fill="#fff"/><path opacity=".5" d="M104.899 119.228c-1.794 5.008-3.292 16.366 5.065 21.737 10.447 6.712 38.172-15.604 25.51-25.194-12.663-9.59-26.46 22.636-11.264 28.07 12.156 4.348 26.592-4.581 32.29-9.589" stroke="#1A73E8" stroke-dasharray="2 2"/><g opacity=".5" fill="#1A73E8"><path d="M166.833 111h2.667v4h-2.667v-4Zm-10.666 12v-2.667h4V123h-4Zm9.333-4c1.133 4.133 2.867 9.2 4 13.333l1.653-5 6.347 6.334 2.667-2.667-6.267-6.267 4.933-1.733c-4.133-1.133-9.2-2.8-13.333-4ZM161.66 125.667l1.88 1.88-2.827 2.826-1.88-1.88 2.827-2.826Zm-2.827-10.827 1.88-1.88 2.827 2.827-1.88 1.88-2.827-2.827Zm16.787-1.893 1.88 1.88a591.696 591.696 0 0 1-2.827 2.84l-1.88-1.88c1.36-1.374 1.454-1.467 2.827-2.84Z"/></g><path d="m107 73.5-8.5-14M127 167l-8 14.5" stroke="#3C4043" stroke-dasharray="2 2"/><path d="M85.5 51a8 8 0 1 1 16 0 8 8 0 0 1-16 0Z" fill="#fff"/><circle cx="93.5" cy="51" r="5" fill="#0CCE6A"/><path d="M105.5 190a8 8 0 1 1 16 0 8 8 0 0 1-16 0Z" fill="#fff"/><path fill="#FFA400" d="M109 185.5h9v9h-9z"/><path d="m171.5 73.5 5-9" stroke="#3C4043" stroke-dasharray="2 2"/><path d="M172.5 54a8 8 0 1 1 16 0 8 8 0 0 1-16 0Z" fill="#fff"/><path d="m180.5 48.5 6 10h-12l6-10Z" fill="#FF4E43"/></svg> | <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 241 240"><rect x=".5" width="240" height="240" rx="120" fill="#fff"/><circle cx="30.5" cy="106" r="11.5" stroke="#3C4043" stroke-dasharray="2 2"/><path d="M30.5 100v6m0 6v-6m0 0h-6 12" stroke="#3C4043"/><rect x="42.5" width="24" height="240" rx="12" fill="#F1F3F4"/><path fill="#DADCE0" d="M52.5 60h4v120h-4z"/><path d="M33.5 120c0-11.598 9.402-21 21-21s21 9.402 21 21-9.402 21-21 21-21-9.402-21-21Z" fill="#fff"/><path fill-rule="evenodd" clip-rule="evenodd" d="m58.438 102.955-.14-.07-.018.035a17.965 17.965 0 0 0-3.78-.42c-9.66 0-17.5 7.84-17.5 17.5s7.84 17.5 17.5 17.5S72 129.66 72 120c0-8.312-5.793-15.26-13.563-17.045Zm9.03 11.795H53.484l4.742-8.225c4.2 1.155 7.613 4.235 9.24 8.225Zm-11.043-8.61A14.12 14.12 0 0 0 54.5 106c-3.815 0-7.28 1.54-9.8 4.025l4.76 8.225 6.965-12.11Zm-12.95 5.268 4.97 8.592 2.013 3.5h-9.503a14.42 14.42 0 0 1-.455-3.5c0-3.238 1.12-6.212 2.975-8.592Zm-1.943 13.842a14.059 14.059 0 0 0 9.223 8.225l4.742-8.225H41.532Zm11.043 8.592 6.982-12.092 4.76 8.225C61.78 132.46 58.315 134 54.5 134c-.665 0-1.295-.07-1.925-.158Zm5.95-17.342 7 12.092c1.855-2.38 2.975-5.354 2.975-8.592 0-1.208-.175-2.38-.472-3.5h-9.503Z" fill="#1A73E8"/><path fill="#DADCE0" d="M52.5 0h4v28h-4zM52.5 212h4v28h-4z"/><circle cx="54.5" cy="44" r="10" fill="#fff" stroke="#DADCE0" stroke-width="4"/><circle cx="54.5" cy="196" r="10" fill="#fff" stroke="#DADCE0" stroke-width="4"/><rect x="82.5" y="80" width="120" height="80" rx="6" fill="#DEF"/><path d="M82.5 86a6 6 0 0 1 6-6h108a6 6 0 0 1 6 6v14h-120V86Z" fill="#BDF"/><circle cx="93.5" cy="90" r="3" fill="#fff"/><circle cx="105.5" cy="90" r="3" fill="#fff"/><circle cx="117.5" cy="90" r="3" fill="#fff"/><circle cx="142.5" cy="130" r="16" fill="#7CB1F3"/><path fill-rule="evenodd" clip-rule="evenodd" d="M138.14 132.36c-.5-.23-1.05-.36-1.64-.36-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4c0-.59-.13-1.14-.36-1.64l2.36-2.36 2.36 2.36c-.23.5-.36 1.05-.36 1.64 0 2.21 1.79 4 4 4s4-1.79 4-4-1.79-4-4-4c-.59 0-1.14.13-1.64.36L144.5 130l7-7v-3h-1l-12.36 12.36Zm.36 3.64a2 2 0 1 1-3.999.001A2 2 0 0 1 138.5 136Zm10 2a2 2 0 1 0 .001-3.999A2 2 0 0 0 148.5 138Zm-5.5-8c0 .28-.22.5-.5.5s-.5-.22-.5-.5.22-.5.5-.5.5.22.5.5Zm-3.5-1-6-6v-3h1l7 7-2 2Z" fill="#fff"/><path d="M92.5 120v-10h15m-15 30v10h15m70 0h15v-10m0-20v-10h-15" stroke="#BDF" stroke-width="4" stroke-linejoin="round"/><path d="m107 73.5-8.5-14M127 167l-8 14.5" stroke="#3C4043" stroke-dasharray="2 2"/><path d="M85.5 51a8 8 0 1 1 16 0 8 8 0 0 1-16 0Z" fill="#fff"/><circle cx="93.5" cy="51" r="5" fill="#0CCE6A"/><path d="M105.5 190a8 8 0 1 1 16 0 8 8 0 0 1-16 0Z" fill="#fff"/><path fill="#FFA400" d="M109 185.5h9v9h-9z"/><path d="m171.5 73.5 5-9" stroke="#3C4043" stroke-dasharray="2 2"/><path d="M172.5 54a8 8 0 1 1 16 0 8 8 0 0 1-16 0Z" fill="#fff"/><path d="m180.5 48.5 6 10h-12l6-10Z" fill="#FF4E43"/></svg> |
| | ✅ Provides an overall performance score and all metrics.<br>✅ Contains the most advice of all report types (both time-based and state-based audits are available).<br>🤔 Cannot analyze form submissions or single page app transitions.<br>🤔 Cannot analyze content that isn't available immediately on page load.<br>👍 Obtain a Lighthouse Performance score.<br>👍 Measure Performance metrics (First Contentful Paint, Largest Contentful Paint, Speed Index, Time to Interactive, Cumulative Layout Shift, Total Blocking Time).<br>👍 Assess Progressive Web App capabilities.| ✅ Provides range-based metrics such as Total Blocking Time and Cumulative Layout Shift.<br>✅ Analyzes any period of time, including user interactions or single page app transitions.<br>🤔 Does not provide an overall performance score.<br>🤔 Cannot analyze moment-based performance metrics (e.g. Largest Contentful Paint).<br>🤔 Cannot analyze state-of-the-page issues (e.g. no Accessibility category)<br>👍 Measure layout shifts and JavaScript execution time on a series of interactions.<br>👍 Discover performance opportunities to improve the experience for long-lived pages and SPAs. | ✅ Analyzes the page in its current state.<br>🤔 Does not provide an overall performance score or metrics.<br>🤔 Cannot analyze any issues outside the current DOM (e.g. no network, main-thread, or performance analysis).<br>👍 Find accessibility issues in single page applications or complex forms.<br>👍 Evaluate best practices of menus and UI elements hidden behind interaction. |
| | | | |
| | | | |
| | | | |





### Navigation

Navigation reports analyze a single page load. Navigation is the most common type of report you'll see. In fact, all Lighthouse reports prior to v9 are navigation reports.

#### Benefits

✅ Provides an overall performance score and all metrics.
✅ Contains the most advice of all report types (both time-based and state-based audits are available).
🤔 Cannot analyze form submissions or single page app transitions.
🤔 Cannot analyze content that isn't available immediately on page load.
👍 Obtain a Lighthouse Performance score.
👍 Measure Performance metrics (First Contentful Paint, Largest Contentful Paint, Speed Index, Time to Interactive, Cumulative Layout Shift, Total Blocking Time).
👍 Assess Progressive Web App capabilities.

#### Triggering a navigation via user interactions

Instead of providing a URL to navigate to, you can provide a callback function. This is useful when you want to audit a navigation where the destination is unknown before navigating.

> Aside: Lighthouse typically clears out any active Service Worker and Cache Storage for the origin under test. However, in this case, as it doesn't know the URL being analyzed, Lighthouse cannot clear this storage. This generally reflects the real user experience, but if you still wish to clear the Service Workers and Cache Storage you must do it manually.

This callback function _must_ perform an action that will trigger a navigation. Any interactions completed before the callback promise resolves will be captured by the navigation.

#### How to Use

<details>
<summary>
DevTools
</summary>

1. Go to the page you want to test
2. Select "Navigation (Default)" as your mode
3. Click "Analyze page load"

> Note: DevTools only generates a report for a standalone navigation, it cannot be combined with other steps in a user flow report.

![Lighthouse DevTools panel in navigation mode](https://user-images.githubusercontent.com/6752989/168673207-1e901e72-3461-4bae-a581-e80963beea54.png)
</details>

<details>
<summary>Node API</summary>

```js
import {writeFileSync} from 'fs';
import puppeteer from 'puppeteer';
import api from 'lighthouse/lighthouse-core/fraggle-rock/api.js';

async function main() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const flow = await api.startFlow(page);

  // Navigate with a URL
  await flow.navigate('https://example.com');

  // Navigate with a callback function
  await flow.navigate(async () => {
    await page.click('a.link');
  });

  await browser.close();

  writeFileSync('report.html', await flow.generateReport());
}

main();
```
</details>
<br>

### Timespan

Timespan reports analyze an arbitrary period of time, typically containing user interactions, and have similar use cases to the Performance Panel in DevTools.

#### Benefits

✅ Provides range-based metrics such as Total Blocking Time and Cumulative Layout Shift.<br>✅ Analyzes any period of time, including user interactions or single page app transitions.<br>🤔 Does not provide an overall performance score.<br>🤔 Cannot analyze moment-based performance metrics (e.g. Largest Contentful Paint).<br>🤔 Cannot analyze state-of-the-page issues (e.g. no Accessibility category)<br>👍 Measure layout shifts and JavaScript execution time on a series of interactions.<br>👍 Discover performance opportunities to improve the experience for long-lived pages and SPAs.
#### How to use

<details>
<summary>
DevTools
</summary>

1. Go to the page you want to test
2. Select "Timespan" as your mode
3. Click "Start timespan"
4. Interact with the page
5. Click "End timespan"

> Note: DevTools only generates a report for a standalone timespan, it cannot be combined with other steps in a user flow report.

![Lighthouse DevTools panel in timespan mode](https://user-images.githubusercontent.com/6752989/168679184-b7eff86a-a141-414d-b76a-4da78a165aa8.png)
</details>

<details>
<summary>Node API</summary>

```js
import {writeFileSync} from 'fs';
import puppeteer from 'puppeteer';
import api from 'lighthouse/lighthouse-core/fraggle-rock/api.js';

async function main() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://example.com');
  const flow = await api.startFlow(page);

  await flow.beginTimespan();
  await page.type('#username', 'lighthouse');
  await page.type('#password', 'L1ghth0useR0cks!');
  await page.click('#login');
  await page.waitForSelector('#dashboard');
  await flow.endTimespan();

  await browser.close();

  writeFileSync('report.html', await flow.generateReport());
}

main();
```
</details>
<br>

### Snapshot

Snapshot reports analyze the page in a particular state, typically after the user has interacted with it, and have similar use cases to the Elements Panel in DevTools.

#### Benefits

✅ Analyzes the page in its current state.<br>🤔 Does not provide an overall performance score or metrics.<br>🤔 Cannot analyze any issues outside the current DOM (e.g. no network, main-thread, or performance analysis).<br>👍 Find accessibility issues in single page applications or complex forms.<br>👍 Evaluate best practices of menus and UI elements hidden behind interaction.
#### How to use

<details>
<summary>
DevTools
</summary>

1. Go to the page you want to test
2. Interact with the page so it's in a state you want to test
3. Select "Snapshot" as your mode
4. Click "Analyze page state".

> Note: DevTools only generates a report for a standalone snapshot, it cannot be combined with other steps in a user flow report.

<img width="1203" alt="Screen Shot 2022-05-16 at 1 30 08 PM" src="https://user-images.githubusercontent.com/6752989/168677313-8be0591a-8e17-488c-b602-b47e487a75a3.png">
</details>

<details>
<summary>Node API</summary>

```js
import {writeFileSync} from 'fs';
import puppeteer from 'puppeteer';
import api from 'lighthouse/lighthouse-core/fraggle-rock/api.js';

async function main() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://example.com');
  const flow = await api.startFlow(page);

  await page.click('#expand-sidebar');
  await flow.snapshot();

  await browser.close();

  writeFileSync('report.html', await flow.generateReport());
}

main();
```
</details>
<br>

## Creating a Flow

So far we've seen individual Lighthouse modes in action. The true power of flows comes from combining these building blocks into a comprehensive flow to capture the user's entire experience.

### Selecting Boundaries

When mapping a user flow onto the Lighthouse modes, strive for each report to have a narrow focus. This will make debugging much easier when you have issues to fix! Use the following guide when crafting your timespan and snapshot checkpoints.

![image](https://user-images.githubusercontent.com/2301202/135167873-4a867444-55c3-4bfb-814b-0a536bf4ddef.png)


1. `.navigate` to the URL of interest, proceed to step 2.
2. Are you interacting with the page?
    1. Yes - Proceed to step 3.
    2. No - End your flow.
3. Are you clicking a link?
    1. Yes - Proceed to step 1.
    2. No - Proceed to step 4.
4. `.startTimespan`, proceed to step 5.
5. Has the page or URL changed significantly during the timespan?
    1. Yes - Proceed to step 6.
    2. No - Either wait for a significant change or end your flow.
6. `.stopTimespan`, proceed to step 7.
7. `.snapshot`, proceed to step 2.


The below example codifies a user flow for an ecommerce site where the user navigates to the homepage, searches for a product, and clicks on the detail link.

![Lighthouse User Flows Diagram](https://user-images.githubusercontent.com/6752989/168678568-69aaa82f-0459-4c2a-8f46-467d7f06d237.png)

### Complete user Flow Code

```js
import {writeFileSync} from 'fs';
import puppeteer from 'puppeteer';
import * as pptrTestingLibrary from 'pptr-testing-library';
import api from 'lighthouse/lighthouse-core/fraggle-rock/api.js';

const {getDocument, queries} = pptrTestingLibrary;

async function search(page) {
  const $document = await getDocument(page);
  const $searchBox = await queries.getByLabelText($document, /type to search/i);
  await $searchBox.type('Xbox Series X');
  await Promise.all([
    $searchBox.press('Enter'),
    page.waitForNavigation({waitUntil: ['load', 'networkidle2']}),
  ]);
}

async function main() {
  // Setup the browser and Lighthouse.
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const flow = await api.startFlow(page);

  // Phase 1 - Navigate to our landing page.
  await flow.navigate('https://www.bestbuy.com');

  // Phase 2 - Interact with the page and submit the search form.
  await flow.startTimespan();
  await search(page);
  await flow.endTimespan();

  // Phase 3 - Analyze the new state.
  await flow.snapshot();

  // Phase 4 - Navigate to a detail page.
  await flow.navigate(async () => {
    const $document = await getDocument(page);
    const $link = await queries.getByText($document, /Xbox Series X 1TB Console/);
    $link.click();
  });

  // Get the comprehensive flow report.
  writeFileSync('report.html', await flow.generateReport());
  // Save results as JSON.
  writeFileSync('flow-result.json', JSON.stringify(await flow.createFlowResult(), null, 2));

  // Cleanup.
  await browser.close();
}

main();
```

## Tips and Tricks

- Keep timespan recordings _short_ and focused on a single interaction sequence or page transition.
- Use snapshot recordings when a substantial portion of the page content has changed.
- Always wait for transitions and interactions to finish before ending a timespan. `page.waitForSelector`/`page.waitForFunction`/`page.waitForResponse`/`page.waitForTimeout` are your friends here.

## Related Reading

- [User Flows Issue](https://github.com/GoogleChrome/lighthouse/issues/11313)
- [User Flows Design Document](https://docs.google.com/document/d/1fRCh_NVK82YmIi1Zq8y73_p79d-FdnKsvaxMy0xIpNw/edit#heading=h.b84um9ao7pg7)
- [User Flows Timeline Diagram](https://docs.google.com/drawings/d/1jr9smqqSPsLkzZDEyFj6bvLFqi2OUp7_NxqBnqkT4Es/edit?usp=sharing)
- [User Flows Decision Tree Diagram](https://whimsical.com/lighthouse-flows-decision-tree-9qPyfx4syirwRFH7zdUw8c)
