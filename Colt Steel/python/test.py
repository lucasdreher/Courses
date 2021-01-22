# Test file to practice some Python code

# name = input('What\'s your name?\n')
# print(name)


# age = input('How old are you?\n')
# if int(age) >= 18 and int(age) < 21:
#     print('You can enter but need a wristband!')
# elif int(age) >= 21:
#     print('You are good to enter and can drink!')
# else:
#     print('You can\'t come in, little one! :(')

# times = input('Quantas vezes ja te mandei limpar o quarto guri!?\n')
# times = int(times)

# for time in range(times):
#     print('VA LIMPAR O TEU QUARTO!!!')

# for num in range(1, 21):
#     if num == 4 or num == 13:
#         print(f'{num} is unlucky')
#     elif num % 2 == 0:
#         print(f'{num} is even')
#     else:
#         print(f'{num} is odd')


# for num in range(1, 21):
#     if num == 4 or num == 13:
#         state = 'unlucky'
#     elif num % 2 == 0:
#         state = 'even'
#     else:
#         state = 'odd'
#     print(f'{num} is {state}')

# for num in range(1, 11):
#     print('\U0001f600' * num)
# times = 1
# while times <= 10:
#     print('\U0001f600' * times)
#     times += 1


# if guess == random_number:
#     print('YOU GOT IT!')

# import random
# random_number = random.randint(1, 10)  # numbers 1 - 10

# guess = None

# while guess != random_number:
#     guess = int(input('Pick a number from 1 to 10: '))
#     if guess < random_number:
#         print('TOO LOW!')
#     elif guess > random_number:
#         print('TOO HIGH!')
#     else:
#         print('YOU GOT IT!')

# import random
# random_number = random.randint(1, 10)  # numbers 1 - 10

# while True:
#     guess = int(input('Pick a number from 1 to 10: '))
#     if guess < random_number:
#         print('TOO LOW!')
#     elif guess > random_number:
#         print('TOO HIGH!')
#     else:
#         print('YOU GOT IT!')
#         play_again = input('Do you want to play again? (y/n): ')
#         if play_again == 'y':
#             random_number = random.randint(1, 10)  # numbers 1 - 10
#             guess = None
#         else:
#             print('Thank you for playing!')
#             break

# num = list()

# sounds = ["super", "cali", "fragil", "istic", "expi", "ali", "docious"]

# # Define your code below:
# result = ""
# for sound in sounds:
#     result += sound.upper()

# print(result)

# # Create a list called instructors
# instructors = []
# # Add the following strings to the instructors list

# instructors.extend(['Colt', 'Blue', 'Lisa'])
# # "Colt"
# # "Blue"
# # "Lisa"

# # Remove the last value in the listinstructors.pop()

# instructors.pop()

# # Remove the first value in the list

# instructors.pop(0)

# # Add the string "Done" to the beginning of the listinstrone')

# instructors.insert(0, "Done")

# # Run the tests to make sure you've done this correctly!

# print([num*10 for num in range(1, 6)])

# names = ['Elie', 'Tim', 'Matt']
# answer = [letter[0] for letter in names]
# print(answer)


# answer = [letter[0] for letter in ['Elie', 'Tim', 'Matt']]
# print(answer)

# numbers = [1, 2, 3, 4, 5, 6]
# answer2 = [num for num in numbers if num % 2 == 0]
# print(answer2)


# answer2 = [num for num in [1, 2, 3, 4, 5, 6] if num % 2 == 0]
# print(answer2)


# answer = [num for num in [1, 2, 3, 4] if num in [3, 4, 5, 6]]
# print(answer)


# answer2 = [char[::-1].lower() for char in ['Elie', 'Tim', 'Matt']]
# print(answer2)


# answer = [num for num in range(1, 101) if num % 12 == 0]
# print(answer)


# answer = [char for char in 'amazing' if char not in 'aeiou']
# print(answer)

# answer = [[i for i in range(3)] for num in range(3)]
# print(answer)

# answer = [[i for i in range(10)] for num in range(10)]
# print(answer)


# user_info = {'name': 'Lucas', 'age': 39, 'at_home': True}

# print(user_info)

# artist = {
#     "first": "Neil",
#     "last": "Young",
# }

# print(artist['first'])

# full_name = artist['first'] + ' ' + artist['last']

# full_name = f"{artist['first']} {artist['last']}"

# print(full_name)


