import {addMinutesToStringTime, createDateFromTime} from "./time.utils";

describe('TimeUtils', () => {
    it('should add minutes to time correctly ', () => {
        expect(addMinutesToStringTime("10:10", 96)).toBe("11:46");
        expect(addMinutesToStringTime("12:00", 124)).toBe("14:04");
        expect(addMinutesToStringTime("09:30", 12)).toBe("09:42");
        expect(addMinutesToStringTime("16:00", 1121)).toBe("10:41");
        expect(addMinutesToStringTime("16:00", 0)).toBe("16:00");
        expect(addMinutesToStringTime("23:59", 1)).toBe("00:00");
    });
    it("should create date from time correctly", () => {
        expect(createDateFromTime("12:10").getHours()).toBe(12);
        expect(createDateFromTime("12:10").getMinutes()).toBe(10);
    });
});

