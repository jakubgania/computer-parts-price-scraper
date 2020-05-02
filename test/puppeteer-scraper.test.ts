import { PuppeteerScraper } from "../src/puppeteer-scraper";

it('works', () => {
    const obj = new PuppeteerScraper();

    expect(obj.processingType).toBe('sequential');
})