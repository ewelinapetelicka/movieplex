interface ChipProps {
    text:string;
}
export function Chip(props: ChipProps) {
    return(
        <span className={"bg-sky-700 text-blue-50 p-2 rounded-lg"}>{props.text}</span>
    )
}