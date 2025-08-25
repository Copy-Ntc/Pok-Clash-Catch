// data/kalos.js

const KALOS_POKEMONS = [
    { name: 'Chespin', id: 650, rarity: 'comum' }, { name: 'Quilladin', id: 651, rarity: 'incomum' }, { name: 'Chesnaught', id: 652, rarity: 'raro' },
    { name: 'Fennekin', id: 653, rarity: 'comum' }, { name: 'Braixen', id: 654, rarity: 'incomum' }, { name: 'Delphox', id: 655, rarity: 'raro' },
    { name: 'Froakie', id: 656, rarity: 'comum' }, { name: 'Frogadier', id: 657, rarity: 'incomum' }, { name: 'Greninja', id: 658, rarity: 'raro' },
    { name: 'Bunnelby', id: 659, rarity: 'comum' }, { name: 'Diggersby', id: 660, rarity: 'incomum' }, { name: 'Fletchling', id: 661, rarity: 'comum' },
    { name: 'Fletchinder', id: 662, rarity: 'incomum' }, { name: 'Talonflame', id: 663, rarity: 'raro' }, { name: 'Scatterbug', id: 664, rarity: 'comum' },
    { name: 'Spewpa', id: 665, rarity: 'comum' }, { name: 'Vivillon', id: 666, rarity: 'incomum' }, { name: 'Litleo', id: 667, rarity: 'comum' },
    { name: 'Pyroar', id: 668, rarity: 'incomum' }, { name: 'Flabébé', id: 669, rarity: 'comum' }, { name: 'Floette', id: 670, rarity: 'incomum' },
    { name: 'Florges', id: 671, rarity: 'raro' }, { name: 'Skiddo', id: 672, rarity: 'comum' }, { name: 'Gogoat', id: 673, rarity: 'incomum' },
    { name: 'Pancham', id: 674, rarity: 'comum' }, { name: 'Pangoro', id: 675, rarity: 'incomum' }, { name: 'Furfrou', id: 676, rarity: 'incomum' },
    { name: 'Espurr', id: 677, rarity: 'comum' }, { name: 'Meowstic', id: 678, rarity: 'incomum' }, { name: 'Honedge', id: 679, rarity: 'incomum' },
    { name: 'Doublade', id: 680, rarity: 'raro' }, { name: 'Aegislash', id: 681, rarity: 'muito raro' }, { name: 'Spritzee', id: 682, rarity: 'comum' },
    { name: 'Aromatisse', id: 683, rarity: 'incomum' }, { name: 'Swirlix', id: 684, rarity: 'comum' }, { name: 'Slurpuff', id: 685, rarity: 'incomum' },
    { name: 'Inkay', id: 686, rarity: 'comum' }, { name: 'Malamar', id: 687, rarity: 'incomum' }, { name: 'Binacle', id: 688, rarity: 'comum' },
    { name: 'Barbaracle', id: 689, rarity: 'incomum' }, { name: 'Skrelp', id: 690, rarity: 'comum' }, { name: 'Dragalge', id: 691, rarity: 'incomum' },
    { name: 'Clauncher', id: 692, rarity: 'comum' }, { name: 'Clawitzer', id: 693, rarity: 'incomum' }, { name: 'Helioptile', id: 694, rarity: 'comum' },
    { name: 'Heliolisk', id: 695, rarity: 'incomum' }, { name: 'Tyrunt', id: 696, rarity: 'raro' }, { name: 'Tyrantrum', id: 697, rarity: 'muito raro' },
    { name: 'Amaura', id: 698, rarity: 'raro' }, { name: 'Aurorus', id: 699, rarity: 'muito raro' }, { name: 'Sylveon', id: 700, rarity: 'raro' },
    { name: 'Hawlucha', id: 701, rarity: 'incomum' }, { name: 'Dedenne', id: 702, rarity: 'incomum' }, { name: 'Carbink', id: 703, rarity: 'raro' },
    { name: 'Goomy', id: 704, rarity: 'raro' }, { name: 'Sliggoo', id: 705, rarity: 'muito raro' }, { name: 'Goodra', id: 706, rarity: 'lendário' },
    { name: 'Klefki', id: 707, rarity: 'incomum' }, { name: 'Phantump', id: 708, rarity: 'comum' }, { name: 'Trevenant', id: 709, rarity: 'incomum' },
    { name: 'Pumpkaboo', id: 710, rarity: 'comum' }, { name: 'Gourgeist', id: 711, rarity: 'incomum' }, { name: 'Bergmite', id: 712, rarity: 'comum' },
    { name: 'Avalugg', id: 713, rarity: 'incomum' }, { name: 'Noibat', id: 714, rarity: 'comum' }, { name: 'Noivern', id: 715, rarity: 'incomum' },
    { name: 'Xerneas', id: 716, rarity: 'lendário' }, { name: 'Yveltal', id: 717, rarity: 'lendário' }, { name: 'Zygarde', id: 718, rarity: 'lendário' },
    { name: 'Diancie', id: 719, rarity: 'mítico' },
    { name: 'Hoopa', id: 720, rarity: 'mítico' },
    { name: 'Volcanion', id: 721, rarity: 'mítico' }
];

