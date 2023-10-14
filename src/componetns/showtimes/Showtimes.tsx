import {Film} from "../../models/film/film";
import {Title} from "../common/title/Title";
import {Repertoire} from "../../models/repertoire/repertoire";
import {TimeTile} from "../common/time-tile/TimeTile";
import {useState} from "react";
import {useNavigate} from "react-router-dom";


interface RepertoireProps {
    film: Film
    repertoire: Repertoire[]
}

export function Showtimes(props: RepertoireProps) {
    const [repertoire2d] = useState(props.repertoire.filter((el) => {
        return el.showingIn === "2D"
    }));
    const [repertoire3d] = useState(props.repertoire.filter((el) => {
        return el.showingIn === "3D"
    }));

    const navigate = useNavigate();

    return (
        <div className={"flex flex-col items-stretch justify-evenly text-blue-50"}
             style={{minHeight: "calc(100vh - 80px)"}}>
            <Title text={props.film.title}></Title>
            <button className={"flex gap-2"} onClick={()=>navigate("/select-tickets")}>{repertoire2d.map((el) => {
                return (
                    <TimeTile text={el.time} tag={"2D"} key={el.time}></TimeTile>
                )
            })}</button>
            <button className={"flex gap-2"} onClick={()=>navigate("/select-tickets")}>{repertoire3d.map((el) => {
                return (
                    <TimeTile text={el.time} tag={"3D"} key={el.time}></TimeTile>
                )
            })}</button>
        </div>
    )
}