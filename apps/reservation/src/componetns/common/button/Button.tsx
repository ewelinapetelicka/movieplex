import {ReactNode} from "react";

interface ButtonProps {
    children?: ReactNode;
    type: ButtonType;
    onClick?: () => void;
}

export enum ButtonType {
    BLUE = "blue",
    ORANGE = "orange",
    GRAY = "gray",
    GRAY_CLICKED = "grayClicked",
    SEAT = "seat",
    SEAT_TAKEN = "taken",
    SEAT_CHOSEN = "chosen",
    DELETE = "delete",
    DISABLED = "disabled",
    PAYMENT = "payment"

}

export function Button(props: ButtonProps) {

    function buttonStyles(): string {
        if (props.type === ButtonType.BLUE) {
            return "bg-sky-700 text-blue-50 p-2"
        }
        if (props.type === ButtonType.GRAY) {
            return "bg-sky-700 text-blue-50 p-2 border-2 border-white font-bold text-lg"
        }
        if (props.type === ButtonType.GRAY_CLICKED) {
            return "bg-orange-400 text-blue-50 p-2 border-2 border-white font-bold text-lg"
        }
        if (props.type === ButtonType.SEAT) {
            return "bg-orange-400 w-9 h-9 rounded-2xl m-2"
        }
        if (props.type === ButtonType.SEAT_TAKEN) {
            return "bg-sky-700 w-9 h-9 rounded-2xl m-2"
        }
        if (props.type === ButtonType.SEAT_CHOSEN) {
            return "bg-gray-700 w-9 h-9 rounded-2xl m-2"
        }
        if (props.type === ButtonType.DELETE) {
            return "bg-gray-800 w-9 h-9 rounded-2xl m-2"
        }
        if (props.type === ButtonType.DISABLED) {
            return "w-9 h-9 rounded-2xl m-2 opacity-25 font-bold"
        }
        if (props.type === ButtonType.PAYMENT) {
            return "w-40 h-12 bg-sky-700 text-blue-50 p-1 border-2 border-white font-bold text-lg"
        }
        return "bg-orange-400 text-blue-50 p-3 mb-2 font-bold text-lg"
    }

    return (
        <button className={"rounded-lg " + buttonStyles()}
                onClick={props.onClick}>
            {props.children}
        </button>
    )
}