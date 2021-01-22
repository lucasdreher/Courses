# Homework Assignment #6: Advanced Loops

max_dimmention = 5
for row in range(max_dimmention):
    if row % 2 == 0:
        for col in range(max_dimmention):
            if col % 2 == 0:
                if col != max_dimmention-1:
                    print(" ", end="")
                else:
                    print("")
            else:
                print("|", end="")
    else:
        for col in range(max_dimmention):
            if col != max_dimmention-1:
                print("-", end="")
            else:
                print("-")
