def draw_field(field):
    for row in range(5):
        if row % 2 == 0:
            practical_row = int(row / 2)
            # print(type(practical_row))
            # print(practical_row)
            # print writing lines
            for column in range(5):
                if column % 2 == 0:
                    practical_column = int(column / 2)
                    if column != 4:
                        print(field[practical_column][practical_row], end='')
                    else:
                        print(field[practical_column][practical_row])
                else:
                    print('|', end='')
        else:
            print('-----')


player = 'X'
current_field = [[' ', ' ', ' '], [' ', ' ', ' '], [' ', ' ', ' ']]

while(True):
    draw_field(current_field)
    print(f'Players turn: {player}')
    move_row = int(input('Please enter the row: '))
    move_column = int(input('Please enter the column: '))
    if player == 'X':
        # make a move for player x
        if current_field[move_column][move_row] == ' ':
            current_field[move_column][move_row] = player
            player = 'O'
    else:
        # make a move for player y
        if current_field[move_column][move_row] == ' ':
            current_field[move_column][move_row] = player
            player = 'X'
