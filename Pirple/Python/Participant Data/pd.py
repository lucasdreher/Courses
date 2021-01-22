# participant_number = 5
# participant_data = []
# registered_participants = 0
# output_file = open('participant_data.txt', 'w')

# while(registered_participants < participant_number):
#     temp_part_data = []  # name, country of origin, age
#     name = input('Please enter your name: ')
#     temp_part_data.append(name)
#     country = input('Please enter your country of origin: ')
#     temp_part_data.append(country)
#     age = int(input('Please enter your age: '))
#     temp_part_data.append(age)
#     participant_data.append(temp_part_data)

#     registered_participants += 1
# for participant in participant_data:
#     for data in participant:
#         output_file.write(str(data))
#         output_file.write(" ")
#     output_file.write("\n")

# output_file.close()

input_file = open('participant_data.txt', 'r')

input_list = []

for line in input_file:
    temp_participant = line.strip('\n').split()
    # print(temp_participant)
    input_list.append(temp_participant)
    # print(input_list)

age = {}
for part in input_list:
    temp_age = int(part[-1])
    if part[-1] in age:
        age[part[-1]] += 1
    else:
        age[part[-1]] = 1

print(age)

countries = {}
for part in input_list:
    temp_country = part[1]
    if part[1] in countries:
        countries[part[1]] += 1
    else:
        countries[part[1]] = 1

print(countries)

oldest = 0
youngest = 100
most_occuring_age = 0
counter = 0

for temp_age in age:
    if int(temp_age) > oldest:
        oldest = int(temp_age)
    if int(temp_age) < youngest:
        youngest = int(temp_age)
    if age[temp_age] > counter:
        counter = age[temp_age]
        most_occuring_age = temp_age

print(oldest)
print(youngest)
print(f'Most occuring age is {most_occuring_age} with {counter} participants.')

input_file.close()
