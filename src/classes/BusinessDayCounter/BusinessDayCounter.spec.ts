import { BusinessDayCounter } from "./BusinessDayCounter";

describe("BusinessDayCounter", () => {
  let businessDayCounter: BusinessDayCounter;
  let holidays: Date[];

  beforeEach(() => {
    businessDayCounter = new BusinessDayCounter();
    holidays = [
      new Date("2013-12-25"),
      new Date("2013-12-26"),
      new Date("2014-01-01"),
    ];
  });

  describe("WeekdaysBetweenTwoDates", () => {
    it("Calculate weekdays between 2013-10-07 - 2013-10-09", () => {
      const startDate = new Date("2013-10-07");
      const endDate = new Date("2013-10-09");
      const weekdaysCount = businessDayCounter.WeekdaysBetweenTwoDates(
        startDate,
        endDate,
      );
      expect(weekdaysCount).toBe(1);
    });

    it("Calculate weekdays between 2013-10-05 - 2013-10-14", () => {
      const startDate = new Date("2013-10-05");
      const endDate = new Date("2013-10-14");
      const weekdaysCount = businessDayCounter.WeekdaysBetweenTwoDates(
        startDate,
        endDate,
      );
      expect(weekdaysCount).toBe(5);
    });

    it("Calculate weekdays between 2013-10-07 - 2014-01-01", () => {
      const startDate = new Date("2013-10-07");
      const endDate = new Date("2014-01-01");
      const weekdaysCount = businessDayCounter.WeekdaysBetweenTwoDates(
        startDate,
        endDate,
      );
      expect(weekdaysCount).toBe(61);
    });

    it("Calculate weekdays between 2013-10-07 - 2013-10-05", () => {
      const startDate = new Date("2013-10-07");
      const endDate = new Date("2013-10-05");
      const weekdaysCount = businessDayCounter.WeekdaysBetweenTwoDates(
        startDate,
        endDate,
      );
      expect(weekdaysCount).toBe(0);
    });
  });

  describe("BusinessDaysBetweenTwoDates", () => {
    it("Calculate business days between 2013-10-07 - 2013-10-09", () => {
      const startDate = new Date("2013-10-07");
      const endDate = new Date("2013-10-09");
      const weekdaysCount = businessDayCounter.BusinessDaysBetweenTwoDates(
        startDate,
        endDate,
        holidays,
      );
      expect(weekdaysCount).toBe(1);
    });

    it("Calculate business days between 2013-12-24 - 2013-12-27", () => {
      const startDate = new Date("2013-12-24");
      const endDate = new Date("2013-12-27");
      const weekdaysCount = businessDayCounter.BusinessDaysBetweenTwoDates(
        startDate,
        endDate,
        holidays,
      );
      expect(weekdaysCount).toBe(0);
    });

    it("Calculate business days between 2013-10-07 - 2014-01-01", () => {
      const startDate = new Date("2013-10-07");
      const endDate = new Date("2014-01-01");
      const weekdaysCount = businessDayCounter.BusinessDaysBetweenTwoDates(
        startDate,
        endDate,
        holidays,
      );
      expect(weekdaysCount).toBe(59);
    });

    it("Calculate business days between 2013-10-07 - 2013-10-05", () => {
      const startDate = new Date("2013-10-07");
      const endDate = new Date("2013-10-05");
      const weekdaysCount = businessDayCounter.BusinessDaysBetweenTwoDates(
        startDate,
        endDate,
        holidays,
      );
      expect(weekdaysCount).toBe(0);
    });
  });
});
