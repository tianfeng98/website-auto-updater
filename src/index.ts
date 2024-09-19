const regex = /<script[^>]*src="([^"]+)"[^>]*>/gi;

export interface ExtractScriptsOptions {
  /**
   * Your website url. The default is location.origin
   */
  url?: string;
  /**
   * Polling interval timestamp. The default is 1 min
   */
  interval?: number;
}

export default class WebsiteAutoUpdater {
  private options: Required<ExtractScriptsOptions> = {
    url: location.href,
    interval: 60 * 1000,
  };
  private lastScripts: string[] | null = null;
  constructor(options: ExtractScriptsOptions = {}) {
    this.options = Object.assign(this.options, options);
  }

  /**
   * Make sure you don't retrieve HTML from the cache.
   * @param noCache
   * @returns
   */
  getHomeUrl(noCache?: boolean) {
    const urlObj = new URL(this.options.url);
    if (noCache) {
      if (urlObj.searchParams.has("_timestamp")) {
        urlObj.searchParams.delete("_timestamp");
      }
      urlObj.searchParams.append("_timestamp", `${Date.now()}`);
    }
    return urlObj;
  }

  private async extractScripts(noCache?: boolean) {
    const htmlText = await fetch(this.getHomeUrl(noCache)).then((res) => {
      if (res.status >= 200 && res.status < 400) {
        return res.text();
      }
      return "";
    });
    if (!htmlText) {
      throw new Error("Load html error!");
    }
    let match;
    const srcAttributes = [];
    while ((match = regex.exec(htmlText)) !== null) {
      // Match src
      srcAttributes.push(match[1]);
    }
    return srcAttributes;
  }

  async isWebsiteNeedUpdate() {
    try {
      if (!this.lastScripts) {
        this.lastScripts = await this.extractScripts();
      }
      const newScripts = await this.extractScripts(true);
      let result = false;
      if (this.lastScripts.length !== newScripts.length) {
        result = true;
      } else {
        for (let i = 0; i < this.lastScripts.length; i++) {
          if (this.lastScripts[i] !== newScripts[i]) {
            result = true;
            break;
          }
        }
      }
      this.lastScripts = newScripts;
      return result;
    } catch (e) {
      return false;
    }
  }

  run(onUpdate?: () => Promise<void> | void) {
    setTimeout(async () => {
      const willUpdate = await this.isWebsiteNeedUpdate();
      if (willUpdate) {
        await onUpdate?.();
      }
      this.run(onUpdate);
    }, this.options.interval);
  }
}
