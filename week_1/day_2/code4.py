# to make a empty list and then take input of groceery items to store in the list ...

grocery_list = []

while True:
    item = input("\nEnter an item for the grocery list (type 'done' to finish): ")
    if item.lower() == "done":  
        break
    grocery_list.append(item)  

print("\nYour grocery list is:")
print(grocery_list)