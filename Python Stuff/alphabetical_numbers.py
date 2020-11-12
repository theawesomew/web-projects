saying_no = {
    "0": [""],
    "1": ["one"],
    "2": ["two", "twenty"],
    "3": ["three", "thirty"],
    "4": ["four", "forty"],
    "5": ["five", "fifty"],
    "6": ["six", "sixty"],
    "7": ["seven", "seventy"],
    "8": ["eight", "eighty"],
    "9": ["nine", "ninety"],
    "10": "ten",
    "11": "eleven",
    "12": "twelve",
    "13": "thirteen",
    "14": "fourteen",
    "15": "fifteen",
    "16": "sixteen",
    "17": "seventeen",
    "18": "eighteen",
    "19": "nineteen"
}

def noToText (n):
    n = str(n)
    if n in saying_no:
        return saying_no[n] if type(saying_no[n]) is not list else saying_no[n][0]
    else:
        div = "-" if n[1] != "0" else ""
        return saying_no[n[0]][1] + div + saying_no[n[1]][0]

numbers = []
for i in range(1,100):
    numbers.append(noToText(i))

numbers.sort()

for j in range(1,len(numbers)+1):
    print(str(j) + ") " + numbers[j-1])

input("Press ENTER to exit.")
