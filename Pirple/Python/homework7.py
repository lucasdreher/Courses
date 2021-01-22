# Homework Assignment #7: Dictionaries and Sets

favorite_songs = {
    'Song': 'Blinding Lights',
    'Artist': 'the Weeknd',
    'Album': 'After Hours',
    'Genre': 'Synthwave - synth-pop - electropop',
    'DurationInSeconds': str(3*60+22),
    'RecordLabel': 'XO',
    'Songwriters': 'Abel Tesfaye - Ahmad Balshe - Jason Quenneville - Max Martin - Oscar Holter',
    'Producers': 'Max Martin - Oscar Holter - The Weeknd',
}

for key, value in favorite_songs.items():
    print(key + ': ' + value)
