interface DateProps{
    date: string;
}

export function ReleaseDate(props: DateProps) {
    let day = (props.date.split("-")).reverse().map((el)=>{return parseInt(el)}).at(-1);
    let month = ((props.date.split("-")).reverse().map((el)=>{return parseInt(el)}).at(-2)!-1);
    let year = (props.date.split("-")).reverse().map((el)=>{return parseInt(el)}).at(0)!;
    return (
        <div className={"flex gap-1"}>
            <span>{day}</span>
            <span>{new Date(year, month, day).toLocaleString("en", {month: "long"})}</span>
            <span>{year}</span>
        </div>
    )
}
