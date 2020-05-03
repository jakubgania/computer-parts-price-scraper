// run app

import puppeteer from 'puppeteer'
import { PuppeteerScraper } from './puppeteer-scraper'

let scraper = new PuppeteerScraper(puppeteer)
scraper.run()

