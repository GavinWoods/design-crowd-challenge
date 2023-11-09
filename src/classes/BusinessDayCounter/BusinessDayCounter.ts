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

  /**
   * Calculates the number of business days between two given dates, excluding public holidays.
   *
   * @param {Date} firstDate - The first date.
   * @param {Date} secondDate - The second date.
   * @param {Date[]} publicHolidays - An array of public holidays.
   * @returns {number} The number of business days between the two dates.
   */
  BusinessDaysBetweenTwoDates(
    firstDate: Date,
    secondDate: Date,
    publicHolidays: Date[],
  ): number {
    const start = dayjs(firstDate);
    const end = dayjs(secondDate);

    if (end.diff(start, "day") <= 0) return 0;

    const weekdaysCount = this.WeekdaysBetweenTwoDates(
      start.toDate(),
      end.toDate(),
    );

    const holidaysOnWeekDays = publicHolidays.reduce((count, holiday) => {
      const holidayDate = dayjs(holiday);

      if (
        this.IsWeekday(holidayDate) &&
        holidayDate.isBetween(start, end, "day")
      ) {
        count++;
      }

      return count;
    }, 0);

    return weekdaysCount - holidaysOnWeekDays;
  }

  /**
   * Checks if a given date is a weekday.
   *
   * @param {dayjs.Dayjs} date - The date to check.
   * @return {boolean} Returns true if the given date is a weekday, otherwise false.
   */
  protected IsWeekday(date: dayjs.Dayjs): boolean {
    return date.day() >= Weekday.Monday && date.day() <= Weekday.Friday;
  }
}
