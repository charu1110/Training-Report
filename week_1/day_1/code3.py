# to calculate the net_salary of a person



basic_salary = float(input("\nEnter base salary: "))
house_rent_allowance = float(input("Enter HRA: "))
employee_provident_fund = float(input("Enter EPF deduction: "))
public_provident_fund = float(input("Enter PPF deduction: "))

gross_salary = basic_salary + house_rent_allowance - employee_provident_fund - public_provident_fund
print("Gross Salary:", gross_salary)


tax_rate_percentage = float(input("Enter tax rate (%): "))
tax_rate = tax_rate_percentage / 100
tax_amount = gross_salary * tax_rate
print("Tax Amount:", tax_amount)


net_salary = gross_salary - tax_amount
print("In-Hand Salary:", net_salary)
