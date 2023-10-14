interface TimeTileProps {
    text: string;
    tag: string;
}

export function TimeTile(props: TimeTileProps) {
    return (
        <span
            className={"bg-orange-400 text-blue-50 p-3 font-bold text-lg rounded-lg"}>
            {props.text}
            <span className={"text-base pl-2"}>{props.tag}</span>
        </span>
    )
}