
export class PuppeteerScraper {
    processingType: string;
    viewportWidth: number = 1920; // number of pixels
    viewportHeight: number = 1080; // number of pixels


    constructor(processingType: string = 'sequential') {
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
        console.log('sequential')
    }
    
    parallelProcessing() {
        console.log('parallel')
    }

    parallelProcessingLimits() {
        // console.log('parallerl-limits')
    }
}