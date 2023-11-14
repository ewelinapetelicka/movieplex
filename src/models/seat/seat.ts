import {SeatType} from "./seat-type/seat-type";

export interface Seat{
    row: number;
    col: number;
    type: SeatType;
}