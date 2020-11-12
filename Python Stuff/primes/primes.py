from os import system

primes = [2,3,5,7,11,13,17]

for i in range(19, 1000000, 2):
    isPrime = True
    for prime in primes:
        if i/prime < 2: break
        
        if i % prime == 0:
            isPrime = False
            break
    if isPrime:
        primes.append(i)

    print(str(i/10000) + "%")
    system('cls')

f = open('primes.txt', 'w')
for prime in primes:
    f.write(str(prime) + "\n")
f.close()
