files = []


def new_file(f):
    files.append(f)
    output_file = open(f'{f}.txt', 'w')
    new_line = ''
    while (new_line == ''):
        new_line = input(f'\nFile {f}.txt created.\nInsert your text here: ')
    output_file.write(f'{new_line} \n')
    output_file.close()


def read_file(f):
    print(f'\nThe content of file {f}.txt is as follows...\n')
    r_file = open(f'{f}.txt', 'r')
    for line in r_file:
        print(line)
    print(f'...end of file {f}.txt\n')
    r_file.close()


def update_file(f):
    output_file = open(f'{f}.txt', 'a')
    new_line = ''
    while (new_line == ''):
        new_line = input(
            f'\nFile {f}.txt ready to be updated.\nInsert your new line here: ')
    output_file.write(f'{new_line} \n')
    output_file.close()
    print(f'\nFile {f}.txt updated.')


def replace_line(f):
    r_file = open(f'{f}.txt', 'r')
    temp_data = r_file.readlines()
    r_file.close()
    selected_line = 0
    new_line = ''
    temp_line_count = len(temp_data)
    print(f'\nThe content of file {f}.txt has {temp_line_count} lines.\n')
    while (selected_line < 1 or selected_line > temp_line_count):
        got_error = 1
        try:
            selected_line = int(input('Line number to update: '))
        except ValueError:
            print(
                f'\nInvalid input.\nNeed to be a number between 1 and {temp_line_count}.\n')
            got_error = 0
        if got_error:
            print(
                f'\nYou selected the line {selected_line}.\nYou need to insert a number between 1 and {temp_line_count}.\n')

    while (new_line == ''):
        new_line = input(
            f'\nYour old line:\n\n{temp_data[selected_line-1]}\nInsert the new text here: ')
    temp_data[selected_line-1] = new_line + '\n'
    output_file = open(f'{f}.txt', 'w')
    output_file.writelines(temp_data)
    output_file.close()
    print(f'\nLine {selected_line} of file {f}.txt has been updated.')


def user_action(f):
    print(f'\nFile {f}.txt already exists.')
    while (True):
        action = input(
            f'\nDo you wish to:\n\nA) Read the file\nB) Delete the file and start over\nC) Append the file\nD) Replace a single line\n\nSelect your next action: ').upper()
        if action == 'A':
            read_file(f)
            break
        elif action == 'B':
            new_file(f)
            break
        elif action == 'C':
            update_file(f)
            break
        elif action == 'D':
            replace_line(f)
            break
        else:
            print('\nSelect the next action based on the letters A, B, C or D.')


while (True):
    file_name = input('\nName your file: ')
    if file_name != '':
        if file_name in files:
            user_action(file_name)
        else:
            new_file(file_name)
