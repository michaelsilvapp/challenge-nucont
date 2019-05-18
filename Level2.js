var fs = require("fs");

const dictionary = {
    0: 'classifier',
    1: 'description',
    2: 'openingBalance',
    3: 'debit',
    4: 'credit',
    5: 'finalBalance'
}

const cleanDots = str => str.trim().split('.').join('')

const formatNumber = str => parseFloat(str.trim().split('.').join('').replace(',', '.').replace('D', ''))

const LevelTwoChallenge = (input) => {
    const allItems = input.split(/  |\n|\t/).filter(item => item !== '')

    const objects = []
    let tempObj = {}
    for (index in allItems) {
        const keyDic = index % 6

        if (keyDic === 0) {
            tempObj[dictionary[0]] = cleanDots(allItems[index])
        } else if (keyDic === 1) {
            tempObj[dictionary[keyDic]] = allItems[index].trim()
        } else {
            tempObj[dictionary[keyDic]] = formatNumber(allItems[index])
        }
        
        if (keyDic === 5) {
            tempObj.parent = index - 11 >= 0 ? cleanDots(allItems[index - 11]) : null

            objects.push(tempObj)
            tempObj = {}
        }
    }

    return objects
}

fs.readFile("Level2.txt", (err, buf) => {
    if (err) throw err;

    const input = buf.toString()

    console.log('Input:\n', input, '\n')
    
    const output = LevelTwoChallenge(input)

    console.log('Output:\n', output, '\n')
});


