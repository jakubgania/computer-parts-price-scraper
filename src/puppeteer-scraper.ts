
export class PuppeteerScraper {
    processingType: string;

    constructor(processingType: string = 'sequential') {
        this.processingType = processingType
    }
    
    run() {
        switch(this.processingType) {
            case 'sequential': {
                console.log('sequential')
                break;
            }
            case 'parallel': {
                console.log('parallel')
                break;
            }
            case 'parallel-limits': {
                console.log('parallerl-limits')
                break;
            }
            default: {
                return null;
                break;
            }
        }
    }

    // parallel processing
    // parallel processing with limits
    // sequential processing
}