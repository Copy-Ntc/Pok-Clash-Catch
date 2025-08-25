// data/attacks.js

const GENERIC_ATTACKS = {
    'Normal': [
        { name: 'Investida', power: 40, accuracy: 100, strength: 'normal' },
        { name: 'Ataque Rápido', power: 40, accuracy: 100, strength: 'normal' },
        { name: 'Giga Impacto', power: 150, accuracy: 90, strength: 'strong' },
        { name: 'Hiper Raio', power: 150, accuracy: 90, strength: 'strong' }
    ],
    'Fire': [
        { name: 'Brasas', power: 40, accuracy: 100, strength: 'normal' },
        { name: 'Onda de Fogo', power: 80, accuracy: 90, strength: 'normal' },
        { name: 'Lança-chamas', power: 90, accuracy: 100, strength: 'strong' },
        { name: 'Queimadura', power: 130, accuracy: 90, strength: 'strong' } // Nome diferente
    ],
    'Water': [
        { name: 'Jato de Água', power: 40, accuracy: 100, strength: 'normal' },
        { name: 'Jato Bolha', power: 65, accuracy: 100, strength: 'normal' },
        { name: 'Hidro Bomba', power: 110, accuracy: 80, strength: 'strong' },
        { name: 'Onda de Água', power: 90, accuracy: 100, strength: 'strong' }
    ],
    'Grass': [
        { name: 'Folha Navalha', power: 55, accuracy: 95, strength: 'normal' },
        { name: 'Mega Drain', power: 40, accuracy: 100, strength: 'normal' },
        { name: 'Chicote de Cipó', power: 45, accuracy: 100, strength: 'normal' },
        { name: 'Raio Solar', power: 120, accuracy: 100, strength: 'strong' },
        { name: 'Pó de Sono', power: 0, accuracy: 75, strength: 'status' }
    ],
    'Electric': [
        { name: 'Choque do Trovão', power: 40, accuracy: 100, strength: 'normal' },
        { name: 'Descarga', power: 80, accuracy: 100, strength: 'normal' },
        { name: 'Raio', power: 90, accuracy: 100, strength: 'strong' }, // Nome diferente
        { name: 'Trovoada', power: 110, accuracy: 70, strength: 'strong' } // Nome diferente
    ],
    'Ice': [
        { name: 'Pó de Neve', power: 40, accuracy: 100, strength: 'normal' },
        { name: 'Raio Congelante', power: 90, accuracy: 100, strength: 'strong' },
        { name: 'Nevasca', power: 110, accuracy: 70, strength: 'strong' }
    ],
    'Fighting': [
        { name: 'Soco Certeiro', power: 75, accuracy: 100, strength: 'normal' },
        { name: 'Low Kick', power: 65, accuracy: 100, strength: 'normal' },
        { name: 'Close Combat', power: 120, accuracy: 100, strength: 'strong' },
        { name: 'Punho Dinâmico', power: 100, accuracy: 50, strength: 'strong' } // Nome diferente
    ],
    'Poison': [
        { name: 'Picada Venenosa', power: 15, accuracy: 100, strength: 'normal' },
        { name: 'Onda Tóxica', power: 90, accuracy: 100, strength: 'normal' },
        { name: 'Bomba de Lodo', power: 90, accuracy: 100, strength: 'strong' },
        { name: 'Gunk Shot', power: 120, accuracy: 80, strength: 'strong' }
    ],
    'Ground': [
        { name: 'Tapa de Lama', power: 20, accuracy: 100, strength: 'normal' },
        { name: 'Escavação', power: 80, accuracy: 100, strength: 'normal' },
        { name: 'Terremoto', power: 100, accuracy: 100, strength: 'strong' },
        { name: 'Fissura', power: 999, accuracy: 30, strength: 'strong' }
    ],
    'Flying': [
        { name: 'Ataque de Asa', power: 60, accuracy: 100, strength: 'normal' },
        { name: 'Asa de Aço', power: 70, accuracy: 90, strength: 'normal' },
        { name: 'Ataque Aéreo', power: 140, accuracy: 90, strength: 'strong' },
        { name: 'Sky Attack', power: 140, accuracy: 90, strength: 'strong' }
    ],
    'Psychic': [
        { name: 'Confusão', power: 50, accuracy: 100, strength: 'normal' },
        { name: 'Psíquico', power: 90, accuracy: 100, strength: 'strong' },
        { name: 'Explosão Mental', power: 100, accuracy: 90, strength: 'strong' }
    ],
    'Bug': [
        { name: 'Picada', power: 60, accuracy: 100, strength: 'normal' },
        { name: 'Tesoura X', power: 80, accuracy: 100, strength: 'normal' },
        { name: 'Megachifre', power: 120, accuracy: 85, strength: 'strong' }
    ],
    'Rock': [
        { name: 'Lançamento de Pedras', power: 50, accuracy: 90, strength: 'normal' },
        { name: 'Pedra Oculta', power: 70, accuracy: 100, strength: 'normal' },
        { name: 'Tempestade de Areia', power: 100, accuracy: 80, strength: 'strong' },
        { name: 'Pedra Bruta', power: 75, accuracy: 90, strength: 'strong' }
    ],
    'Ghost': [
        { name: 'Lambida Sombria', power: 30, accuracy: 100, strength: 'normal' },
        { name: 'Bola Sombria', power: 80, accuracy: 100, strength: 'strong' },
        { name: 'Assombrar', power: 90, accuracy: 100, strength: 'strong' }
    ],
    'Dragon': [
        { name: 'Sopro do Dragão', power: 60, accuracy: 100, strength: 'normal' },
        { name: 'Garra de Dragão', power: 80, accuracy: 100, strength: 'normal' },
        { name: 'Pulso do Dragão', power: 85, accuracy: 100, strength: 'strong' },
        { name: 'Cometa Draco', power: 130, accuracy: 90, strength: 'strong' }
    ],
    'Steel': [
        { name: 'Cauda de Ferro', power: 100, accuracy: 75, strength: 'normal' },
        { name: 'Canhão de Luz', power: 80, accuracy: 100, strength: 'strong' },
        { name: 'Punho de Aço', power: 70, accuracy: 100, strength: 'normal' }
    ],
    'Dark': [
        { name: 'Mordida Sombria', power: 60, accuracy: 100, strength: 'normal' },
        { name: 'Fúria Noturna', power: 55, accuracy: 95, strength: 'normal' },
        { name: 'Crunch', power: 80, accuracy: 100, strength: 'strong' },
        { name: 'Pulso Sombrio', power: 80, accuracy: 100, strength: 'strong' }
    ],
    'Fairy': [
        { name: 'Beijo Drenagem', power: 50, accuracy: 100, strength: 'normal' },
        { name: 'Brilho Mágico', power: 80, accuracy: 100, strength: 'strong' },
        { name: 'Vento Feérico', power: 40, accuracy: 100, strength: 'normal' }
    ],
    'Unknown': [
        { name: 'Ataque Rápido', power: 30, accuracy: 100, strength: 'normal' },
        { name: 'Explosão', power: 100, accuracy: 100, strength: 'strong' }
    ]
};

module.exports = { GENERIC_ATTACKS };