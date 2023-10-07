interface ButtonProps {
    text:string;
    onClick: ()=>void;
}
export function Button(props: ButtonProps) {
    return(
        <button className={"bg-sky-700 text-blue-50 p-2 rounded-lg"} onClick={props.onClick}>{props.text}</button>
    )
}