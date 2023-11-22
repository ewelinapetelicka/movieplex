import {ReactNode} from "react";

interface  CardProps{
    children: ReactNode;
}
export function Card(props: CardProps){
    return(
        <>
            <div
                className={"bg-gray-800 w-full rounded-xl pt-2 pr-3 pb-2 pl-3"}>
                {props.children}
            </div>
        </>
    )
}