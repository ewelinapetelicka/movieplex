import {ReactNode} from "react";

interface ButtonProps {
    children: ReactNode;
    type: ButtonType;
    onClick: () => void;
}

export enum ButtonType {
    BLUE = "blue",
    ORANGE = "orange"
}

export function Button(props: ButtonProps) {

    function buttonStyles():string {
        if (props.type===ButtonType.BLUE){
            return "bg-sky-700 text-blue-50 p-2"
        }
        return 'bg-orange-400 text-blue-50 p-3 font-bold text-lg'
    }

    return (
            <button className={"rounded-lg "+ buttonStyles()}
                    onClick={props.onClick}>
                {props.children}
            </button>
        )
}