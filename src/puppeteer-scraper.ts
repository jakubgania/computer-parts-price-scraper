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
    
    parallelProcessingLimits() {
        console.log('parallelLimits')
    }

    parallelProcessing() {
        (async () => {
            console.log('start parallel processing')

            const promisesBrowsers = [];

            const dataInput = this.dataInput;

            for (let numberBrowser = 0; numberBrowser < dataInput.length; numberBrowser++) {
                promisesBrowsers.push(new Promise(async (responseBrowser) => {
                    const browser: any = await puppeteer.launch();
                    const promisesPages: object[] = [];

                    for(let [key] of Object.entries(dataInput[numberBrowser].components)) {
                        // console.log(dataInput[numberBrowser].components[key])

                        let item = dataInput[numberBrowser].components[key];

                        promisesPages.push(new Promise(async (responsePage) => {
                            try {
                                let page = await browser.newPage();
                                await page.setViewport({
                                    width: this.viewportWidth,
                                    height: this.viewportHeight
                                });
                                await page.goto(item.url, {
                                    waitUntil: 'load',
                                    timeout: 0
                                });

                                // await page.waitForXPath(value.xpath);
                                // console.log('call to extractProductData method');
                                let resx = await this.extractProductData(page, dataInput[numberBrowser].rules);

                                console.log(resx);

                            } catch (error) {
                                console.log(error)
                            }

                            responsePage();
                        }))
                    }

                    await Promise.all(promisesPages);
                    await browser.close();
                    responseBrowser();
                }))
            }

            await Promise.all(promisesBrowsers);
            // save results

            console.log('end parallel processing')
        })();
    }

    extractProductData(page: any, rulesObject: any) {
        return new Promise(async (resolve) => {
            let [element] = await page.$x(rulesObject.parentElement.xPath);
            let evaluateKey = rulesObject.parentElement.evaluateEelement;
            let resultElement = await page.evaluate((element, evaluateKey) => {
                return element[evaluateKey]
            }, element, evaluateKey);

            rulesObject.childEelement.forEach(async (item) => {
                if (this.checkCondition(resultElement, item.condition)) {
                    let [element2] = await page.$x(item.xPath);
                    let evaluateKey: string = item.evaluateEelement;
                    let resultElement2 = await page.evaluate((element2: object, evaluateKey: string) => {
                        return element2[evaluateKey]
                    }, element2, evaluateKey);

                    resolve({ 'price': resultElement2 });
                }
            });
        })
    }

    checkCondition(resultElement: string|number, condition: any) {
        if (condition.comparasionType === '===') {
            return resultElement === condition.value ? true : false;
        }

        if (condition.comparasionType === '==') {
            return resultElement === parseInt(condition.value) ? true : false;
        }
    }
}