def testPrime(num):
    if num == 1:
        return False
    elif num == 2:
        return True
    else:
        testEven = 2
        while (testEven < num):
            if num % testEven == 0:
                return False
            testEven += 1
        return True


for i in range(1, 101):
    if testPrime(i):
        print('Prime')
    if i % 15 == 0:
        print('FizzBuzz')
    elif i % 3 == 0:
        print('Fizz')
    elif i % 5 == 0:
        print('Buzz')
    else:
        print(i)
