export type UnixTimeStamp = number;

export type TimeString = string;
export type TimeNumeral = number;

export type Time = TimeString | TimeNumeral;

export type WorkingDate<T = Date | UnixTimeStamp | string> = T;

export type Seconds = number;
export type Milliseconds = number;
