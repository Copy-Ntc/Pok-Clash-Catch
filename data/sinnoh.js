// data/sinnoh.js

const SINNOH_POKEMONS = [
    { name: 'Turtwig', id: 387, rarity: 'comum' }, { name: 'Grotle', id: 388, rarity: 'incomum' }, { name: 'Torterra', id: 389, rarity: 'raro' },
    { name: 'Chimchar', id: 390, rarity: 'comum' }, { name: 'Monferno', id: 391, rarity: 'incomum' }, { name: 'Infernape', id: 392, rarity: 'raro' },
    { name: 'Piplup', id: 393, rarity: 'comum' }, { name: 'Prinplup', id: 394, rarity: 'incomum' }, { name: 'Empoleon', id: 395, rarity: 'raro' },
    { name: 'Starly', id: 396, rarity: 'comum' }, { name: 'Staravia', id: 397, rarity: 'incomum' }, { name: 'Staraptor', id: 398, rarity: 'raro' },
    { name: 'Bidoof', id: 399, rarity: 'comum' }, { name: 'Bibarel', id: 400, rarity: 'incomum' }, { name: 'Kricketot', id: 401, rarity: 'comum' },
    { name: 'Kricketune', id: 402, rarity: 'incomum' }, { name: 'Shinx', id: 403, rarity: 'comum' }, { name: 'Luxio', id: 404, rarity: 'incomum' },
    { name: 'Luxray', id: 405, rarity: 'raro' }, { name: 'Budew', id: 406, rarity: 'incomum' }, { name: 'Roserade', id: 407, rarity: 'raro' },
    { name: 'Cranidos', id: 408, rarity: 'raro' }, { name: 'Rampardos', id: 409, rarity: 'muito raro' }, { name: 'Shieldon', id: 410, rarity: 'raro' },
    { name: 'Bastiodon', id: 411, rarity: 'muito raro' }, { name: 'Burmy', id: 412, rarity: 'comum' }, { name: 'Wormadam', id: 413, rarity: 'incomum' },
    { name: 'Mothim', id: 414, rarity: 'incomum' }, { name: 'Combee', id: 415, rarity: 'comum' }, { name: 'Vespiquen', id: 416, rarity: 'raro' },
    { name: 'Pachirisu', id: 417, rarity: 'comum' }, { name: 'Buizel', id: 418, rarity: 'comum' }, { name: 'Floatzel', id: 419, rarity: 'incomum' },
    { name: 'Cherubi', id: 420, rarity: 'comum' }, { name: 'Cherrim', id: 421, rarity: 'incomum' }, { name: 'Shellos', id: 422, rarity: 'comum' },
    { name: 'Gastrodon', id: 423, rarity: 'incomum' }, { name: 'Ambipom', id: 424, rarity: 'raro' }, { name: 'Drifloon', id: 425, rarity: 'comum' },
    { name: 'Drifblim', id: 426, rarity: 'incomum' }, { name: 'Buneary', id: 427, rarity: 'comum' }, { name: 'Lopunny', id: 428, rarity: 'incomum' },
    { name: 'Mismagius', id: 429, rarity: 'raro' }, { name: 'Honchkrow', id: 430, rarity: 'raro' }, { name: 'Glameow', id: 431, rarity: 'comum' },
    { name: 'Purugly', id: 432, rarity: 'incomum' }, { name: 'Chingling', id: 433, rarity: 'incomum' }, { name: 'Stunky', id: 434, rarity: 'comum' },
    { name: 'Skuntank', id: 435, rarity: 'incomum' }, { name: 'Bronzor', id: 436, rarity: 'comum' }, { name: 'Bronzong', id: 437, rarity: 'incomum' },
    { name: 'Bonsly', id: 438, rarity: 'incomum' }, { name: 'Mime Jr.', id: 439, rarity: 'incomum' }, { name: 'Happiny', id: 440, rarity: 'raro' },
    { name: 'Chatot', id: 441, rarity: 'comum' }, { name: 'Spiritomb', id: 442, rarity: 'raro' }, { name: 'Gible', id: 443, rarity: 'raro' },
    { name: 'Gabite', id: 444, rarity: 'muito raro' }, { name: 'Garchomp', id: 445, rarity: 'lendário' }, { name: 'Munchlax', id: 446, rarity: 'raro' },
    { name: 'Riolu', id: 447, rarity: 'raro' }, { name: 'Lucario', id: 448, rarity: 'muito raro' }, { name: 'Hippopotas', id: 449, rarity: 'incomum' },
    { name: 'Hippowdon', id: 450, rarity: 'raro' }, { name: 'Skorupi', id: 451, rarity: 'comum' }, { name: 'Drapion', id: 452, rarity: 'incomum' },
    { name: 'Croagunk', id: 453, rarity: 'comum' }, { name: 'Toxicroak', id: 454, rarity: 'incomum' }, { name: 'Carnivine', id: 455, rarity: 'incomum' },
    { name: 'Finneon', id: 456, rarity: 'comum' }, { name: 'Lumineon', id: 457, rarity: 'incomum' }, { name: 'Mantyke', id: 458, rarity: 'incomum' },
    { name: 'Snover', id: 459, rarity: 'comum' }, { name: 'Abomasnow', id: 460, rarity: 'incomum' }, { name: 'Weavile', id: 461, rarity: 'raro' },
    { name: 'Magmortar', id: 466, rarity: 'raro' }, { name: 'Electivire', id: 467, rarity: 'raro' }, { name: 'Togekiss', id: 468, rarity: 'lendário' },
    { name: 'Yanmega', id: 469, rarity: 'raro' }, { name: 'Leafeon', id: 470, rarity: 'raro' }, { name: 'Glaceon', id: 471, rarity: 'raro' },
    { name: 'Gliscor', id: 472, rarity: 'raro' }, { name: 'Mamoswine', id: 473, rarity: 'raro' }, { name: 'Porygon-Z', id: 474, rarity: 'muito raro' },
    { name: 'Gallade', id: 475, rarity: 'raro' }, { name: 'Probopass', id: 476, rarity: 'raro' }, { name: 'Dusknoir', id: 477, rarity: 'raro' },
    { name: 'Froslass', id: 478, rarity: 'raro' }, { name: 'Rotom', id: 479, rarity: 'mítico' },
    { name: 'Uxie', id: 480, rarity: 'lendário' }, { name: 'Mesprit', id: 481, rarity: 'lendário' }, { name: 'Azelf', id: 482, rarity: 'lendário' },
    { name: 'Dialga', id: 483, rarity: 'lendário' }, { name: 'Palkia', id: 484, rarity: 'lendário' }, { name: 'Heatran', id: 485, rarity: 'lendário' },
    { name: 'Regigigas', id: 486, rarity: 'lendário' }, { name: 'Giratina', id: 487, rarity: 'lendário' }, { name: 'Cresselia', id: 488, rarity: 'lendário' },
    { name: 'Phione', id: 489, rarity: 'mítico' },
    { name: 'Manaphy', id: 490, rarity: 'mítico' },
    { name: 'Darkrai', id: 491, rarity: 'mítico' },
    { name: 'Shaymin', id: 492, rarity: 'mítico' },
    { name: 'Arceus', id: 493, rarity: 'mítico' }
];

