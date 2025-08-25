// data/johto.js

const JOHTO_POKEMONS = [
    { name: 'Chikorita', id: 152, rarity: 'comum' }, { name: 'Bayleef', id: 153, rarity: 'incomum' }, { name: 'Meganium', id: 154, rarity: 'raro' },
    { name: 'Cyndaquil', id: 155, rarity: 'comum' }, { name: 'Quilava', id: 156, rarity: 'incomum' }, { name: 'Typhlosion', id: 157, rarity: 'raro' },
    { name: 'Totodile', id: 158, rarity: 'comum' }, { name: 'Croconaw', id: 159, rarity: 'incomum' }, { name: 'Feraligatr', id: 160, rarity: 'raro' },
    { name: 'Sentret', id: 161, rarity: 'comum' }, { name: 'Furret', id: 162, rarity: 'incomum' }, { name: 'Hoothoot', id: 163, rarity: 'comum' },
    { name: 'Noctowl', id: 164, rarity: 'incomum' }, { name: 'Ledyba', id: 165, rarity: 'comum' }, { name: 'Ledian', id: 166, rarity: 'incomum' },
    { name: 'Spinarak', id: 167, rarity: 'comum' }, { name: 'Ariados', id: 168, rarity: 'incomum' }, { name: 'Crobat', id: 169, rarity: 'raro' },
    { name: 'Chinchou', id: 170, rarity: 'comum' }, { name: 'Lanturn', id: 171, rarity: 'incomum' }, { name: 'Pichu', id: 172, rarity: 'incomum' },
    { name: 'Cleffa', id: 173, rarity: 'incomum' }, { name: 'Igglybuff', id: 174, rarity: 'incomum' }, { name: 'Togepi', id: 175, rarity: 'raro' },
    { name: 'Togetic', id: 176, rarity: 'muito raro' }, { name: 'Natu', id: 177, rarity: 'comum' }, { name: 'Xatu', id: 178, rarity: 'incomum' },
    { name: 'Mareep', id: 179, rarity: 'comum' }, { name: 'Flaaffy', id: 180, rarity: 'incomum' }, { name: 'Ampharos', id: 181, rarity: 'raro' },
    { name: 'Bellossom', id: 182, rarity: 'raro' }, { name: 'Marill', id: 183, rarity: 'comum' }, { name: 'Azumarill', id: 184, rarity: 'incomum' },
    { name: 'Sudowoodo', id: 185, rarity: 'incomum' }, { name: 'Politoed', id: 186, rarity: 'raro' }, { name: 'Hoppip', id: 187, rarity: 'comum' },
    { name: 'Skiploom', id: 188, rarity: 'comum' }, { name: 'Jumpluff', id: 189, rarity: 'incomum' }, { name: 'Aipom', id: 190, rarity: 'comum' },
    { name: 'Sunkern', id: 191, rarity: 'comum' }, { name: 'Sunflora', id: 192, rarity: 'incomum' }, { name: 'Yanma', id: 193, rarity: 'incomum' },
    { name: 'Wooper', id: 194, rarity: 'comum' }, { name: 'Quagsire', id: 195, rarity: 'incomum' }, { name: 'Murkrow', id: 198, rarity: 'incomum' },
    { name: 'Slowking', id: 199, rarity: 'raro' }, { name: 'Misdreavus', id: 200, rarity: 'incomum' }, { name: 'Unown', id: 201, rarity: 'incomum' },
    { name: 'Wobbuffet', id: 202, rarity: 'incomum' }, { name: 'Girafarig', id: 203, rarity: 'incomum' }, { name: 'Pineco', id: 204, rarity: 'comum' },
    { name: 'Forretress', id: 205, rarity: 'incomum' }, { name: 'Dunsparce', id: 206, rarity: 'comum' }, { name: 'Gligar', id: 207, rarity: 'incomum' },
    { name: 'Steelix', id: 208, rarity: 'raro' }, { name: 'Snubbull', id: 209, rarity: 'comum' }, { name: 'Granbull', id: 210, rarity: 'incomum' },
    { name: 'Qwilfish', id: 211, rarity: 'comum' }, { name: 'Scizor', id: 212, rarity: 'raro' }, { name: 'Shuckle', id: 213, rarity: 'incomum' },
    { name: 'Heracross', id: 214, rarity: 'raro' }, { name: 'Sneasel', id: 215, rarity: 'incomum' }, { name: 'Teddiursa', id: 216, rarity: 'comum' },
    { name: 'Ursaring', id: 217, rarity: 'incomum' }, { name: 'Slugma', id: 218, rarity: 'comum' }, { name: 'Magcargo', id: 219, rarity: 'incomum' },
    { name: 'Swinub', id: 220, rarity: 'comum' }, { name: 'Piloswine', id: 221, rarity: 'incomum' }, { name: 'Corsola', id: 222, rarity: 'comum' },
    { name: 'Remoraid', id: 223, rarity: 'comum' }, { name: 'Octillery', id: 224, rarity: 'incomum' }, { name: 'Delibird', id: 225, rarity: 'comum' },
    { name: 'Mantine', id: 226, rarity: 'incomum' }, { name: 'Skarmory', id: 227, rarity: 'raro' }, { name: 'Houndour', id: 228, rarity: 'comum' },
    { name: 'Houndoom', id: 229, rarity: 'incomum' }, { name: 'Kingdra', id: 230, rarity: 'muito raro' }, { name: 'Phanpy', id: 231, rarity: 'comum' },
    { name: 'Donphan', id: 232, rarity: 'incomum' }, { name: 'Porygon2', id: 233, rarity: 'muito raro' }, { name: 'Stantler', id: 234, rarity: 'incomum' },
    { name: 'Smeargle', id: 235, rarity: 'incomum' }, { name: 'Tyrogue', id: 236, rarity: 'raro' }, { name: 'Hitmontop', id: 237, rarity: 'raro' },
    { name: 'Smoochum', id: 238, rarity: 'incomum' }, { name: 'Elekid', id: 239, rarity: 'incomum' }, { name: 'Magby', id: 240, rarity: 'incomum' },
    { name: 'Miltank', id: 241, rarity: 'raro' }, { name: 'Blissey', id: 242, rarity: 'muito raro' }, { name: 'Raikou', id: 243, rarity: 'lendário' },
    { name: 'Entei', id: 244, rarity: 'lendário' }, { name: 'Suicune', id: 245, rarity: 'lendário' }, { name: 'Larvitar', id: 246, rarity: 'raro' },
    { name: 'Pupitar', id: 247, rarity: 'muito raro' }, { name: 'Tyranitar', id: 248, rarity: 'muito raro' }, { name: 'Lugia', id: 249, rarity: 'lendário' },
    { name: 'Ho-Oh', id: 250, rarity: 'lendário' }, { name: 'Celebi', id: 251, rarity: 'mítico' }
];

