var fs = require("fs");

const dictionary = {
    1: 'classifier',
    2: 'description',
    3: 'openingBalance',
    4: 'debit',
    5: 'credit',
    6: 'finalBalance'
}

const clearDots = str => str.trim().split('.').join('')

const formatNumber = str => parseFloat(str.trim().split('.').join('').replace(',', '.'))

const getWhatMatter = input => {
    let itemsFiltered = input.split(/  |\n|\t|\f/).filter(item => item !== '' && item !== ' ' && item !== 'D' && item !== 'C'),
    indexToRemove = itemsFiltered.findIndex(item => item === ' Saldo Final') + 2

    while (indexToRemove > 1) {
        itemsFiltered.splice(indexToRemove - 23, 23)
        indexToRemove = itemsFiltered.findIndex(item => item === ' Saldo Final') + 2
    }

    return itemsFiltered
}

const LevelThreeChallenge = (input) => {
    const allItems = getWhatMatter(input)

    const objects = []
    let tempObj = {}
    for (index in allItems) {
        const keyDic = index % 7

        if (keyDic === 1) {
            tempObj[dictionary[1]] = clearDots(allItems[index])
        } else if (keyDic === 2) {
            tempObj[dictionary[2]] = allItems[index].trim()
        } else if (keyDic !== 0) {
            tempObj[dictionary[keyDic]] = formatNumber(allItems[index])
        }
        
        if (keyDic === 6) {
            tempObj.parent = index - 12 >= 0 ? clearDots(allItems[index - 12]) : null

            objects.push(tempObj)
            tempObj = {}
        }
    }

    return objects
}

fs.readFile("Level4.txt", (err, buf) => {
    if (err) throw err;

    const input = buf.toString()
    
    const output = LevelThreeChallenge(input)

    console.log('Output:\n', output, '\n')
});


