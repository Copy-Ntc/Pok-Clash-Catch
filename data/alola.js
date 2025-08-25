// data/alola.js

const ALOLA_POKEMONS = [
    { name: 'Rowlet', id: 722, rarity: 'comum' }, { name: 'Dartrix', id: 723, rarity: 'incomum' }, { name: 'Decidueye', id: 724, rarity: 'raro' },
    { name: 'Litten', id: 725, rarity: 'comum' }, { name: 'Torracat', id: 726, rarity: 'incomum' }, { name: 'Incineroar', id: 727, rarity: 'raro' },
    { name: 'Popplio', id: 728, rarity: 'comum' }, { name: 'Brionne', id: 729, rarity: 'incomum' }, { name: 'Primarina', id: 730, rarity: 'raro' },
    { name: 'Pikipek', id: 731, rarity: 'comum' }, { name: 'Trumbeak', id: 732, rarity: 'incomum' }, { name: 'Toucannon', id: 733, rarity: 'raro' },
    { name: 'Yungoos', id: 734, rarity: 'comum' }, { name: 'Gumshoos', id: 735, rarity: 'incomum' }, { name: 'Grubbin', id: 736, rarity: 'comum' },
    { name: 'Charjabug', id: 737, rarity: 'incomum' }, { name: 'Vikavolt', id: 738, rarity: 'raro' }, { name: 'Crabrawler', id: 739, rarity: 'comum' },
    { name: 'Crabominable', id: 740, rarity: 'incomum' }, { name: 'Oricorio', id: 741, rarity: 'incomum' }, { name: 'Cutiefly', id: 742, rarity: 'comum' },
    { name: 'Ribombee', id: 743, rarity: 'incomum' }, { name: 'Rockruff', id: 744, rarity: 'comum' }, { name: 'Lycanroc', id: 745, rarity: 'incomum' },
    { name: 'Wishiwashi', id: 746, rarity: 'raro' }, { name: 'Mareanie', id: 747, rarity: 'comum' }, { name: 'Toxapex', id: 748, rarity: 'incomum' },
    { name: 'Mudbray', id: 749, rarity: 'comum' }, { name: 'Mudsdale', id: 750, rarity: 'incomum' }, { name: 'Dewpider', id: 751, rarity: 'comum' },
    { name: 'Araquanid', id: 752, rarity: 'incomum' }, { name: 'Fomantis', id: 753, rarity: 'comum' }, { name: 'Lurantis', id: 754, rarity: 'incomum' },
    { name: 'Morelull', id: 755, rarity: 'comum' }, { name: 'Shiinotic', id: 756, rarity: 'incomum' }, { name: 'Salandit', id: 757, rarity: 'incomum' },
    { name: 'Salazzle', id: 758, rarity: 'raro' }, { name: 'Stufful', id: 759, rarity: 'comum' }, { name: 'Bewear', id: 760, rarity: 'incomum' },
    { name: 'Bounsweet', id: 761, rarity: 'comum' }, { name: 'Steenee', id: 762, rarity: 'incomum' }, { name: 'Tsareena', id: 763, rarity: 'raro' },
    { name: 'Comfey', id: 764, rarity: 'incomum' }, { name: 'Oranguru', id: 765, rarity: 'raro' }, { name: 'Passimian', id: 766, rarity: 'raro' },
    { name: 'Wimpod', id: 767, rarity: 'comum' }, { name: 'Golisopod', id: 768, rarity: 'incomum' }, { name: 'Sandygast', id: 769, rarity: 'comum' },
    { name: 'Palossand', id: 770, rarity: 'incomum' }, { name: 'Pyukumuku', id: 771, rarity: 'incomum' }, { name: 'Type: Null', id: 772, rarity: 'muito raro' },
    { name: 'Silvally', id: 773, rarity: 'lendário' }, { name: 'Minior', id: 774, rarity: 'raro' }, { name: 'Komala', id: 775, rarity: 'incomum' },
    { name: 'Turtonator', id: 776, rarity: 'raro' }, { name: 'Togedemaru', id: 777, rarity: 'incomum' }, { name: 'Mimikyu', id: 778, rarity: 'raro' },
    { name: 'Bruxish', id: 779, rarity: 'incomum' }, { name: 'Drampa', id: 780, rarity: 'raro' }, { name: 'Dhelmise', id: 781, rarity: 'raro' },
    { name: 'Jangmo-o', id: 782, rarity: 'raro' }, { name: 'Hakamo-o', id: 783, rarity: 'muito raro' }, { name: 'Kommo-o', id: 784, rarity: 'lendário' },
    { name: 'Tapu Koko', id: 785, rarity: 'lendário' }, { name: 'Tapu Lele', id: 786, rarity: 'lendário' }, { name: 'Tapu Bulu', id: 787, rarity: 'lendário' },
    { name: 'Tapu Fini', id: 788, rarity: 'lendário' }, { name: 'Cosmog', id: 789, rarity: 'mítico' },
    { name: 'Cosmoem', id: 790, rarity: 'mítico' },
    { name: 'Solgaleo', id: 791, rarity: 'lendário' }, { name: 'Lunala', id: 792, rarity: 'lendário' }, { name: 'Nihilego', id: 793, rarity: 'ultra beast' },
    { name: 'Buzzwole', id: 794, rarity: 'ultra beast' }, { name: 'Pheromosa', id: 795, rarity: 'ultra beast' }, { name: 'Xurkitree', id: 796, rarity: 'ultra beast' },
    { name: 'Celesteela', id: 797, rarity: 'ultra beast' }, { name: 'Kartana', id: 798, rarity: 'ultra beast' }, { name: 'Guzzlord', id: 799, rarity: 'ultra beast' },
    { name: 'Necrozma', id: 800, rarity: 'lendário' }, { name: 'Magearna', id: 801, rarity: 'mítico' },
    { name: 'Marshadow', id: 802, rarity: 'mítico' },
    { name: 'Poipole', id: 803, rarity: 'ultra beast' }, { name: 'Naganadel', id: 804, rarity: 'ultra beast' }, { name: 'Stakataka', id: 805, rarity: 'ultra beast' },
    { name: 'Blacephalon', id: 806, rarity: 'ultra beast' }, { name: 'Zeraora', id: 807, rarity: 'mítico' },
    { name: 'Meltan', id: 808, rarity: 'mítico' },
    { name: 'Melmetal', id: 809, rarity: 'mítico' }
];

