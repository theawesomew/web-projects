from itertools import groupby, accumulate

def itergroup(seq, val):
    it = iter(seq)    
    grouped = groupby(accumulate(x==val for x in seq))
    return [[next(it) for c in g] for k,g in grouped]

a = []

def findCycle (n, foundCycle):
    global a
    if not foundCycle:
        n = str(n)
        reverse_n = n[::-1]
        result = int(''.join(sorted(str(int(n) + int(reverse_n)))))
        a.append(result)
        if len(a) != len(set(a)) or result > 10**12:
            findCycle(result, True)
        else:
            findCycle(result, False) 
    else:
        return
    
    
    

findCycle(444, False)
print(itergroup(a, 444))
