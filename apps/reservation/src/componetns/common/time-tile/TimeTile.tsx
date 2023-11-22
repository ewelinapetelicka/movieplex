interface TimeTileProps {
    text: string;
    tag: string;
}

export function TimeTile(props: TimeTileProps) {
    return (
        <span>
            {props.text}
            <span className={"text-base pl-2"}>{props.tag}</span>
        </span>
    )
}