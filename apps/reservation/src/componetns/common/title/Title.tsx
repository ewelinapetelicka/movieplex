interface TitleProps {
    text: string;
}

export function Title(props: TitleProps) {
    return (
        <h2 className={"text-5xl font-bold text-blue-50"}>{props.text}</h2>
    )
}