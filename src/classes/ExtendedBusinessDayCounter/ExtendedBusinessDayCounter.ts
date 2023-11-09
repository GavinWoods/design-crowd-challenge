import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import { BusinessDayCounter } from "../BusinessDayCounter";
import { Weekday } from "../../const";
import {
  FixedHoliday,
  FloatingHoliday,
  Holiday,
  NthWeekHoliday,
} from "./ExtendedBusinessDayCounter.types";

dayjs.extend(isBetween);

export class ExtendedBusinessDayCounter extends BusinessDayCounter {
  /**
   * Calculates the number of business days between two dates, excluding public holidays.
   *
   * @param {Date} firstDate - The first date.
   * @param {Date} secondDate - The second date.
   * @param {Holiday[]} publicHolidays - An array of public holidays.
   * @return {number} The number of extended business days between the two dates.
   */
  ExtendedBusinessDaysBetweenTwoDates(
    firstDate: Date,
    secondDate: Date,
    publicHolidays: Holiday[],
  ): number {
    const start = dayjs(firstDate);
    const end = dayjs(secondDate);

    if (end.diff(start, "day") <= 0) return 0;

    const weekdaysCount = this.WeekdaysBetweenTwoDates(
      start.toDate(),
      end.toDate(),
    );

    const validHolidays: string[] = [];

    const holidaysOnWeekDays = publicHolidays
      .map((holiday) => {
        switch (holiday.type) {
          case "fixed":
            return this.GetValidFixedHolidayDate(holiday);
          case "floating":
            return this.GetValidFloatingHolidayDate(holiday);
          case "nthWeekday":
            return this.GetValidNthWeekHolidayDate(holiday);
        }
      })
      .reduce((count, holiday) => {
        if (
          this.IsWeekday(holiday) &&
          holiday.isBetween(start, end, "day") &&
          !validHolidays.includes(holiday.format())
        ) {
          count++;
          validHolidays.push(holiday.format());
        }

        return count;
      }, 0);

    return weekdaysCount - holidaysOnWeekDays;
  }

  /**
   * Retrieves the valid fixed holiday date.
   *
   * @param {FixedHoliday} holiday - The fixed holiday object.
   * @return {dayjs.Dayjs} The valid fixed holiday date.
   */
  private GetValidFixedHolidayDate(holiday: FixedHoliday): dayjs.Dayjs {
    const holidayDate = dayjs(
      `${holiday.year}-${holiday.month}-${holiday.day}`,
    );
    return holidayDate;
  }

  /**
   * Get the valid date for a floating holiday.
   *
   * @param {FloatingHoliday} holiday - The floating holiday object.
   * @return {Dayjs} The valid date for the floating holiday.
   */
  private GetValidFloatingHolidayDate(holiday: FloatingHoliday): dayjs.Dayjs {
    let holidayDate = dayjs(`${holiday.year}-${holiday.month}-${holiday.day}`);

    if (holidayDate.day() === Weekday.Saturday) {
      holidayDate = holidayDate.add(2, "day");
    } else if (holidayDate.day() === Weekday.Sunday) {
      holidayDate = holidayDate.add(1, "day");
    }

    return holidayDate;
  }

  /**
   * Retrieves the valid date for the Nth week holiday.
   *
   * @param {NthWeekHoliday} holiday - The Nth week holiday object.
   * @return {dayjs.Dayjs} - The valid date for the Nth week holiday.
   */
  private GetValidNthWeekHolidayDate(holiday: NthWeekHoliday): dayjs.Dayjs {
    const firstDayOfMonth = dayjs(`${holiday.year}-${holiday.month}-01`);
    const nthWeekdayInMonth = firstDayOfMonth
      .day(holiday.weekday)
      .add((holiday.nthWeek - 1) * 7, "day");

    return nthWeekdayInMonth;
  }
}
