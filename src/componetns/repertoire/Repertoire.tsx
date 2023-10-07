import {Film} from "../../models/film/film";
import {Title} from "../common/title/Title";

interface RepertoireProps {
    film: Film
}

export function Repertoire(props: RepertoireProps) {
    return (
        <div className={"flex items-stretch justify-evenly"} style={{minHeight: "calc(100vh - 80px)"}}>
            test
            <Title text={props.film.title}></Title>
        </div>
    )
}