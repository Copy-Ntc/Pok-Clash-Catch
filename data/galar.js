// data/galar.js

const GALAR_POKEMONS = [
    { name: 'Grookey', id: 810, rarity: 'comum' }, { name: 'Thwackey', id: 811, rarity: 'incomum' }, { name: 'Rillaboom', id: 812, rarity: 'raro' },
    { name: 'Scorbunny', id: 813, rarity: 'comum' }, { name: 'Raboot', id: 814, rarity: 'incomum' }, { name: 'Cinderace', id: 815, rarity: 'raro' },
    { name: 'Sobble', id: 816, rarity: 'comum' }, { name: 'Drizzile', id: 817, rarity: 'incomum' }, { name: 'Inteleon', id: 818, rarity: 'raro' },
    { name: 'Skwovet', id: 819, rarity: 'comum' }, { name: 'Greedent', id: 820, rarity: 'incomum' }, { name: 'Rookidee', id: 821, rarity: 'comum' },
    { name: 'Corvisquire', id: 822, rarity: 'incomum' }, { name: 'Corviknight', id: 823, rarity: 'raro' }, { name: 'Blipbug', id: 824, rarity: 'comum' },
    { name: 'Dottler', id: 825, rarity: 'incomum' }, { name: 'Orbeetle', id: 826, rarity: 'raro' }, { name: 'Nickit', id: 827, rarity: 'comum' },
    { name: 'Thievul', id: 828, rarity: 'incomum' }, { name: 'Gossifleur', id: 829, rarity: 'comum' }, { name: 'Eldegoss', id: 830, rarity: 'incomum' },
    { name: 'Wooloo', id: 831, rarity: 'comum' }, { name: 'Dubwool', id: 832, rarity: 'incomum' }, { name: 'Chewtle', id: 833, rarity: 'comum' },
    { name: 'Drednaw', id: 834, rarity: 'incomum' }, { name: 'Yamper', id: 835, rarity: 'comum' }, { name: 'Boltund', id: 836, rarity: 'incomum' },
    { name: 'Cramorant', id: 845, rarity: 'incomum' }, { name: 'Arrokuda', id: 846, rarity: 'comum' }, { name: 'Barraskewda', id: 847, rarity: 'incomum' },
    { name: 'Toxel', id: 848, rarity: 'comum' }, { name: 'Toxtricity', id: 849, rarity: 'incomum' }, { name: 'Sizzlipede', id: 850, rarity: 'comum' },
    { name: 'Centiskorch', id: 851, rarity: 'incomum' }, { name: 'Clobbopus', id: 852, rarity: 'comum' }, { name: 'Grapploct', id: 853, rarity: 'incomum' },
    { name: 'Sinistea', id: 854, rarity: 'incomum' }, { name: 'Polteageist', id: 855, rarity: 'raro' }, { name: 'Hatenna', id: 856, rarity: 'comum' },
    { name: 'Hattrem', id: 857, rarity: 'incomum' }, { name: 'Hatterene', id: 858, rarity: 'raro' }, { name: 'Impidimp', id: 859, rarity: 'comum' },
    { name: 'Morgrem', id: 860, rarity: 'incomum' }, { name: 'Grimmsnarl', id: 861, rarity: 'raro' }, { name: 'Obstagoon', id: 862, rarity: 'incomum' },
    { name: 'Perrserker', id: 863, rarity: 'incomum' }, { name: 'Cursola', id: 864, rarity: 'raro' }, { name: 'Sirfetch\'d', id: 865, rarity: 'raro' },
    { name: 'Mr. Rime', id: 866, rarity: 'raro' }, { name: 'Runerigus', id: 867, rarity: 'raro' }, { name: 'Milcery', id: 868, rarity: 'comum' },
    { name: 'Alcremie', id: 869, rarity: 'incomum' }, { name: 'Falinks', id: 870, rarity: 'incomum' }, { name: 'Pincurchin', id: 871, rarity: 'incomum' },
    { name: 'Snom', id: 872, rarity: 'comum' }, { name: 'Frosmoth', id: 873, rarity: 'incomum' }, { name: 'Stonjourner', id: 874, rarity: 'raro' },
    { name: 'Eiscue', id: 875, rarity: 'raro' }, { name: 'Indeedee', id: 876, rarity: 'incomum' }, { name: 'Morpeko', id: 877, rarity: 'incomum' },
    { name: 'Cufant', id: 878, rarity: 'comum' }, { name: 'Copperajah', id: 879, rarity: 'incomum' }, { name: 'Dracozolt', id: 880, rarity: 'raro' },
    { name: 'Arctozolt', id: 881, rarity: 'raro' }, { name: 'Dracovish', id: 882, rarity: 'raro' }, { name: 'Arctovish', id: 883, rarity: 'raro' },
    { name: 'Duraludon', id: 884, rarity: 'raro' }, { name: 'Dreepy', id: 885, rarity: 'raro' }, { name: 'Drakloak', id: 886, rarity: 'muito raro' },
    { name: 'Dragapult', id: 887, rarity: 'lendário' }, { name: 'Zacian', id: 888, rarity: 'lendário' }, { name: 'Zamazenta', id: 889, rarity: 'lendário' },
    { name: 'Eternatus', id: 890, rarity: 'lendário' }, { name: 'Kubfu', id: 891, rarity: 'muito raro' }, { name: 'Urshifu', id: 892, rarity: 'lendário' },
    { name: 'Zarude', id: 893, rarity: 'mítico' },
    { name: 'Regieleki', id: 894, rarity: 'lendário' }, { name: 'Regidrago', id: 895, rarity: 'lendário' },
    { name: 'Glastrier', id: 896, rarity: 'lendário' }, { name: 'Spectrier', id: 897, rarity: 'lendário' }, { name: 'Calyrex', id: 898, rarity: 'lendário' }
];