const KALOS_EVOLUTIONS = {
    650: { to_id: 651, to_name: 'Quilladin', level: 16 },
    651: { to_id: 652, to_name: 'Chesnaught', level: 36 },
    653: { to_id: 654, to_name: 'Braixen', level: 16 },
    654: { to_id: 655, to_name: 'Delphox', level: 36 },
    656: { to_id: 657, to_name: 'Frogadier', level: 16 },
    657: { to_id: 658, to_name: 'Greninja', level: 36 },
    659: { to_id: 660, to_name: 'Diggersby', level: 20 },
    661: { to_id: 662, to_name: 'Fletchinder', level: 17 },
    662: { to_id: 663, to_name: 'Talonflame', level: 35 },
    664: { to_id: 665, to_name: 'Spewpa', level: 9 },
    665: { to_id: 666, to_name: 'Vivillon', level: 12 },
    667: { to_id: 668, to_name: 'Pyroar', level: 35 },
    669: { to_id: 670, to_name: 'Floette', level: 19 },
    670: { to_id: 671, to_name: 'Florges', item: 'shiny_stone' },
    672: { to_id: 673, to_name: 'Gogoat', level: 32 },
    674: { to_id: 675, to_name: 'Pangoro', level: 40 }, // Amizade/Dark type in party para Nível 40
    677: { to_id: 678, to_name: 'Meowstic', level: 25 },
    679: { to_id: 680, to_name: 'Doublade', level: 35 },
    680: { to_id: 681, to_name: 'Aegislash', item: 'dusk_stone' },
    682: { to_id: 683, to_name: 'Aromatisse', level: 40 }, // Mudei de TRADE para LEVEL 40
    684: { to_id: 685, to_name: 'Slurpuff', level: 40 }, // Mudei de TRADE para LEVEL 40
    686: { to_id: 687, to_name: 'Malamar', level: 30 }, // Virar de ponta-cabeça para Nível 30
    688: { to_id: 689, to_name: 'Barbaracle', level: 39 },
    690: { to_id: 691, to_name: 'Dragalge', level: 48 },
    692: { to_id: 693, to_name: 'Clawitzer', level: 37 },
    694: { to_id: 695, to_name: 'Heliolisk', item: 'sun_stone' },
    696: { to_id: 697, to_name: 'Tyrantrum', level: 39 }, // Removida condição 'daytime'
    698: { to_id: 699, to_name: 'Aurorus', level: 39 }, // Removida condição 'night'
    133: { to_id: 700, to_name: 'Sylveon', level: 30 }, // Amizade/fairy move para nível 30
    704: { to_id: 705, to_name: 'Sliggoo', level: 40 },
    705: { to_id: 706, to_name: 'Goodra', level: 50 }, // Removida condição 'rain'
    708: { to_id: 709, to_name: 'Trevenant', level: 40 }, // Mudei de TRADE para LEVEL 40
    710: { to_id: 711, to_name: 'Gourgeist', level: 40 }, // Mudei de TRADE para LEVEL 40
    712: { to_id: 713, to_name: 'Avalugg', level: 37 },
    714: { to_id: 715, to_name: 'Noivern', level: 48 }
};

module.exports = { KALOS_POKEMONS, KALOS_EVOLUTIONS };