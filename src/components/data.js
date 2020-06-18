const { CrosswordDefinition } = crosswordDefinition;

let definition = new CrosswordDefinition({
  height: 8, //height of the board, 8 cells
  width: 8, //width of the board, 5 cells
  acrossClues: [
    {
      number: 1, //number to identify the world, must be unique
      x: 4, //The x position where the word starts, starting from 1
      y: 1, //The y position where the word starts, starting from 1
      answer: "DIEGO", //the word itself
      clue: "1. First name of the Spanish artist known for 'Las Meninas'", //the clue
      hints: [1],
    },
    {
      number: 2, //number to identify the world, must be unique
      x: 1, //The x position where the word starts, starting from 1
      y: 4, //The y position where the word starts, starting from 1
      answer: "POPART", //the word itself
      clue: "2. Art movement/style championed by Andy Warhol.", //the clue
      hints: [2, 6],
    },
    {
      number: 3,
      x: 1,
      y: 7,
      answer: "VERMEER",
      clue:
        "3. 17th century Dutch painter,  known for his luminous depiction of everyday life and ordinary subjects.",
      hints: [2, 6],
    },
  ],
  downClues: [
    {
      number: 1,
      x: 4,
      y: 1,
      answer: "DADA",
      clue:
        "1. Characterized by artistic anarchy and humour, Man Ray and Marcel Duchamp were associated with this movement.",
      hints: [1],
    },
    {
      number: 4,
      x: 2,
      y: 1,
      answer: "BAROQUE",
      clue:
        "4. Art and architectural style characterized by grandeur and exquisite detailing, originated in 17th century Europe.",
      hints: [4, 7],
    },
    {
      number: 5,
      x: 6,
      y: 4,
      answer: "TATE",
      clue:
        "5. Museums located in a number of places in Britain including Liverpool and London.",
      hints: [1, 4],
    },
    {
      number: 6,
      x: 8,
      y: 1,
      answer: "OPART",
      clue:
        "6. Victor Vasarely and Bridget Riley were associated with this art style which uses optical illusions and abstract patterns.",
      hints: [1],
    },
  ],
});
$(".crossword").crossword({
  definition: definition,
});
