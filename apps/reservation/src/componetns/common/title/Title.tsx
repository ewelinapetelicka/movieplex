interface TitleProps {
    text: string;
}

export function Title(props: TitleProps) {
    return (
        <h2 className={"text-4xl font-bold pb-6 text-blue-50"}>{props.text}</h2>
    )
}