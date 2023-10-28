import {ReactNode} from "react";

interface ButtonProps {
    children?: ReactNode;
    type: ButtonType;
    onClick: () => void;
}

export enum ButtonType {
    BLUE = "blue",
    ORANGE = "orange",
    GRAY = "gray",
    GRAY_CLICKED = "grayClicked",
    SEAT="seat"
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
            return "bg-orange-400 w-14 h-14 rounded-2xl m-2"
        }
        return "bg-orange-400 text-blue-50 p-3 font-bold text-lg"
    }

    return (
        <button className={"rounded-lg " + buttonStyles()}
                onClick={props.onClick}>
            {props.children}
        </button>
    )
}