# DON'T TOUCH PLEASE!
# donations = dict(sam=25.0, lena=88.99, chuck=13.0, linus=99.5,
#                  stan=150.0, lisa=50.25, harrison=10.0)
# DON'T TOUCH PLEASE!
# print(donations.values())
# total_donations = [char for char in donations.value()]
# total_donations = 0
# for value in donations.values():
#     total_donations += value

# print(total_donations)
# Use a loop to add together all the donations and store the resulting number in a variable called total_donations


# This code picks a random food item:
# from random import choice  # DON'T CHANGE!
# food = choice(["cheese pizza", "quiche", "morning bun",
#                "gummy bear", "tea cake"])  # DON'T CHANGE!

# DON'T CHANGE THIS DICTIONARY EITHER!
# bakery_stock = {
#     "almond croissant": 12,
#     "toffee cookie": 3,
#     "morning bun": 1,
#     "chocolate chunk cookie": 9,
#     "tea cake": 25
# }

# YOUR CODE GOES BELOW:

# for item in bakery_stock:
#     if item == food:
#         print(f'{bakery_stock[bakery_stock].value()} left')
#     else:
#         print("We don't make that")

# if bakery_stock.get(food) == None:
#     print("We don't make that")
# else:
#     print(f'{bakery_stock.get(food)} left')

# quantity = bakery_stock.get(food)
# if quantity:
#     print("{} left".format(quantity))
# else:
#     print("we don't make that")


# DO NOT TOUCH game_properties!
# game_properties = ["current_score", "high_score", "number_of_lives", "items_in_inventory", "power_ups", "ammo",
#                    "enemies_on_screen", "enemy_kills", "enemy_kill_streaks", "minutes_played", "notifications", "achievements"]

# Use the game_properties list and dict.fromkeys() to generate a dictionary with all values set to 0. Save the result to a variable called initial_game_state

# initial_game_state = {}.fromkeys(game_properties, 0)
# print(initial_game_state)

# list1 = ["CA", "NJ", "RI"]
# list2 = ["California", "New Jersey", "Rhode Island"]

# # make sure your solution is assigned to the answer variable so the tests can work!
# answer = {list1[i]: list2[i] for i in range(3)}
# print(answer)


# person = [["name", "Jared"], ["job", "Musician"], ["city", "Bern"]]

# # use the person variable in your answer
# answer = {i[0]: i[1] for i in person}
# print(answer)

# answer = {}.fromkeys('aeiou', 0)
# print(answer)

# make sure your solution is assigned to the answer variable so the tests can work!
# answer = {i: chr(i) for i in range(65, 91)}
# print(answer)

# # 1 - Create a variable called numbers which is a tuple with the the values 1, 2, 3 and 4 inside.

# numbers = (1, 2, 3, 4)

# # 2 - Create a variable called value which is a tuple with the the value 1 inside.

# value = (1,)
# print(value)

# # 3 - Given the following variable:

# values = [10, 20, 30]

# # Create a variable called static_values which is the result of the values variable converted to a tuple

# static_values = tuple(values)

# # 4 - Given the following variable

# stuff = [1, 3, 1, 5, 2, 5, 1, 2, 5]

# # Create a variable called unique_stuff which is a set of only the unique values in the stuff list

# unique_stuff = set(stuff)

# Define a function called generate_evens
# It should return a list of even numbers between 1 and 50(not including 50)
# def generate_evens():
#     return [i for i in range(1, 50) if i % 2 == 0]


# print(generate_evens())
# def yell(val):
#     return val.upper() + '!'

# def count_dollar_signs(word):
#     count = 0
#     for char in word:
#         if char == '$':
#             count += 1
#     return count


# print(count_dollar_signs('$$$'))


# Define speak below:
# def speak(animal = 'dog'):
#     if animal == 'pig':
#         return 'oink'
#     elif animal == 'duck':
#         return 'quack'
#     elif animal == 'cat':
#         return 'meow'
#     elif animal == 'dog':
#         return 'woof'
#     return '?'

'''
product(2,2) # 4
product(2,-2) # -4
'''

# define product below:

# week_days = {
#     '1': 'Sunday',
#     '2': 'Monday',
#     '3': 'Tuesday',
#     '4': 'Wednesday',
#     '5': 'Thursday',
#     '6': 'Friday',
#     '7': 'Saturday'
# }


