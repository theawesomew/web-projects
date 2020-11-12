def factorize (n):
    f = []
    p = 2
    while n >= p**2:
        if n % p == 0:
            n = int(n/p)
            f.append(p)
        else:
            p = p + 1
    f.append(n)
    return f

print(factorize(120))
