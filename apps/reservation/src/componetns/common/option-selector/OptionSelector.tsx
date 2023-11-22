interface OptionSelectorProps{
    options: string[];
}

export function OptionSelector(props: OptionSelectorProps){
    return(
        <div>
            {props.options.map((el)=>{
                return(
                    <p>{el}</p>
                )
            })}
        </div>
    )
}