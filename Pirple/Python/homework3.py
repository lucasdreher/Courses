# Homework Assignment #3: "If" Statements

def compareThreeNumbers(num1, num2, num3):
    if (num1 == num2 or num1 == num3 or num2 == num3):
        return True
    else:
        return False


print(compareThreeNumbers(1, 2, 3))
