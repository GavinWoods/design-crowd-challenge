import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import { Weekday } from "../../const";

dayjs.extend(isBetween);

export class BusinessDayCounter {
  /**
   * Calculates the number of weekdays between two given dates.
   *
   * @param {Date} firstDate - The first date.
   * @param {Date} secondDate - The second date.
   * @return {number} The number of weekdays between the two dates.
   */
  WeekdaysBetweenTwoDates(firstDate: Date, secondDate: Date): number {
    const start = dayjs(firstDate).add(1, "day");
    const end = dayjs(secondDate);
    const daysInBetween = end.diff(start, "day");

    if (daysInBetween <= 0) return 0;

    let weekdaysCount = Math.floor(daysInBetween / 7) * 5;
    const remainingDays = daysInBetween % 7;

    for (let i = 0; i < remainingDays; i++) {
      const currentDate = start.add(i, "day");
      if (
        currentDate.day() >= Weekday.Monday &&
        currentDate.day() <= Weekday.Friday
      ) {
        weekdaysCount++;
      }
    }

    return weekdaysCount;
  }

  BusinessDaysBetweenTwoDates(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    firstDate: Date,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    secondDate: Date,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    publicHolidays: Date[],
  ): number {
    return 0;
  }
}
