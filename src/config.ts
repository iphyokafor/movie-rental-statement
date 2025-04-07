import { MovieCode, RentalConfig } from "./statement.interface";

export const rentalRates: RentalConfig = {
  [MovieCode.REGULAR]: {
    basePrice: 2,
    baseDays: 2,
    extraDayCharge: 1.5,
  },
  [MovieCode.NEW]: {
    basePrice: 0,
    baseDays: 0,
    extraDayCharge: 3,
  },
  [MovieCode.CHILDREN]: {
    basePrice: 1.5,
    baseDays: 3,
    extraDayCharge: 1.5,
  },
};
