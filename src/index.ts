// run app

import puppeteer from 'puppeteer'
import { PuppeteerScraper } from './puppeteer-scraper'
import { File } from './file'

const fileObject = new File()
fileObject.checkIfDataDirectoryExists()

const scraper = new PuppeteerScraper(puppeteer, 'parallel')
scraper.run()