const ALOLA_EVOLUTIONS = {
    722: { to_id: 723, to_name: 'Dartrix', level: 17 },
    723: { to_id: 724, to_name: 'Decidueye', level: 34 },
    725: { to_id: 726, to_name: 'Torracat', level: 17 },
    726: { to_id: 727, to_name: 'Incineroar', level: 34 },
    728: { to_id: 729, to_name: 'Brionne', level: 17 },
    729: { to_id: 730, to_name: 'Primarina', level: 34 },
    731: { to_id: 732, to_name: 'Trumbeak', level: 14 },
    732: { to_id: 733, to_name: 'Toucannon', level: 28 },
    734: { to_id: 735, to_name: 'Gumshoos', level: 20 },
    736: { to_id: 737, to_name: 'Charjabug', level: 20 },
    737: { to_id: 738, to_name: 'Vikavolt', level: 30 }, // Condição extra para nível 30
    739: { to_id: 740, to_name: 'Crabominable', level: 30 }, // Condição extra para nível 30
    742: { to_id: 743, to_name: 'Ribombee', level: 25 },
    744: { to_id: 745, to_name: 'Lycanroc', level: 25 },
    747: { to_id: 748, to_name: 'Toxapex', level: 38 },
    749: { to_id: 750, to_name: 'Mudsdale', level: 30 },
    751: { to_id: 752, to_name: 'Araquanid', level: 33 },
    753: { to_id: 754, to_name: 'Lurantis', level: 34 },
    755: { to_id: 756, to_name: 'Shiinotic', level: 24 },
    757: { to_id: 758, to_name: 'Salazzle', level: 33, gender: 'female' }, // Salazzle agora por GÊNERO e NÍVEL
    759: { to_id: 760, to_name: 'Bewear', level: 27 },
    761: { to_id: 762, to_name: 'Steenee', level: 18 },
    762: { to_id: 763, to_name: 'Tsareena', level: 30 }, // Aprender move para Nível 30
    767: { to_id: 768, to_name: 'Golisopod', level: 30 }, // Condição extra para nível 30
    769: { to_id: 770, to_name: 'Palossand', level: 42 },
    782: { to_id: 783, to_name: 'Hakamo-o', level: 35 },
    783: { to_id: 784, to_name: 'Kommo-o', level: 45 },
    789: { to_id: 790, to_name: 'Cosmoem', level: 43 },
    790: { to_id: 791, to_name: 'Solgaleo', level: 50 },
    790: { to_id: 792, to_name: 'Lunala', level: 50 },
    803: { to_id: 804, to_name: 'Naganadel', level: 40 }, // Aprender move para Nível 40
    808: { to_id: 809, to_name: 'Melmetal', level: 45 } // Mudei de TRADE para LEVEL 45
};

module.exports = { ALOLA_POKEMONS, ALOLA_EVOLUTIONS };