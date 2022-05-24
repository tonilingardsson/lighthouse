/**
 * @license Copyright 2021 The Lighthouse Authors. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
 */

// option a
// import {h} from 'preact';
// import {render} from '@testing-library/preact';

// option b
import {h, render} from 'preact';

import {Markdown} from '../../src/wrappers/markdown';
import '../setup/env-setup';

describe('Markdown', () => {
  it('renders markdown text', () => {
    // option a
    // const root = render(<Markdown text="Some `fancy` text"/>);
    // const text = root.getByText(/^Some.*text$/);
    // expect(text.innerHTML).toEqual('Some <code>fancy</code> text');

    // option b
    const el = document.createElement('div');
    render(<Markdown text="Some `fancy` text"/>, el);
    expect(el.innerHTML).toMatch('Some <code>fancy</code> text');
  });
});
