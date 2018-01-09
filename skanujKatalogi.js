// const path = require('path');
const os = require('os');
const fs = require('fs');
const recursive = require("recursive-readdir");
const readline = require('readline');


let listName = 'Enaudi best.m3u';
let newListName = listName + '_NOWY';


//Tworze Promise
let czytajKatalog = (topDirectory) => {
    return new Promise((resolve, reject) => {
            recursive(topDirectory, function (err, files) {
                resolve(files)
            })
        }
    )
};

const rl = readline.createInterface({
    input: require('fs').createReadStream(listName)
    // output: process.stdout
});



rl.on('line', (singleLine) => {
    if (singleLine.substring(0, 1) != '#') {
        let dlugosc = singleLine.split('\\').length;
        let nazwaSzukanejMuzyki = singleLine.split('\\')[dlugosc - 1];
        czytajKatalog(process.cwd())
            .then((files) => {
                files.forEach((file) => {
                    if (file.indexOf(nazwaSzukanejMuzyki) != -1) {
                        fs.appendFileSync(newListName, file + os.EOL);
                    }
                })
            })

    }
});