# def return_day(num):
#     if num < 1 or num > 7:
#         return None
#     return week_days[str(num)]


# print(return_day(6))


# def last_element(l):
#     if len(l) > 0:
#         return l[-1]
#     return None

# def last_element(l):
#     if l:
#         return l[-1]
#     return None


# print(last_element([2]))

# count('hello', 'l')

# def single_letter_count(word, letter):
#     word = word.lower()
#     letter = letter.lower()
#     letter_list = [l for l in word]
#     return letter_list.count(letter)

# def single_letter_count(string,letter):
#     return string.lower().count(letter.lower())


# print(single_letter_count('heLlo', 'O'))

# def multiple_letter_count(string):
#     return {letter: string.lower().count(letter) for letter in string.lower()}


# print(multiple_letter_count('hellllouuU'))


'''
list_manipulation([1,2,3], "remove", "end") # 3
list_manipulation([1,2,3], "remove", "beginning") #  1
list_manipulation([1,2,3], "add", "beginning", 20) #  [20,1,2,3]
list_manipulation([1,2,3], "add", "end", 30) #  [1,2,3,30]
'''


# def list_manipulation(l, command, position, value=None):
#     print(value)
#     if command == 'remove':
#         if position == 'beginning':
#             return l.pop(0)
#         return l.pop()
#     if position == 'beginning':
#         l.insert(0, value)
#         return l
#     (l.append(value))
#     return l


# def list_manipulation(collection, command, location, value=None):
#     if(command == "remove" and location == "end"):
#         return collection.pop()
#     elif(command == "remove" and location == "beginning"):
#         return collection.pop(0)
#     elif(command == "add" and location == "beginning"):
#         collection.insert(0,value)
#         return collection
#     elif(command == "add" and location == "end"):
#         collection.append(value)
#         return collection

# print(list_manipulation([1, 2, 3], "add", "beginning", 20))


'''
is_palindrome('testing') # False
is_palindrome('tacocat') # True
is_palindrome('hannah') # True
is_palindrome('robert') # False
is_palindrome('amanaplanacanalpanama') # True
'''


# def is_palindrome(word):
#     word = [letter for letter in word.lower() if letter != ' ']
#     word_compare = word[:]
#     word_compare.reverse()
#     print(word_compare, word)
#     if word == word_compare:
#         return True
#     return False

# def is_palindrome(string):
#     stripped = string.replace(" ", "")
#     return stripped == stripped[::-1]

# print(is_palindrome('lolo'))


'''
frequency([1,2,3,4,4,4], 4) # 3
frequency([True, False, True, True], False) # 1
'''


# def frequency(l, item):
#     return l.count(item)


# print(frequency([True, False, True, True], False))

'''
multiply_even_numbers([2,3,4,5,6]) # 48
'''


# def multiply_even_numbers(l):
#     answer = 1
#     for val in l:
#         if val % 2 == 0:
#             answer *= val
#     return answer


# print(multiply_even_numbers([2, 3, 4, 5, 6]))

'''
capitalize("tim") # "Tim"
capitalize("matt") # "Matt"
'''


# def capitalize(string):
#     return string[0].upper() + string[1:]

# def capitalize(string):
#     return string[:1].upper() + string[1:]


# print(capitalize("Matt"))

'''
compact([0,1,2,"",[], False, {}, None, "All done"]) # [1,2, "All done"]
'''


# def compact(l):
#     return [val for val in l if val]


# print(compact([0, 1, 2, "", [], False, {}, None, "All done"]))


# flesh out intersection pleaseeeee
# def intersection(l1, l2):
#     return [val for val in l1 if val in l2]

# def intersection(list1, list2):
#     return [val for val in set(list1) & set(list2)]


'''
def isEven(num):
    return num % 2 == 0

partition([1,2,3,4], isEven) # [[2,4],[1,3]]
'''

# def partition(l, f):
#     t_list = [val for val in l if f(val) == True]
#     f_list = [val for val in l if f(val) == False]
#     return [t_list, f_list]

# def partition(l, f):
#     return [[val for val in l if f(val) == True], [val for val in l if f(val) == False]]


# def contains_purple(*args):
#     if 'purple' in args:
#         return True
#     return False

# Define combine_words below:
# def combine_words(word, **kwargs):
#     if 'prefix' in kwargs:
#         return kwargs['prefix'] + word
#     if 'suffix' in kwargs:
#         return  word +  kwargs['suffix']
#     return word


