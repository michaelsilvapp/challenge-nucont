const fs = require("fs");

const dictionary = {
    0: 'classifier',
    1: 'description',
    2: 'openingBalance',
    3: 'debit',
    4: 'credit',
    5: 'finalBalance'
}

const clearDots = str => str.trim().split('.').join('')

const formatNumber = str => parseFloat(str.trim().split('.').join('').replace(',', '.').replace('D', '').replace('C', ''))

const getWhatMatter = input => input.split(/  |\n|\t/).filter(item => item !== '')

const LevelTwoChallenge = (input) => {
    const allItems = getWhatMatter(input)

    const objects = []
    let tempObj = {}
    for (index in allItems) {
        const keyDic = index % 6

        if (keyDic === 0) {
            tempObj[dictionary[0]] = clearDots(allItems[index])
        } else if (keyDic === 1) {
            tempObj[dictionary[1]] = allItems[index].trim()
        } else {
            tempObj[dictionary[keyDic]] = formatNumber(allItems[index])
        }
        
        if (keyDic === 5) {
            tempObj.parent = index - 11 >= 0 ? clearDots(allItems[index - 11]) : null

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


