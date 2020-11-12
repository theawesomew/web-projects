taxRates = {}

f = open('taxRates.txt', 'r')
for line in f:
    state, taxRate = line.strip().split()
    taxRates[state] = float(taxRate)/100
f.close()

def error_message():
    print("Something went wrong!")


def calculate_sales_tax(chosenState, price):
    return (1+taxRates[chosenState]) * price;


print(calculate_sales_tax('CA', 100))

