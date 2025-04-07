import { MovieCode, Movie } from "./statement.interface";
import { rentalRates } from "./config";

export const calculateAmount = (movie: Movie, days: number): number => {
  const rate = rentalRates[movie.code];
  if (!rate) {
    throw new Error(`Invalid movie code: ${movie.code}`);
  }

  const { basePrice, baseDays, extraDayCharge } = rate;
  return basePrice + Math.max(0, days - baseDays) * extraDayCharge;
};

export const calculatePoints = (movie: Movie, days: number): number => {
  return 1 + (movie.code === MovieCode.NEW && days > 2 ? 1 : 0);
};

export const formatRental = (movie: Movie, amount: number): string => {
  return `\t${movie.title}\t${amount}\n`;
};
