const fs = require('fs'),
        readline = require('node:readline/promises');
const cityPop = './city_populations.csv'

let populationData = new Array;

const read = readline.createInterface({
    input: fs.createReadStream(cityPop),
});

read.on('line', (line) => {
    line = line.split(',')
    const breakdown = {
        city: line[0],
        state: line[1],
        population: line[2]
    }
    populationData.push(breakdown)
});

read.on('close', () => {
    console.log('Startup read and processing complete')
});
read.on('error', (err, line) =>{
    console.log(`Error ${err} when trying to read line ${line}`)
})

exports.populationData = populationData;