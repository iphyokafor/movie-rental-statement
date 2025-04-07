import { rentalRates } from "../src/config";
import { Movie, MovieCode } from "../src/statement.interface";
import { calculateAmount, calculatePoints, formatRental } from "../src/utils";

describe('Utils Tests', () => {
    const mockMovie: Movie = {
        code: MovieCode.REGULAR,
        title: 'Back to Action',
    };

    describe('calculateAmount', () => {
        const rate = rentalRates[MovieCode.REGULAR];
        const { basePrice, baseDays, extraDayCharge } = rate;

        it('calculates amount for base days (no extra)', () => {
            const amount = calculateAmount(mockMovie, baseDays);
            expect(amount).toBe(basePrice);
        });

        it('calculates amount with extra days', () => {
            const extraDays = 2;
            const totalDays = baseDays + extraDays;
            const expectedAmount = basePrice + (extraDays * extraDayCharge);

            const amount = calculateAmount(mockMovie, totalDays);
            expect(amount).toBe(expectedAmount);
        });

        it('throws error for invalid movie code', () => {
            const invalidMovie = { ...mockMovie, code: 'INVALID' as MovieCode };
            expect(() => calculateAmount(invalidMovie, 1)).toThrow('Invalid movie code');
        });
    });


    describe('calculatePoints', () => {
        it('should return 1 point for regular movies', () => {
            const points = calculatePoints(mockMovie, 1);
            expect(points).toBe(1);
        });

        it('should return 2 points for new movies rented more than 2 days', () => {
            const newMovie = { ...mockMovie, code: MovieCode.NEW };
            const points = calculatePoints(newMovie, 3);
            expect(points).toBe(2);
        });

        it('should return 1 point for new movies rented 2 days or less', () => {
            const newMovie = { ...mockMovie, code: MovieCode.NEW };
            const points = calculatePoints(newMovie, 2);
            expect(points).toBe(1);
        });
    });

    describe('formatRental', () => {
        it('should format rental string correctly', () => {
            const formattedString = formatRental(mockMovie, 10);
            expect(formattedString).toBe('\tBack to Action\t10\n');
        });
    });
});