from termcolor import colored

red_piece = colored(chr(9673), color='red')
yellow_piece = colored(chr(9673), color='yellow')
ths = colored(chr(9149), color='blue')
bhs = colored(chr(9146), color='blue')
vs = colored(chr(9134), color='blue')
tl = colored(chr(9127), color='blue')
tr = colored(chr(9131), color='blue')
bl = colored(chr(9129), color='blue')
br = colored(chr(9133), color='blue')
error_msg = ''
player = red_piece


def draw_field(field):
    for row in range(13):
        if row % 2 == 1:
            practical_row = int(row / 2)
            for column in range(15):
                if column % 2 == 1:
                    practical_column = int(column / 2)
                    print(field[practical_column][practical_row], end='')
                elif column != 14:
                    if column == 0 and row == 1:
                        print(tl, end='')
                    elif column == 0 and row == 11:
                        print(bl, end='')
                    else:
                        print(vs, end='')
                else:
                    if column == 14 and row == 1:
                        print(tr)
                    elif column == 14 and row == 11:
                        print(br)
                    else:
                        print(vs)
        else:
            if row == 0:
                print(' ' + ths + ths + ths + ths + ths + ths + ths +
                      ths + ths + ths + ths + ths + ths + ' ')
            elif row == 12:
                print(' ' + bhs + bhs + bhs + bhs + bhs + bhs + bhs +
                      bhs + bhs + bhs + bhs + bhs + bhs + ' ')


def check_column(c):
    global error_msg
    if c > 7 or c < 1:
        error_msg = f'\nColumn {c} does not exists.\nPlease select a column between 1 and 7.\n'
        return False
    if ' ' in current_column[c-1]:
        return True
    else:
        error_msg = f'\nColumn {c} is full.\nPlease select other column.\n'
        return False


def insert_piece(c, p):
    cc = current_column[c-1]
    total_rows = len(cc) + 1
    for r in range(-1, -total_rows, -1):

        if cc[r] == ' ':
            cc[r] = p
            break


current_column = [[' ', ' ', ' ', ' ', ' ', ' '], [' ', ' ', ' ', ' ', ' ', ' '], [' ', ' ', ' ', ' ', ' ', ' '], [
    ' ', ' ', ' ', ' ', ' ', ' '], [' ', ' ', ' ', ' ', ' ', ' '], [' ', ' ', ' ', ' ', ' ', ' '], [' ', ' ', ' ', ' ', ' ', ' ']]

while(True):
    print('\nColumns:\n\n 1 2 3 4 5 6 7')
    got_error = 1
    draw_field(current_column)
    print(f'Players turn: {player}')
    print(colored(error_msg, color='red'))
    try:
        move_column = int(input('Please enter a column: '))
    except ValueError:
        error_msg = '\nInvalid input.\nNeed to be a number between 1 and 7.\n'
        got_error = 0

    if player == red_piece and got_error:
        # make a move for player red
        if check_column(move_column):
            insert_piece(move_column, player)
            player = yellow_piece
            error_msg = ''
    elif got_error:
        # make a move for player yellow
        if check_column(move_column):
            insert_piece(move_column, player)
            player = red_piece
            error_msg = ''
