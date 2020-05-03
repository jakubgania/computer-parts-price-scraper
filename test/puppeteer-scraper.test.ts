import puppeteer from 'puppeteer'
import { PuppeteerScraper } from "../src/puppeteer-scraper";

// console.log(scraper.hasOwnProperty('processingTYpe'))

it('check if the field exists => processingType', () => {
    const obj = new PuppeteerScraper(puppeteer);

    expect(obj.hasOwnProperty('processingType')).toBe(true);
});

it('check type of puppeteer field', () => {
    const obj = new PuppeteerScraper(puppeteer);

    expect(typeof obj.puppeteer).toBe('object');
});

it('check if the field exists => puppeteer', () => {
    const obj = new PuppeteerScraper(puppeteer);

    expect(obj.hasOwnProperty('puppeteer')).toBe(true);
});

it('check type of processingType field', () => {
    const obj = new PuppeteerScraper(puppeteer);

    expect(typeof obj.processingType).toBe('string');
});

it('new PuppeteerScraper()', () => {
    const obj = new PuppeteerScraper(puppeteer);

    expect(obj.processingType).toBe('sequential');
});

it('new PuppeteerScraper("parallel")', () => {
    const obj = new PuppeteerScraper(puppeteer, 'parallel');

    expect(obj.processingType).toBe('parallel');
});

it('new PuppeteerScraper("parallel-limits")', () => {
    const obj = new PuppeteerScraper(puppeteer, 'parallel-limits');

    expect(obj.processingType).toBe('parallel-limits');
});

it('check if the the function exists => run()', () => {
    const obj = new PuppeteerScraper(puppeteer);

    expect(typeof obj['run'] === 'function').toBe(true)
})

it('check if the function exists => sequentialProcessing()', () => {
    const obj = new PuppeteerScraper(puppeteer);

    expect(typeof obj['sequentialProcessing'] === 'function').toBe(true)
});

it('check if the function exists => parallelProcessing()', () => {
    const obj = new PuppeteerScraper(puppeteer);

    expect(typeof obj['parallelProcessing'] === 'function').toBe(true)
});

it('check if the function exists => parallelProcessingLimits()', () => {
    const obj = new PuppeteerScraper(puppeteer);

    expect(typeof obj['parallelProcessingLimits'] === 'function').toBe(true)
});

it('return null => new PuppeteerScraper("sequentl")', () => {
    const obj = new PuppeteerScraper(puppeteer, 'sequentl');

    expect(obj.run()).toBe(null);
});

it('return null => new PuppeteerScraper("parall")', () => {
    const obj = new PuppeteerScraper(puppeteer, 'parall');

    expect(obj.run()).toBe(null);
});

it('return null => new PuppeteerScraper("parallel-limit")', () => {
    const obj = new PuppeteerScraper(puppeteer, 'parallel-limit');

    expect(obj.run()).toBe(null);
});
