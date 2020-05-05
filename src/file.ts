import fs from 'fs'

export class File {
    dataFolderName: string = 'data';
    inputDataPath: string = `${this.dataFolderName}/input`; 
    outputDataPath: string = `${this.dataFolderName}/output`;

    // create file
    // read file

    checkIfDataDirectoryExists() {
        try {
            console.log('check if the data folder exists');

            if (!fs.existsSync(this.dataFolderName)) {
                console.log('directory not exists');

                console.log('create folder - data');
                fs.mkdirSync(this.dataFolderName);

                console.log('create folder - data/input');
                fs.mkdirSync(this.inputDataPath);

                console.log('create folder - data/output');
                fs.mkdirSync(this.outputDataPath);
            } else {
                console.log('directory exists')
            }
        } catch (error) {
            console.log(error)
        }
    }

    saveResults() {
        // 
    }
}