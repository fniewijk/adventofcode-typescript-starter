import { Day } from "../day";

const matrixOperations = [
  [1, 0],
  [0, 1],
  [-1, 0],
  [0, -1],
  [1, 1],
  [-1, -1],
  [1, -1],
  [-1, 1],
];

const wordArray = "XMAS".split("");

const xmasMatrix = [
  ["M", "?", "S"],
  ["?", "A", "?"],
  ["M", "?", "S"],
];

const rotateMatrix90 = (matrix: string[][]): string[][] => {
  const newMatrix: string[][] = [];
  for (let i = 0; i < matrix[0].length; i++) {
    newMatrix.push([]);
    for (let j = matrix.length - 1; j >= 0; j--) {
      newMatrix[i].push(matrix[j][i]);
    }
  }
  return newMatrix;
};

const getStringFromMatrix = (
  matrix: string[][],
  x: number,
  y: number
): string => {
  if (x < 0 || y < 0 || x >= matrix.length || y >= matrix[0].length) {
    return "";
  }
  return matrix[x][y];
};

const matchMatrix = (
  matrix: string[][],
  subMatrix: string[][],
  x: number,
  y: number
): boolean => {
  for (let i = 0; i < subMatrix.length; i++) {
    for (let j = 0; j < subMatrix[i].length; j++) {
      if (
        !(subMatrix[i][j] === "?") &&
        getStringFromMatrix(matrix, x + i, y + j) !== subMatrix[i][j]
      ) {
        return false;
      }
    }
  }
  return true;
};

class Day4 extends Day {
  constructor() {
    super(4);
  }

  solveForPartOne(input: string): string {
    const matrix: string[][] = input.split("\n").map((line) => line.split(""));

    let output = 0;

    matrix.forEach((row, rowIndex) => {
      row.forEach((cell, cellIndex) => {
        if (cell === wordArray[0]) {
          matrixOperations.forEach(([x, y]) => {
            const foundCount = wordArray.filter(
              (letter, index) =>
                getStringFromMatrix(
                  matrix,
                  rowIndex + x * index,
                  cellIndex + y * index
                ) === letter
            );
            if (foundCount.length === wordArray.length) {
              output++;
            }
          });
        }
      });
    });

    return output.toString();
  }

  solveForPartTwo(input: string): string {
    const matrix: string[][] = input.split("\n").map((line) => line.split(""));

    let output = 0;

    const compareMatrices = [
      xmasMatrix,
      rotateMatrix90(xmasMatrix),
      rotateMatrix90(rotateMatrix90(xmasMatrix)),
      rotateMatrix90(rotateMatrix90(rotateMatrix90(xmasMatrix))),
    ];

    console.log(compareMatrices);

    matrix.forEach((row, rowIndex) => {
      row.forEach((cell, cellIndex) => {
        compareMatrices.forEach((subMatrix) => {
          if (matchMatrix(matrix, subMatrix, rowIndex, cellIndex)) {
            output++;
          }
        });
      });
    });

    return output.toString();
  }
}

export default new Day4();
