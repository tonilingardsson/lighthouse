# User Flows in Lighthouse

Historically, Lighthouse has analyzed the cold pageload of a page. Starting in 2022 (Lighthouse v10), it can analyze and report on the entire page lifecycle via "user flows".

#### You might be interested in flows if…

* … you want to run Lighthouse on your whole webapp, not just the landing page.
* … you want to know if the checkout process is accessible.
* … you want to know the Cumulative Layout Shift of my SPA page transition

In these cases, you want Lighthouse on a _flow_, not just a page load.

## The three modes: Navigation, Timespan, Snapshot

Lighthouse can now run in three modes: navigations, timespans, and snapshots. Each mode has its own unique use cases, benefits, and limitations. Later, you'll create a flow by combining these three core report types.

* <img src="https://user-images.githubusercontent.com/39191/168928225-f2157fda-5131-4bd0-9121-b1a0b2f869a7.png" height="80" align="middle"> **Navigation mode** analyzes a single page load. Prior to v10, all Lighthouse runs were essentially in this mode.
* <img src="https://user-images.githubusercontent.com/39191/168928251-c7025cd5-0086-4db8-ae52-95a5b5675adf.png" height="80" align="middle"> **Timespan mode** analyzes an arbitrary period of time, typically containing user interactions.
* <img src="https://user-images.githubusercontent.com/39191/168931653-b45e0b6b-c5bd-4d8d-85b6-fee8425186a0.png" height="80" align="middle"> **Snapshot mode** analyzes the page in a particular state.


|---|---|
| Navigation | <small> *Benefits* <br> ✅ Provides an overall performance score and all metrics.<br>✅ Contains the most advice of all report types (both time-based and state-based audits are available).<br> *Limitations* <br> 🤔 Cannot analyze form submissions or single page app transitions.<br>🤔 Cannot analyze content that isn't available immediately on page load.<br> *Use Cases* <br> 👍 Obtain a Lighthouse Performance score.<br>👍 Measure Performance metrics (First Contentful Paint, Largest Contentful Paint, Speed Index, Time to Interactive, Cumulative Layout Shift, Total Blocking Time).<br>👍 Assess Progressive Web App capabilities.</small> |
| Timespan | <small> *Benefits* <br> ✅ Provides range-based metrics such as Total Blocking Time and Cumulative Layout Shift.<br>✅ Analyzes any period of time, including user interactions or single page app transitions.<br> *Limitations* <br> 🤔 Does not provide an overall performance score.<br>🤔 Cannot analyze moment-based performance metrics (e.g. Largest Contentful Paint).<br>🤔 Cannot analyze state-of-the-page issues (e.g. no Accessibility category)<br> *Use Cases* <br> 👍 Measure layout shifts and JavaScript execution time on a series of interactions.<br>👍 Discover performance opportunities to improve the experience for long-lived pages and SPAs. |
| Snapshot | <small> *Benefits* <br>  ✅ Analyzes the page in its current state.<br> *Limitations* <br> 🤔 Does not provide an overall performance score or metrics.<br>🤔 Cannot analyze any issues outside the current DOM (e.g. no network, main-thread, or performance analysis).<br> *Use Cases* <br> 👍 Find accessibility issues in single page applications or complex forms.<br>👍 Evaluate best practices of menus and UI elements hidden behind interaction. |





### Navigation mode

In DevTools, navigation is easy: ensure it's the selected mode and then click _Analyze page load_.

