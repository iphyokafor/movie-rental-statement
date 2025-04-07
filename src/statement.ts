import {
  Customer,
  Movies,
  RentalAccumulator,
  Rental,
} from "./statement.interface";
import { customer, movies } from "./test-data";
import { calculateAmount, calculatePoints, formatRental } from "./utils";

export const calculateRentalSummary = (
  rentals: Rental[],
  movies: Movies
): RentalAccumulator => {
  return rentals.reduce(
    (acc: RentalAccumulator, rental) => {
      const { movieID, days } = rental;
      const movie = movies[movieID];
      const amount = calculateAmount(movie, days);
      const points = calculatePoints(movie, days);

      acc.rentalDetails.push({
        amount,
        points,
        formatted: formatRental(movie, amount),
      });

      acc.totalAmount += amount;
      acc.totalPoints += points;

      return acc;
    },
    { rentalDetails: [], totalAmount: 0, totalPoints: 0 }
  );
};

export const statement = (customer: Customer, movies: Movies): string => {
  const { name, rentals } = customer;

  const { rentalDetails, totalAmount, totalPoints } = calculateRentalSummary(
    rentals,
    movies
  );

  const rentalLines = rentalDetails.map((detail) => detail.formatted).join("");

  return [
    `Rental Record for ${name}\n`,
    rentalLines,
    `Amount owed is ${totalAmount}\n`,
    `You earned ${totalPoints} frequent renter points\n`,
  ].join("");
};

console.log(statement(customer, movies));
