// Copyright 2017 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

(async function() {
  TestRunner.addResult('Tests that audits panel works when only the pwa category is selected.\n');
  await TestRunner.navigatePromise('resources/lighthouse-basic.html');

  await TestRunner.loadTestModule('lighthouse_test_runner');
  await TestRunner.showPanel('lighthouse');

  const containerElement = LighthouseTestRunner.getContainerElement();
  const ensureDisabledNames = ['Performance', 'Accessibility', 'Best practices', 'SEO'];
  const checkboxes = Array.from(containerElement.querySelectorAll('.checkbox'));
  for (const checkbox of checkboxes) {
    if (!ensureDisabledNames.includes(checkbox.textElement.textContent)) {
      continue;
    }

    if (checkbox.checkboxElement.checked) {
      checkbox.checkboxElement.click();
    }
  }

  LighthouseTestRunner.dumpStartAuditState();
  LighthouseTestRunner.getRunButton().click();

  const {lhr} = await LighthouseTestRunner.waitForResults();
  TestRunner.addResult('\n=============== Audits run ===============');
  TestRunner.addResult(Object.keys(lhr.audits).sort().join('\n'));

  TestRunner.completeTest();
})();