const SINNOH_EVOLUTIONS = {
    387: { to_id: 388, to_name: 'Grotle', level: 18 },
    388: { to_id: 389, to_name: 'Torterra', level: 32 },
    390: { to_id: 391, to_name: 'Monferno', level: 14 },
    391: { to_id: 392, to_name: 'Infernape', level: 36 },
    393: { to_id: 394, to_name: 'Prinplup', level: 16 },
    394: { to_id: 395, to_name: 'Empoleon', level: 36 },
    396: { to_id: 397, to_name: 'Staravia', level: 14 },
    397: { to_id: 398, to_name: 'Staraptor', level: 34 },
    399: { to_id: 400, to_name: 'Bibarel', level: 15 },
    401: { to_id: 402, to_name: 'Kricketune', level: 10 },
    403: { to_id: 404, to_name: 'Luxio', level: 15 },
    404: { to_id: 405, to_name: 'Luxray', level: 30 },
    406: { to_id: 315, to_name: 'Roselia', level: 20 }, // Amizade para Nível 20
    315: { to_id: 407, to_name: 'Roserade', item: 'shiny_stone' },
    408: { to_id: 409, to_name: 'Rampardos', level: 30 },
    410: { to_id: 411, to_name: 'Bastiodon', level: 30 },
    412: { to_id: 413, to_name: 'Wormadam', female: true, level: 20 },
    412: { to_id: 414, to_name: 'Mothim', male: true, level: 20 },
    415: { to_id: 416, to_name: 'Vespiquen', female: true, level: 21 },
    418: { to_id: 419, to_name: 'Floatzel', level: 26 },
    420: { to_id: 421, to_name: 'Cherrim', level: 25 },
    422: { to_id: 423, to_name: 'Gastrodon', level: 30 },
    190: { to_id: 424, to_name: 'Ambipom', level: 32 }, // Aprender move para Nível 32
    425: { to_id: 426, to_name: 'Drifblim', level: 28 },
    427: { to_id: 428, to_name: 'Lopunny', level: 30 }, // Amizade para Nível 30
    200: { to_id: 429, to_name: 'Mismagius', item: 'dusk_stone' },
    198: { to_id: 430, to_name: 'Honchkrow', item: 'dusk_stone' },
    431: { to_id: 432, to_name: 'Purugly', level: 38 },
    358: { to_id: 433, to_name: 'Chingling', level: 25 }, // Amizade para Nível 25
    434: { to_id: 435, to_name: 'Skuntank', level: 34 },
    436: { to_id: 437, to_name: 'Bronzong', level: 33 },
    185: { to_id: 438, to_name: 'Bonsly', level: 25 }, // Aprender move para Nível 25
    122: { to_id: 439, to_name: 'Mime Jr.', level: 25 }, // Aprender move para Nível 25
    113: { to_id: 440, to_name: 'Happiny', item: 'oval_stone' }, // Item not day
    443: { to_id: 444, to_name: 'Gabite', level: 24 },
    444: { to_id: 445, to_name: 'Garchomp', level: 48 },
    143: { to_id: 446, to_name: 'Munchlax', level: 40 }, // Amizade para Nível 40
    447: { to_id: 448, to_name: 'Lucario', level: 40 }, // Amizade e dia para Nível 40
    449: { to_id: 450, to_name: 'Hippowdon', level: 34 },
    451: { to_id: 452, to_name: 'Drapion', level: 40 },
    453: { to_id: 454, to_name: 'Toxicroak', level: 37 },
    456: { to_id: 457, to_name: 'Lumineon', level: 31 },
    458: { to_id: 226, to_name: 'Mantine', level: 35 }, // Amizade para Nível 35
    459: { to_id: 460, to_name: 'Abomasnow', level: 40 },
    215: { to_id: 461, to_name: 'Weavile', item: 'razor_claw' }, // Item not night
    125: { to_id: 466, to_name: 'Electivire', level: 45 }, // Mudei de TRADE para LEVEL 45
    126: { to_id: 467, to_name: 'Magmortar', level: 45 }, // Mudei de TRADE para LEVEL 45
    176: { to_id: 468, to_name: 'Togekiss', item: 'shiny_stone' },
    193: { to_id: 469, to_name: 'Yanmega', level: 40 }, // Aprender move para Nível 40
    133: { to_id: 470, to_name: 'Leafeon', item: 'leaf_stone' }, // Mudando para Leaf Stone (antes Mossy Rock)
    133: { to_id: 471, to_name: 'Glaceon', item: 'ice_stone' }, // Mudando para Ice Stone (antes Ice Rock)
    207: { to_id: 472, to_name: 'Gliscor', item: 'razor_fang' }, // Item not night
    221: { to_id: 473, to_name: 'Mamoswine', level: 50 }, // Aprender move para Nível 50
    233: { to_id: 474, to_name: 'Porygon-Z', level: 50 }, // Mudei de TRADE para LEVEL 50
    281: { to_id: 475, to_name: 'Gallade', item: 'dawn_stone', gender: 'male' }, // Requer gênero (male)
    299: { to_id: 476, to_name: 'Probopass', level: 30 }, // Nível em área magnética para Nível 30
    356: { to_id: 477, to_name: 'Dusknoir', level: 45 }, // Mudei de TRADE para LEVEL 45
    361: { to_id: 478, to_name: 'Froslass', item: 'dawn_stone', gender: 'female' } // Requer gênero (female)
};

module.exports = { SINNOH_POKEMONS, SINNOH_EVOLUTIONS };