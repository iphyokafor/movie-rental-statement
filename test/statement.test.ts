import { describe, it, expect } from "@jest/globals";
import { customer, movies } from "../src/test-data";
import { calculateRentalSummary, statement } from "../src/statement";

describe("Statement Tests", () => {
  const testMovies = movies;
  const testCustomer = customer;

  it("should calculate rental summary correctly", () => {
    const summary = calculateRentalSummary(testCustomer.rentals, testMovies);

    expect(summary.rentalDetails).toHaveLength(4);
    expect(summary.totalAmount).toBeGreaterThan(0);
    expect(summary.totalPoints).toBeGreaterThan(0);
  });

  it("should generate correct statement string", () => {
    const result = statement(testCustomer, testMovies);

    expect(result).toContain("Rental Record for martin");
    expect(result).toContain("Amount owed is");
    expect(result).toContain("frequent renter points");
    expect(typeof result).toBe("string");
  });

  it("should handle empty rentals list", () => {
    const emptyCustomer = {
      name: "Empty Customer",
      rentals: [],
    };

    const result = statement(emptyCustomer, testMovies);
    expect(result).toContain("Rental Record for Empty Customer");
    expect(result).toContain("Amount owed is 0");
    expect(result).toContain("You earned 0 frequent renter points");
  });
});