const JOHTO_EVOLUTIONS = {
    161: { to_id: 162, to_name: 'Furret', level: 15 },
    163: { to_id: 164, to_name: 'Noctowl', level: 20 },
    165: { to_id: 166, to_name: 'Ledian', level: 18 },
    167: { to_id: 168, to_name: 'Ariados', level: 22 },
    41: { to_id: 169, to_name: 'Crobat', level: 40 }, // Amizade para Nível 40
    170: { to_id: 171, to_name: 'Lanturn', level: 27 },
    25: { to_id: 26, to_name: 'Raichu', item: 'thunder_stone' },
    172: { to_id: 25, to_name: 'Pikachu', level: 20 }, // Amizade para Nível 20
    35: { to_id: 173, to_name: 'Cleffa', level: 20 }, // Amizade para Nível 20
    39: { to_id: 174, to_name: 'Igglybuff', level: 20 }, // Amizade para Nível 20
    175: { to_id: 176, to_name: 'Togetic', level: 30 }, // Amizade para Nível 30
    176: { to_id: 468, to_name: 'Togekiss', item: 'shiny_stone' },
    177: { to_id: 178, to_name: 'Xatu', level: 25 },
    179: { to_id: 180, to_name: 'Flaaffy', level: 15 },
    180: { to_id: 181, to_name: 'Ampharos', level: 30 },
    44: { to_id: 182, to_name: 'Bellossom', item: 'sun_stone' },
    183: { to_id: 184, to_name: 'Azumarill', level: 18 },
    60: { to_id: 186, to_name: 'Politoed', level: 40 }, // Mudei de TRADE para LEVEL 40
    187: { to_id: 188, to_name: 'Skiploom', level: 18 },
    188: { to_id: 189, to_name: 'Jumpluff', level: 27 },
    191: { to_id: 192, to_name: 'Sunflora', item: 'sun_stone' },
    193: { to_id: 469, to_name: 'Yanmega', level: 40 }, // Aprender move para Nível 40
    194: { to_id: 195, to_name: 'Quagsire', level: 20 },
    79: { to_id: 199, to_name: 'Slowking', level: 40 }, // Mudei de TRADE para LEVEL 40
    204: { to_id: 205, to_name: 'Forretress', level: 31 },
    95: { to_id: 208, to_name: 'Steelix', level: 45 }, // Mudei de TRADE para LEVEL 45
    207: { to_id: 472, to_name: 'Gliscor', item: 'razor_fang' }, // Item not night
    209: { to_id: 210, to_name: 'Granbull', level: 23 },
    123: { to_id: 212, to_name: 'Scizor', level: 45 }, // Mudei de TRADE para LEVEL 45
    215: { to_id: 461, to_name: 'Weavile', item: 'razor_claw' }, // Item not night
    216: { to_id: 217, to_name: 'Ursaring', level: 30 },
    218: { to_id: 219, to_name: 'Magcargo', level: 38 },
    220: { to_id: 221, to_name: 'Piloswine', level: 33 },
    221: { to_id: 473, to_name: 'Mamoswine', level: 50 }, // Aprender move para Nível 50
    223: { to_id: 224, to_name: 'Octillery', level: 25 },
    117: { to_id: 230, to_name: 'Kingdra', level: 40 }, // Mudei de TRADE para LEVEL 40
    231: { to_id: 232, to_name: 'Donphan', level: 25 },
    137: { to_id: 233, to_name: 'Porygon2', level: 40 }, // Mudei de TRADE para LEVEL 40
    233: { to_id: 474, to_name: 'Porygon-Z', level: 50 }, // Mudei de TRADE para LEVEL 50
    113: { to_id: 242, to_name: 'Blissey', level: 50 }, // Amizade para Nível 50
    246: { to_id: 247, to_name: 'Pupitar', level: 30 },
    247: { to_id: 248, to_name: 'Tyranitar', level: 55 }
};

module.exports = { JOHTO_POKEMONS, JOHTO_EVOLUTIONS };