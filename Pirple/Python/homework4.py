# Homework Assignment #4: Lists

myUniqueList = []
myLeftovers = []


def addToList(value):
    validate = addToListLogic(value)
    if validate:
        print('Value of ', value,
              ' is UNIQUE and inserted in the end o the myUniqueList as follows:', myUniqueList)
    else:
        print('Value of ', value,
              ' is NOT UNIQUE and inserted in the end o the myLeftovers as follows:', myLeftovers)


def addToListLogic(value):
    if value in myUniqueList:
        myLeftovers.append(value)
        return False
    else:
        myUniqueList.append(value)
        return True


addToList(11)
addToList(11)
addToList(233)
addToList(25)
addToList(33)
addToList(1)
addToList(1)
addToList(1)
addToList(1)
