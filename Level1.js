var fs = require("fs");

const dictionary = {
    0: 'classifier',
    1: 'description',
    2: 'openingBalance',
    3: 'debit',
    4: 'credit',
    5: 'finalBalance'
}

const LevelOneChallenge = (input) => {
    const allItems = input.split(/,|  |\n/).filter(item => item !== '')

    const objects = []
    let tempObj = {}
    for (index in allItems) {
        const keyDic = index % 6

        if (keyDic !== 0 && keyDic !== 1) {
            tempObj[dictionary[keyDic]] = parseInt(allItems[index].trim(), 10)
        } else {
            tempObj[dictionary[keyDic]] = allItems[index].trim()
        }

        if (keyDic === 5) {
            tempObj.parent = index - 11 >= 0 ? allItems[index - 11] : null

            objects.push(tempObj)
            tempObj = {}
        }
    }

    return objects
}

fs.readFile("Level1.txt", (err, buf) => {
    const input = buf.toString()

    console.log('Input:\n', input, '\n')
    
    const output = LevelOneChallenge(input)

    console.log('Output:\n', output, '\n')
});


