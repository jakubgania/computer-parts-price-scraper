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
                for (let counter = 0; counter < links.length; counter++) {
                    const browser = await puppeteer.launch();
                    const page = await browser.newPage();
                    await page.setUserAgent(this.USER_AGENT);
                    await page.goto(links[counter]);
                    await page.setViewport({
                        width: this.viewportWidth,
                        height: this.viewportHeight
                    });
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
                        let item = dataInput[numberBrowser].components[key];

                        promisesPages.push(new Promise(async (responsePage) => {
                            try {
                                let page = await browser.newPage();
                                await page.setViewport({
                                    width: this.viewportWidth,
                                    height: this.viewportHeight
                                });
                                await page.setUserAgent(this.USER_AGENT);
                                await page.goto(item.url, {
                                    waitUntil: 'load',
                                    timeout: 0
                                });

                                // await page.waitForXPath(value.xpath);
                                let resx = await this.extractProductData(page, dataInput[numberBrowser].rules, key);

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

    extractProductData(page: any, rulesObject: any, key: string) {
        return new Promise(async (resolve) => {
            let response: object = {};
            response['component'] = key;
            const keys = Object.keys(rulesObject);

            for (const key of keys) {
                if (key === 'price') {
                    let resultElement = await this.evaluateElement(page, rulesObject.price.parentElement.xPath, rulesObject.price.parentElement.evaluateEelement);

                    response['price'] = await this.childElement(page, rulesObject, resultElement);
                }
    
                if (key === 'name') {
                    let resultElement = await this.evaluateElement(page, rulesObject.name.parentElement.xPath, rulesObject.name.parentElement.evaluateEelement);

                    response['name'] = resultElement;
                }
            }

            resolve(response)
        })
    }

    childElement(page, rulesObject, resultElement) {
        return new Promise(async (resolve) => {
            await rulesObject.price.childEelement.forEach(async (item) => {
                if (this.checkCondition(resultElement, item.condition)) {
                    let resultElement2 = await this.evaluateElement(page, item.xPath, item.evaluateEelement);

                    resolve(resultElement2)
                }
            });
        })
    }

    evaluateElement(page: any, xPath: string, evaluateKey: string) {
        return new Promise(async (resolve) => {
            let [element] = await page.$x(xPath);

            let resultElement = await page.evaluate((element: object, evaluateKey: string) => {
                return element[evaluateKey];
            }, element, evaluateKey);

            resolve(resultElement);
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