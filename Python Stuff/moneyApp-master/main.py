import salesTax.py

print("Welcome to the money app!")
print("Please select from the following options: ")
print("Type 1 to calculate sales tax")

choice = input("What would you like to do? ")

if choice == "1":
    state = input("Which state are you in? ")
    price = input("What's the price of the item? ")
    print(salesTax.calculate_sales_tax(state, price))
    total = salesTax.calculate_sales_tax(state, price)
