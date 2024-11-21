const pokemonRarity = {
    veryLow: [10, 13, 16, 19, 21, 23, 27, 29, 32, 41, 43, 46, 48, 50, 54, 56, 58, 60, 69, 74],
    low: [1, 2, 3, 11, 14, 17, 20, 22, 24, 25, 30, 33, 35, 36, 37, 39, 42, 44, 45, 52, 53, 55, 61, 63, 66, 70, 72, 77, 81, 84, 86, 90, 92, 96],
    medium: [4, 5, 6, 12, 15, 18, 26, 28, 31, 34, 38, 40, 47, 49, 51, 57, 59, 62, 67, 68, 71, 73, 75, 78, 79, 83, 87, 88, 93, 97, 98, 100, 102, 104, 106, 107, 111],
    high: [7, 8, 9, 45, 64, 65, 76, 80, 85, 89, 91, 94, 99, 101, 103, 105, 108, 109, 110, 112, 113, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 137, 138, 139, 140, 141, 143],
    veryHigh: [144, 145, 146, 147, 148, 149, 150, 151]

  };
  
const rarityPoints = {
veryLow: 1,
low: 2,
medium: 4,
high: 8,
veryHigh: 16
};

const pokemonPoints = Object.entries(pokemonRarity).reduce((acc, [rarity, ids]) => {
ids.forEach(id => {
    acc[id] = rarityPoints[rarity];
});
return acc;
}, {});

export function calculateTotalPoints(pokemonIds) {
return pokemonIds.reduce((total, id) => total + (pokemonPoints[id] || 0), 0);
}

export function getPokemonPoints(id) {

  const normalizedId = Number(id.replace(/^0+/, ''));
  console.log("ID:", normalizedId);
  console.log("Value:", pokemonPoints[normalizedId]);
  return pokemonPoints[normalizedId] || 0;
}





