from random import randint

player_wins = 0
computer_wins = 0
winning_score = 3

# for time in range(3):
while player_wins < winning_score and computer_wins < winning_score:
    print(f'Player Score: {player_wins}; Computer Score: {computer_wins};')
    print('Rock...')
    print('Paper...')
    print('Scissors...')

    rand_num = randint(0, 2)
    if rand_num == 0:
        computer = 'rock'
    elif rand_num == 1:
        computer = 'paper'
    else:
        computer = 'scissors'

    player1 = input('Player 1, make your move: ').lower()
    if player1 == 'quit' or player1 == 'q':
        break
    print('The computer plays: ' + computer)

    if player1 == computer:
        print('It\'s a draw!!!')
    elif player1 == 'rock' and computer == 'scissors' or player1 == 'paper' and computer == 'rock' or player1 == 'scissors' and computer == 'paper':
        print('Player1 wins!')
        player_wins += 1
    else:
        print('computer wins!')
        computer_wins += 1

if player_wins > computer_wins:
    print('Congrats!!!')
elif player_wins == computer_wins:
    print("It's a tie.")
else:
    print('Better luck next time...')

print(f'Final Scores... Player: {player_wins}; Computer: {computer_wins};')
