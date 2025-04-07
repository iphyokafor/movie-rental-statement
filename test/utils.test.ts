import { rentalRates } from "../src/config";
import { Movie, MovieCode } from "../src/statement.interface";
import { calculateAmount, calculatePoints, formatRental } from "../src/utils";

describe('Utils Tests', () => {
    const mockMovie: Movie = {
        code: MovieCode.REGULAR,
        title: 'Test Movie'
    };

    describe('calculateAmount', () => {
        it('should calculate correct amount for base days', () => {
            const amount = calculateAmount(mockMovie, rentalRates[MovieCode.REGULAR].baseDays);
            expect(amount).toBe(rentalRates[MovieCode.REGULAR].basePrice);
        });

        it('should calculate correct amount with extra days', () => {
            const extraDays = 2;
            const totalDays = rentalRates[MovieCode.REGULAR].baseDays + extraDays;
            const amount = calculateAmount(mockMovie, totalDays);
            const expected = rentalRates[MovieCode.REGULAR].basePrice +
                (extraDays * rentalRates[MovieCode.REGULAR].extraDayCharge);
            expect(amount).toBe(expected);
        });

        it('should throw error for invalid movie code', () => {
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
            expect(formattedString).toBe('\tTest Movie\t10\n');
        });
    });
});