# if player1 == 'rock':
#     if player2 == 'scissors':
#         print('Player1 wins!)

# if player1 == 'paper':
#     elif player2 == 'paper':
#         print('Player1 wins!)

# if player1 == 'scissors':
#     if player2 == 'scissors':
#         print('Player1 wins!)

# import random

from random import randint

rand_num = randint(0, 2)
if rand_num == 0:
    computer = 'rock'
elif rand_num == 1:
    computer = 'paper'
else:
    computer = 'scissors'

print('Rock...')
print('Paper...')
print('Scissors...')

player1 = input('Player 1, make your move: ').lower()
print('The computer plays: ' + computer)
# print('---===NO CHEATING!===---\n' * 20)
# player2 = input('Player 2, make your move:\n')

if player1 == computer:
    print('It\'s a draw!!!')
elif player1 == 'rock' and computer == 'scissors' or player1 == 'paper' and computer == 'rock' or player1 == 'scissors' and computer == 'paper':
    print('Player1 wins!')
else:
    print('computer wins!')
