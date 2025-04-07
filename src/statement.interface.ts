export interface Rental {
  movieID: string;
  days: number;
}

export interface Movie {
  title: string;
  code: MovieCode;
}

export interface Customer {
  name: string;
  rentals: Rental[];
}

export interface RentalDetail {
  amount: number;
  points: number;
  formatted: string;
}

export interface PriceRule {
  basePrice: number;
  baseDays: number;
  extraDayCharge: number;
}

export interface RentalAccumulator {
  rentalDetails: RentalDetail[];
  totalAmount: number;
  totalPoints: number;
}

export type RentalConfig = {
  [key in MovieCode]: PriceRule;
};

export type Movies = {
  [movieID: string]: Movie;
};

export enum MovieCode {
  REGULAR = "regular",
  NEW = "new",
  CHILDREN = "childrens",
}
