import { ExtendedBusinessDayCounter } from "./ExtendedBusinessDayCounter";
import { Holiday } from "./ExtendedBusinessDayCounter.types";

describe("BusinessDayCounter", () => {
  let businessDayCounter: ExtendedBusinessDayCounter;
  let holidays: Holiday[];

  beforeEach(() => {
    businessDayCounter = new ExtendedBusinessDayCounter();
    holidays = [
      { type: "fixed", year: 2013, month: 4, day: 25 },
      { type: "fixed", year: 2013, month: 12, day: 25 },
      { type: "fixed", year: 2013, month: 12, day: 26 },
      { type: "floating", year: 2014, month: 1, day: 1 },
      { type: "floating", year: 2013, month: 10, day: 6 },
      { type: "floating", year: 2013, month: 10, day: 12 },
      { type: "floating", year: 2013, month: 10, day: 13 },
      { type: "nthWeekday", year: 2013, month: 6, weekday: 1, nthWeek: 2 },
    ];
  });

  describe("ExtendedBusinessDaysBetweenTwoDates", () => {
    it("Calculate business days between 2013-10-07 - 2013-10-09", () => {
      const startDate = new Date("2013-10-07");
      const endDate = new Date("2013-10-09");
      const weekdaysCount =
        businessDayCounter.ExtendedBusinessDaysBetweenTwoDates(
          startDate,
          endDate,
          holidays,
        );
      expect(weekdaysCount).toBe(1);
    });

    it("Calculate business days between 2013-12-24 - 2013-12-27", () => {
      const startDate = new Date("2013-12-24");
      const endDate = new Date("2013-12-27");
      const weekdaysCount =
        businessDayCounter.ExtendedBusinessDaysBetweenTwoDates(
          startDate,
          endDate,
          holidays,
        );
      expect(weekdaysCount).toBe(0);
    });

    it("Calculate business days between 2013-10-07 - 2014-01-01", () => {
      const startDate = new Date("2013-10-06");
      const endDate = new Date("2014-01-01");
      const weekdaysCount =
        businessDayCounter.ExtendedBusinessDaysBetweenTwoDates(
          startDate,
          endDate,
          holidays,
        );
      expect(weekdaysCount).toBe(58);
    });

    it("Calculate business days between 2013-10-07 - 2013-10-05", () => {
      const startDate = new Date("2013-10-07");
      const endDate = new Date("2013-10-05");
      const weekdaysCount =
        businessDayCounter.ExtendedBusinessDaysBetweenTwoDates(
          startDate,
          endDate,
          holidays,
        );
      expect(weekdaysCount).toBe(0);
    });
  });
});
