const LARGEST = 'a'

class Scale {
    // left is a array, right is a array
    // op is <, > or =
    constructor(left, right, op) {
        this.left = left
        this.right = right
        this.op = op
    }
}

// generate random number in range
function randint(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function duplicateArrayElements(arr, n) {
    return [].concat(...Array(n).fill(arr))
}

// perform type 1 operation
function case1(left, right) {
    const c = randint(1, 2)
    let newRight = duplicateArrayElements(right, c)
    if (left.length == 1 && left[0] == LARGEST && right.length == 1) {
        return new Scale(left, newRight, '>')
    } else {
        if (Math.random() < 0.5) {
            return new Scale(left, newRight, '>')
        } else {
            return new Scale(left, newRight, '=')
        }
    }
}

function setDifference(arrA, arrB) {
    return arrA.filter(element => !arrB.includes(element))
}

// get n random elements from arr
function getRandom(arr, n) {
    var result = new Array(n),
        len = arr.length,
        taken = new Array(len)
    if (n > len)
        throw new RangeError("getRandom: more elements taken than available")
    while (n--) {
        var x = Math.floor(Math.random() * len)
        result[n] = arr[x in taken ? taken[x] : x]
        taken[x] = --len in taken ? taken[len] : len
    }
    return result
}

// perform type 2 operation
function case2(left, right, allVars) {
    let eleToChoose = setDifference(allVars, left)
    eleToChoose = setDifference(eleToChoose, right)
    if (eleToChoose.includes('a')) {
        eleToChoose = setDifference(eleToChoose, 'a')
    }
    if (eleToChoose.length == 0) {
        throw new Error("eleToChoose is empty") 
    }
    let c = randint(1, eleToChoose.length)
    let subs = getRandom(eleToChoose, c)
    return new Scale(right, subs, '=')
}

// perform type 3 operation
function case3(scale, allVars) {
    // let n = randint(1,2)
    const n = 1
    let junk = getRandom(allVars, n)
    let newLeft = scale.left.concat(junk)
    let newRight = scale.right.concat(junk)
    return new Scale(newLeft, newRight, scale.op)
}

function generateAlphabets(n) {
    if (n <= 0 || typeof n !== 'number') {
        return "Please provide a positive number for 'n'."
    }
    const result = []
    const startCharCode = 'a'.charCodeAt(0)
    for (let i = 0; i < n; i++) {
        const currentChar = String.fromCharCode(startCharCode + i)
        result.push(currentChar)
    }
    return result
}

function _generateScales(n) {
    let allVars = generateAlphabets(n)
    let connected = [LARGEST]
    let scales = []
    // let i = randint(1, n-1)

    // let left = connected
    // let right = allVars[i]
    // connected.push(allVars[i])

    // scales.push(new Scale(left, right, '>'))
    // scales.push(case1(left, right))

    while (connected.length < n) {
        let left = getRandom(connected, randint(1, Math.min(2,connected.length)))
        let disconnected = setDifference(allVars, connected)
        let right = getRandom(disconnected, randint(1, Math.min(2,disconnected.length)))
        let k = randint(1,2)
        if (connected.length == 1) {
            k = 1
        }
        if (k == 1) {
            scales.push(case1(left, right))
        } else if (k == 2) {
            scales.push(case2(left, right, allVars))
        }
        connected = connected.concat(right)
    }
    const maxObj = 4
    // apply case 3 to a random subset of scales
    for (let i = 0; i < scales.length; i++) {
        if (Math.random() < 0.1 && scales[i].left.length < maxObj && scales[i].right.length < maxObj) {
            scales[i] = case3(scales[i], allVars)
        }
    }
    return scales
}

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
    while (currentIndex > 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
    return array;
}

function createDictionary(keys, values) {
    if (keys.length !== values.length) {
        throw new Error('Keys and values arrays must have the same length');
    }

    const dictionary = {};

    for (let i = 0; i < keys.length; i++) {
        dictionary[keys[i]] = values[i];
    }

    return dictionary;
}

function generateScales(n) {
    let scales = null
    while (1) {
        try {
            scales = _generateScales(n)
            break
        } catch (error) {}
    }
    let keys = generateAlphabets(n)
    let vals = generateAlphabets(n)
    shuffle(vals)
    let dct = createDictionary(keys, vals)
    for (let i = 0; i < scales.length; i++) {
        for (let j = 0; j < scales[i].left.length; j++) {
            scales[i].left[j] = dct[scales[i].left[j]]
        }
        for (let j = 0; j < scales[i].right.length; j++) {
            scales[i].right[j] = dct[scales[i].right[j]]
        }
        if (Math.random() < 0.5 && scales[i].op == '>') {
            [scales[i].left, scales[i].right] = [scales[i].right, scales[i].left]
            scales[i].op = '<'
        }
    }
    shuffle(scales)
    const maxi = dct[LARGEST]
    if (typeof maxi === "string") {
        scales.unshift(maxi)
        return scales
    } else {
        scales.unshift("ERROR OCCURED")
        return scales
    }
}

// console.log(generateScales(5))

module.exports = {
    generateScales,
}
