import { PuppeteerScraper } from "../src/puppeteer-scraper";

it('new PuppeteerScraper()', () => {
    const obj = new PuppeteerScraper();

    expect(obj.processingType).toBe('sequential');
});

it('new PuppeteerScraper("parallel")', () => {
    const obj = new PuppeteerScraper('parallel');

    expect(obj.processingType).toBe('parallel');
});

it('new PuppeteerScraper("parallel-limits")', () => {
    const obj = new PuppeteerScraper('parallel-limits');

    expect(obj.processingType).toBe('parallel-limits');
});

it('return null => new PuppeteerScraper("sequentl")', () => {
    const obj = new PuppeteerScraper('sequentl');

    expect(obj.run()).toBe(null);
});

it('return null => new PuppeteerScraper("parall")', () => {
    const obj = new PuppeteerScraper('parall');

    expect(obj.run()).toBe(null);
});

it('return null => new PuppeteerScraper("parallel-limit")', () => {
    const obj = new PuppeteerScraper('parallel-limit');

    expect(obj.run()).toBe(null);
});