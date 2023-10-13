import {Film} from "../../models/film/film";
import {Title} from "../common/title/Title";
import {Repertoire} from "../../models/repertoire/repertoire";
import {TimeTile} from "../common/time-tile/TimeTile";

interface RepertoireProps {
    film: Film
    repertoire: Repertoire[]
}

export function Showtimes(props: RepertoireProps) {
    return (
        <div className={"flex flex-col items-stretch justify-evenly text-blue-50"} style={{minHeight: "calc(100vh - 80px)"}}>
            <Title text={props.film.title}></Title>
            <div className={"flex gap-2"}>{props.repertoire.map((el) => {
                return(
                    <TimeTile text={el.time}></TimeTile>
                )
            })}</div>
        </div>
    )
}