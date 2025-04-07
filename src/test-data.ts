import { Customer, Movies, MovieCode } from "./statement.interface";

export const customer: Customer = {
  name: "martin",
  rentals: [
    { movieID: "F001", days: 3 },
    { movieID: "F002", days: 1 },
    { movieID: "F003", days: 1 },
    { movieID: "F004", days: 1 },
  ],
};

export const movies: Movies = {
  F001: { title: "Ran", code: MovieCode.REGULAR },
  F002: { title: "Trois Couleurs: Bleu", code: MovieCode.REGULAR },
  F003: { title: "Sunes Sommar", code: MovieCode.CHILDREN },
  F004: { title: "Yara", code: MovieCode.NEW },
};
