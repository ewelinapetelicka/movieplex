import {Film} from "../../models/film/film";
import {Title} from "../common/title/Title";
import {Repertoire} from "../../models/repertoire/repertoire";
import {TimeTile} from "../common/time-tile/TimeTile";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {Button, ButtonType} from "../common/button/Button";
import {DayPicker} from "../day-picker/DayPicker";


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
    const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    return (
        <div className={" h-full w-full flex flex-col items-stretch justify-evenly text-blue-50"}
             style={{minHeight: "calc(100vh - 80px)"}}>
            <Title text={props.film.title}></Title>
            <div className={"flex"}>
                <img className={"w-[25%]"} src={'/posters/' + props.film.poster}/>
                <div className={"flex flex-col"}>
                    <div className={"flex gap-1"}>
                        <span>{days[new Date().getDay()]}</span>
                        <span>{new Date().getDate()}</span>
                        <span>{month[new Date().getMonth()]}</span>
                        <span>{new Date().getFullYear()}</span>
                    </div>
                    <DayPicker ></DayPicker>
                    <div className={"flex gap-2"}>
                        {repertoire2d.map((el) => {
                            return (
                                <Button type={ButtonType.ORANGE} onClick={() => navigate("/select-tickets")}>
                                    <TimeTile text={el.time} tag={"2D"} key={el.time}></TimeTile>
                                </Button>
                            )
                        })}
                    </div>
                    <div className={"flex gap-2"}>
                        {repertoire3d.map((el) => {
                            return (
                                <Button type={ButtonType.ORANGE} onClick={() => navigate("/select-tickets")}>
                                    <TimeTile text={el.time} tag={"3D"} key={el.time}></TimeTile>
                                </Button>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}