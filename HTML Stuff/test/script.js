function pickingNumbers (a) {
    let array = a.sort(function (a,b) {
        return a-b;
    });
    let max = 0;
    let values = {};
    a.forEach((v) => {
        if (v in values) {
            values[v] += 1;
        } else {
            values[v] = 1;
        }
    });

    let pairs = [];
    let keys = Object.keys(values);
    if (keys.length === 1) {
        return array.length;
    }
    for (let i = 0, len = keys.length; i < len-1; i++) {
        if (keys[i+1]-keys[i] === 1) {
            pairs.push([keys[i+1],keys[i]]);
        }
    }

    let max_pair = 2;
    for (let pair of pairs) {
        let sum = values[pair[0]] + values[pair[1]];
        max_pair = Math.max(max_pair, sum);
    }

    let entries = Object.values(values);
    let max_single = 1;
    for (let i = 0, len = entries.length; i < len; i++) {
        max_single = Math.max(max_single, entries[i]);
    }

    max = Math.max(max_single, max_pair);

    return max;
}


console.log(pickingNumbers([4,97,5,97,97,4,97,4,97,97,97,97,4,4,5,5,97,5,97,99,4,97,5,97,97,97,5,5,97,4,5,97,97,5,97,4,97,5,4,4,97,5,5,5,4,97,97,4,97,5,4,4,97,97,97,5,5,97,4,97,97,5,4,97,97,4,97,97,97,5,4,4,97,4,4,97,5,97,97,97,97,4,97,5,97,5,4,97,4,5,97,97,5,97,5,97,5,97,97,97]));