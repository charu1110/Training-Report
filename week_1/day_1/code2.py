# day 1 code 2 to understand basic precedence of operators in python

p = float(input("\nPrincipal amount: "))
r = float(input("Interest: "))
t = float(input("Time: "))

simple_interest = (p * r * t) / 100
print("SI is:", simple_interest)
Amount=simple_interest + p
print("The amount : ", Amount)