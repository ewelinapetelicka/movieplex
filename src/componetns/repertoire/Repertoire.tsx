import {Film} from "../../models/film/film";

interface RepertoireProps{
    film : Film
}

export function Repertoire(props : RepertoireProps) {
    return (
        <div className={"flex items-stretch justify-evenly"} style={{minHeight: "calc(100vh - 80px)"}}>
            test
            <p>{props.film.title}</p>
        </div>
    )
}