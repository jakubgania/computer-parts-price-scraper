import puppeteer from 'puppeteer'

export class PuppeteerScraper {
    processingType: string;
    puppeteerX: object;
    viewportWidth: number = 1920; // number of pixels
    viewportHeight: number = 1080; // number of pixels
    USER_AGENT: string = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3239.108 Safari/537.36';


    constructor(puppeteer: object ,processingType: string = 'sequential') {
        this.puppeteerX = puppeteer,
        this.processingType = processingType
    }
    
    run() {
        switch(this.processingType) {
            case 'sequential': {
                this.sequentialProcessing();
                break;
            }
            case 'parallel': {
                this.parallelProcessing();
                break;
            }
            case 'parallel-limits': {
                this.parallelProcessingLimits();
                break;
            }
            default: {
                return null;
                break;
            }
        }
    }

    sequentialProcessing() {
        (async () => {
            console.log('start sequential processing')

            const links:string[] = ['https://google.com', 'https://github.com']

            try {
                // console.log('start download data loop')
                for (let counter = 0; counter < links.length; counter++) {
                    const browser = await puppeteer.launch();
                    const page = await browser.newPage();
                    await page.setUserAgent(this.USER_AGENT);
                    await page.goto(links[counter]);
                    await page.setViewport({ width: this.viewportWidth, height: this.viewportHeight });
                    await page.screenshot({ path: `./screenshots/${counter}test.jpeg`, fullPage: false });
                    await page.close();
                    await browser.close();
                }   
            } catch (error) {
                console.log(error)
            }

            console.log('end sequential processing')
        })();
    }
    
    parallelProcessing() {
        console.log('parallel')
    }

    parallelProcessingLimits() {
        // console.log('parallerl-limits')
    }
}