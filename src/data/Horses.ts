import type { Horse } from "@/store/types";

const colors: string[] = [
  "Red", "Blue", "Green", "Yellow", "Purple", "Orange", "Pink", "Brown", "Black", "White",
  "Gray", "Cyan", "Magenta", "Lime", "Teal", "Indigo", "Violet", "Gold", "Silver", "Maroon"
];

const horseNames: string[] = [
  "Ada Lovelace", "Carl Sagan", "Grace Hopper", "Alan Turing", "Nikola Tesla",
  "Marie Curie", "Richard Feynman", "Isaac Newton", "Galileo Galilei", "Johannes Kepler",
  "Charles Darwin", "Katherine Johnson", "Rosalind Franklin", "Stephen Hawking", "Elon Musk",
  "Leonardo da Vinci", "Benjamin Franklin", "Emmy Noether", "Niels Bohr", "Hedy Lamarr"
];

const getRandomCondition = (): number => Math.floor(Math.random() * 100) + 1;

export const horses: Horse[] = horseNames.map((name, index) => ({
  name,
  condition: getRandomCondition(),
  color: colors[index],
  position: 1,
  finishPosition: 0,
  speed: 0,
  left: 0
}));
