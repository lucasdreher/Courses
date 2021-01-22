# Scores = [10, 20, 30, 40, 50]
# # print(Scores[:-1])

# Scores[0] = 75
# print(Scores)
# Scores[1:3] = []
# print(Scores)
# Scores.append(101)
# print(Scores)

# word = 'hello'

# letters = []

# # for i in word:
# #     print(i)
# #     if i == 'e':
# #         print('What a funny letter')
# #     letters.append(i)
# # print(letters)

# numbers = [1, 2, 3, 4, 5]


# for l in numbers:
#     if l % 2 == 0:
#         print(l)

# numbers = []

# for num in range(1, 10, 2):
#     numbers.append(num)
#     print(num)
# print(numbers)

# counter = 1
# sum = 0
# while (counter <= 10):
#     print(counter)
#     sum += counter
#     counter += 1
# print(sum)

# letters = ['a', 'b', 'c', 'd', 'e']

# index = 0

# while (index < len(letters)):
#     print(index)
#     print(letters[index])
#     index += 1

# height = 5000
# velocity = 50
# time = 0

# while (height > 0):
#     # print(height)
#     height -= velocity
#     time += 1
# print('fall', time, 'times to reach height', height)

# length = 10
# to_print = 'd'
# for pos in range(1, length+1):
#     print(to_print*pos)
# for pos in range(length-1, 0, -1):
#     print(to_print*pos)

# max_dimmention = 5
# for row in range(max_dimmention):
#     if row % 2 == 0:
#         for col in range(max_dimmention):
#             if col % 2 == 0:
#                 if col != max_dimmention-1:
#                     print(" ", end="")
#                 else:
#                     print("")
#             else:
#                 print("|", end="")
#     else:
#         for col in range(max_dimmention):
#             if col != max_dimmention-1:
#                 print("-", end="")
#             else:
#                 print("-")

# Sets = {'m1', 'm2', 'm3', 4, 'm2', 4}
# print(Sets)
# if 'm2' in Sets:
#     print('yes')

# CountryList = []
# for i in range(5):
#     Country = input('Please enter your country: ')
#     CountryList.append(Country)
# CountrySet = set(CountryList)
# print(CountryList)
# print(CountrySet)

# if 'bbb' in CountrySet:
#     print('attended')

# Dictionary = {'key': 'value', 'key2': 'value2'}

# CountryDictionary = {}
# for Country in CountryList:
#     if Country in CountryDictionary:
#         CountryDictionary[Country] += 1
#     else:
#         CountryDictionary[Country] = 1
# print(CountryDictionary)

# Age = int(input('Please enter your age: '))
# print(Age+1)
# Scores = []

# for i in range(5):
#     currentScore = float(input('Please enter your score ' + str(i + 1) + ': '))
#     Scores.append(currentScore)
# print(Scores)
