import { Weekday } from "../../const";

type BaseHoliday = {
  year: number;
  month: number; // 1 - 12
};

export type FixedHoliday = BaseHoliday & {
  type: "fixed";
  day: number; // 1 - 31
};

export type FloatingHoliday = BaseHoliday & {
  type: "floating";
  day: number; // 1 - 31
};

export type NthWeekHoliday = BaseHoliday & {
  type: "nthWeekday";
  weekday: Weekday;
  nthWeek: number;
};

export type Holiday = FixedHoliday | FloatingHoliday | NthWeekHoliday;
