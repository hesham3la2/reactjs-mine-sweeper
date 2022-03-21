import { CellData } from "./interfaces";

export const locToString = (x: number, y: number) => `${x}-${y}`;
export const stringToLoc = (id: string) => id.split('-').map((i) => +i);
export const getCellValue = (arr: string[], value: string) => {
  var count = 0;
  arr.forEach((v) => v === value && count++);
  return count;
};
export const loopNeighbours = (
  id: string,
  rows: number,
  cols: number
): string[] => {
  const neighbours: string[] = [];
  const [x, y] = stringToLoc(id);
  //Top
  if (x > 0) {
    neighbours.push(locToString(x - 1, y));
  }

  //Bottom
  if (x < rows - 1) {
    neighbours.push(locToString(x + 1, y));
  }

  //Right
  if (y < cols - 1) {
    neighbours.push(locToString(x, y + 1));
  }

  //Left
  if (y > 0) {
    neighbours.push(locToString(x, y - 1));
  }

  //Top Right
  if (y < cols - 1 && x > 0) {
    neighbours.push(locToString(x - 1, y + 1));
  }

  //Top Left
  if (y > 0 && x > 0) {
    neighbours.push(locToString(x - 1, y - 1));
  }

  //Bottom Right
  if (y < cols - 1 && x < rows - 1) {
    neighbours.push(locToString(x + 1, y + 1));
  }

  //Bottom Left
  if (y > 0 && x < rows - 1) {
    neighbours.push(locToString(x + 1, y - 1));
  }

  return neighbours;
};


