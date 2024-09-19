# website-auto-updater

[![NPM version](https://img.shields.io/npm/v/website-auto-updater.svg?style=flat)](https://npmjs.com/package/website-auto-updater)
[![NPM downloads](http://img.shields.io/npm/dm/website-auto-updater.svg?style=flat)](https://npmjs.com/package/website-auto-updater)

<div align="center">
**English** · [简体中文](./README.zh-CN.md)
</div>

## Installation

```bash
$ npm install website-auto-updater
```

or

```bash
$ pnpm add website-auto-updater
```

## Usage

`website-auto-updater` exposes a class. Simply using in your SPA entry file.

```typescript
import WebsiteAutoUpdater from "website-auto-updater";

const updater = new WebsiteAutoUpdater();

updater.start(() => {
  const result = window.confirm(
    "The website has been updated, do you want to refresh the page?"
  );
  if (result) {
    location.replace(websiteAutoUpdater.getHomeUrl(true));
  }
});
```

If you want the page to be automatically updated the first time it loads:

```typescript
import WebsiteAutoUpdater from "website-auto-updater";

const websiteAutoUpdater = new WebsiteAutoUpdater({
  interval: 5 * 1000,
});

websiteAutoUpdater.isWebsiteNeedUpdate().then((isNeedUpdate) => {
  if (isNeedUpdate) {
    location.replace(websiteAutoUpdater.getHomeUrl(true));
  } else {
    oldRender();
    websiteAutoUpdater.run(() => {
      const result = window.confirm(
        "The website has been updated, do you want to refresh the page?"
      );
      if (result) {
        location.replace(websiteAutoUpdater.getHomeUrl(true));
      }
    });
  }
});
```

## LICENSE

MIT License

Copyright (c) 2024 听风

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