![navdt](https://user-images.githubusercontent.com/39191/168929174-11311144-ce9b-4124-9a52-0423a073b9fe.png)

> Note: DevTools only generates a report for a standalone navigation. To combine it with other steps for a multi-step user flow report, [use the Node API](#creating-a-flow).

#### Navigations in the Node.js API

```js
import {writeFileSync} from 'fs';
import puppeteer from 'puppeteer';
import lighthouse from 'lighthouse/lighthouse-core/fraggle-rock/api.js';

(async function() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const flow = await lighthouse.startFlow(page);

  // Navigate with a URL
  await flow.navigate('https://example.com');

  // Interaction-initiated navigation via a callback function
  await flow.navigate(async () => {
    await page.click('a.link');
  });

  await browser.close();
  writeFileSync('report.html', await flow.generateReport());
})();
```

##### Triggering a navigation via user interactions

Instead of providing a URL to navigate to, you can provide a callback function, as seen above. This is useful when you want to audit a navigation that's initiated by a scenario like a button click or form submission.

> Aside: Lighthouse typically clears out any active Service Worker and Cache Storage for the origin under test. However, in this case, as it doesn't know the URL being analyzed, Lighthouse cannot clear this storage. This generally reflects the real user experience, but if you still wish to clear the Service Workers and Cache Storage you must do it manually.

This callback function _must_ perform an action that will trigger a navigation. Any interactions completed before the callback promise resolves will be captured by the navigation.



### Timespan

In DevTools, select "Timespan" as the mode and click _Start timespan_. Record whatever timerange or interactions is desired and then click _End timespan_.

![timespandt](https://user-images.githubusercontent.com/39191/168929168-ac45d198-f609-4acb-86a7-51775578c8e0.png)

#### Timespans in the Node.js API

```js
import {writeFileSync} from 'fs';
import puppeteer from 'puppeteer';
import lighthouse from 'lighthouse/lighthouse-core/fraggle-rock/api.js';

(async function() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://secret.login');
  const flow = await lighthouse.startFlow(page);

  await flow.beginTimespan();
  await page.type('#password', 'L1ghth0useR0cks!');
  await page.click('#login');
  await page.waitForSelector('#dashboard');
  await flow.endTimespan();

  await browser.close();
  writeFileSync('report.html', await flow.generateReport());
})();
```

### Snapshot

In DevTools, select "Snapshot" as the mode. Set up the page in the state you want to evaluate. Then, click _Analyze page state_.

![snapshotdt](https://user-images.githubusercontent.com/39191/168929172-92a70108-a053-4dda-b719-2900b9d3d956.png)

#### Snapshots in the Node.js API


```js
import {writeFileSync} from 'fs';
import puppeteer from 'puppeteer';
import lighthouse from 'lighthouse/lighthouse-core/fraggle-rock/api.js';

(async function() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://example.com');
  const flow = await lighthouse.startFlow(page);

  await page.click('#expand-sidebar');
  await flow.snapshot();

  await browser.close();
  writeFileSync('report.html', await flow.generateReport());
})();
```

## Creating a Flow

<img src="https://user-images.githubusercontent.com/39191/168931109-5ae80620-7464-4d98-a834-71169a5b6a61.png" height=300>


So far we've seen individual Lighthouse modes in action. The true power of flows comes from combining these building blocks into a comprehensive flow to capture the user's entire experience. Analyzing a multi-step user flow is currently only available [using the Lighthouse Node API along with Puppeteer](https://web.dev/lighthouse-user-flows/).

When mapping a user flow onto the Lighthouse modes, strive for each report to have a narrow focus. This will make debugging much easier when you have issues to fix!

--------

The below example codifies a user flow for an ecommerce site where the user navigates to the homepage, searches for a product, and clicks on the detail link.

<img alt="Lighthouse User Flows Diagram" src="https://user-images.githubusercontent.com/39191/168932574-944757d8-d110-4777-a01f-0ec27d65719a.png" height="550">

### Complete user Flow Code

```js
import {writeFileSync} from 'fs';
import puppeteer from 'puppeteer';
import * as pptrTestingLibrary from 'pptr-testing-library';
import lighthouse from 'lighthouse/lighthouse-core/fraggle-rock/api.js';

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

(async function() {
  // Setup the browser and Lighthouse.
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const flow = await lighthouse.startFlow(page);

  // Phase 1 - Navigate to the landing page.
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
})();
```

As this flow has multiple steps, the flow report summarizes everything and allows you to investigate each aspect in more detail.

![Full flow report screenshot](https://user-images.githubusercontent.com/39191/168932301-cfdbe812-db96-4c6d-b43b-fe5c31f9d192.png)


## Tips and Tricks

- Keep timespan recordings _short_ and focused on a single interaction sequence or page transition.
- Use snapshot recordings when a substantial portion of the page content has changed.
- Always wait for transitions and interactions to finish before ending a timespan. The puppeteer APIs `page.waitForSelector`/`page.waitForFunction`/`page.waitForResponse`/`page.waitForTimeout` are your friends here.

## Related Reading

- [User Flows Issue](https://github.com/GoogleChrome/lighthouse/issues/11313)
- [User Flows Design Document](https://docs.google.com/document/d/1fRCh_NVK82YmIi1Zq8y73_p79d-FdnKsvaxMy0xIpNw/edit#heading=h.b84um9ao7pg7)
- [User Flows Timeline Diagram](https://docs.google.com/drawings/d/1jr9smqqSPsLkzZDEyFj6bvLFqi2OUp7_NxqBnqkT4Es/edit?usp=sharing)
- [User Flows Decision Tree Diagram](https://whimsical.com/lighthouse-flows-decision-tree-9qPyfx4syirwRFH7zdUw8c)