'''
calculate(make_float=False, operation='add', message='You just added',
          first=2, second=4) # "You just added 6"
calculate(make_float=True, operation='divide',
          first=3.5, second=5) # "The result is 0.7"
'''


# def calculate(**kwargs):
#     operation_lookup = {
#         'add': kwargs.get('first', 0) + kwargs.get('second', 0),
#         'subtract': kwargs.get('first', 0) - kwargs.get('second', 0),
#         'divide': kwargs.get('first', 0) / kwargs.get('second', 0),
#         'multiply': kwargs.get('first', 0) * kwargs.get('second', 0)
#     }
#     is_float = kwargs.get('make_float', False)
#     operation_value = operation_lookup[kwargs.get('operation', '')]
#     if is_float:
#         final = kwargs.get('message', 'The result is') + \
#             ' ' + str(float(operation_value))
#     else:
#         final = kwargs.get('message', 'The result is') + \
#             ' ' + str(int(operation_value))
#     return final


# calculate(make_float=False, operation='add', message='You just added',
#           first=2, second=4)  # "You just added 6


# def remove_negatives(l):
#     return list(filter(lambda num: num >= 0, l))

# Implement your is_all_strings function below:
# def is_all_strings(l):
#     return all(val for val in l if type(val) == 'string')

# def extremes(l):
#     return (min(l),max(l))


# def max_magnitude(l):
#     return max(abs(var) for var in l)

'''
sum_even_values(1,2,3,4,5,6) # 12
sum_even_values(4,2,1,10) # 16
sum_even_values(1) # 0
'''

# define sum_even_values


# def sum_even_values(*l):
#     return sum(var for var in l if var % 2 == 0)


# print(sum_even_values(1, 2, 3, 4, 5, 6))

# var for var in l if var % 2 == 0

'''
sum_floats(1.5, 2.4, 'awesome', [], 1) # 3.9
sum_floats(1,2,3,4,5) # 0
'''


# def sum_floats(*args):
#     return sum(val for val in args if type(val) == float)


# print(sum_floats(1.5, 2.4, 'awesome', [], 1))

# def interleave(s1, s2):
#     return ''.join(''.join(c) for c in (zip(s1, s2)))


# print(interleave('hi', 'no'))

'''
triple_and_filter([1,2,3,4]) # [12]
triple_and_filter([6,8,10,12]) # [24,36]
'''

# def triple_and_filter(l):
#     return [num*3 for num in l if num % 4 == 0]

# def triple_and_filter(lst):
# return list(filter(lambda x: x % 4 == 0, map(lambda x: x*3, lst)))

'''
names = [{'first': 'Elie', 'last': 'Schoppik'},
    {'first': 'Colt', 'last': 'Steele'}]
extract_full_name(names) # ['Elie Schoppik', 'Colt Steele']
'''
# names = [{'first': 'Elie', 'last': 'Schoppik'},
#          {'first': 'Colt', 'last': 'Steele'}]


# def extract_full_name(l):
#     return list(map(lambda val: "{} {}".format(val['first'], val['last']), l))


# print(extract_full_name(names))


# Write a function called divide, which accepts two parameters (you can call them num1 and num2).
# The function should return the result of num1 divided by num2.
# If you do not pass the correct type of arguments to the function, it should return the string
# "Please provide two integers or floats". If you pass as the second argument a 0,
# Python will raise a ZeroDivisionError, so if this function is invoked with a 0 as the value of num2,
# return the string "Please do not divide by zero"

# Examples

# divide(4,2)  2
# divide([],"1")  "Please provide two integers or floats"
# divide(1,0)  "Please do not divide by zero"

# def divide(num1, num2):
#     try:
#         div = num1/num2
#     except TypeError:
#         return "Please provide two integers or floats"
#     except ZeroDivisionError:
#         return "Please do not divide by zero"
#     else:
#         return int(div)


# print(divide(4, 2))

# divide(1, 0)
# divide([], "1")

# # Import the math module:
# import math
# # Use math.sqrt  to find the square root of 15129 and save it to variable called answer:
# answer = math.sqrt(15129)

# import keyword
# def contains_keyword (*args):
#     for item in args:
#         if keyword.iskeyword(item):
#             return True
#     return False

# #Define a function in here called lucky_number that always returns 37
# #lucky_number() #37

# def lucky_number():
#     return 37

 