const GALAR_EVOLUTIONS = {
    810: { to_id: 811, to_name: 'Thwackey', level: 16 },
    811: { to_id: 812, to_name: 'Rillaboom', level: 35 },
    813: { to_id: 814, to_name: 'Raboot', level: 16 },
    814: { to_id: 815, to_name: 'Cinderace', level: 35 },
    816: { to_id: 817, to_name: 'Drizzile', level: 16 },
    817: { to_id: 818, to_name: 'Inteleon', level: 35 },
    819: { to_id: 820, to_name: 'Greedent', level: 24 },
    821: { to_id: 822, to_name: 'Corvisquire', level: 18 },
    822: { to_id: 823, to_name: 'Corviknight', level: 38 },
    824: { to_id: 825, to_name: 'Dottler', level: 10 },
    825: { to_id: 826, to_name: 'Orbeetle', level: 30 },
    827: { to_id: 828, to_name: 'Thievul', level: 22 },
    829: { to_id: 830, to_name: 'Eldegoss', level: 20 },
    831: { to_id: 832, to_name: 'Dubwool', level: 24 },
    833: { to_id: 834, to_name: 'Drednaw', level: 22 },
    835: { to_id: 836, to_name: 'Boltund', level: 25 },
    846: { to_id: 847, to_name: 'Barraskewda', level: 26 },
    848: { to_id: 849, to_name: 'Toxtricity', level: 30 },
    850: { to_id: 851, to_name: 'Centiskorch', level: 28 },
    852: { to_id: 853, to_name: 'Grapploct', level: 35 }, // Aprender move para Nível 35
    854: { to_id: 855, to_name: 'Polteageist', item: 'cracked_pot' }, // Simplificado para cracked_pot
    856: { to_id: 857, to_name: 'Hattrem', level: 32 },
    857: { to_id: 858, to_name: 'Hatterene', level: 42 },
    859: { to_id: 860, to_name: 'Morgrem', level: 32 },
    860: { to_id: 861, to_name: 'Grimmsnarl', level: 42 },
    264: { to_id: 862, to_name: 'Obstagoon', level: 35 }, // Linoone (Galarian) -> Obstagoon (mudado para nível 35)
    52: { to_id: 863, to_name: 'Perrserker', level: 28 }, // Meowth (Galarian) -> Perrserker (mantido level 28)
    222: { to_id: 864, to_name: 'Cursola', level: 38 }, // Corsola (Galarian) -> Cursola (mudado para nível 38)
    83: { to_id: 865, to_name: 'Sirfetch\'d', level: 40 }, // Mudei de CRIT para LEVEL 40 (e Leaders Crest não faz sentido para Galar Farfetch'd)
    122: { to_id: 866, to_name: 'Mr. Rime', level: 42 }, // Mr. Mime (Galarian) -> Mr. Rime (mantido level 42)
    562: { to_id: 867, to_name: 'Runerigus', level: 34 }, // Galarian Yamask -> Runerigus (mudado para nível 34)
    868: { to_id: 869, to_name: 'Alcremie', level: 25 }, // Condição extra para nível 25
    872: { to_id: 873, to_name: 'Frosmoth', level: 35 }, // Amizade e noite para Nível 35
    878: { to_id: 879, to_name: 'Copperajah', level: 34 },
    885: { to_id: 886, to_name: 'Drakloak', level: 50 },
    886: { to_id: 887, to_name: 'Dragapult', level: 60 }
};

module.exports = { GALAR_POKEMONS, GALAR_EVOLUTIONS };