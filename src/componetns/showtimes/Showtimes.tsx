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
        <div className={" h-full w-full flex flex-col items-stretch justify-evenly text-blue-50 pl-8"}
             style={{minHeight: "calc(100vh - 80px)"}}>
            <div className={"flex"}>
                <img className={"w-[25%] pr-2 pl-2"} src={'/posters/' + props.film.poster}/>
                <div className={"flex flex-col pl-8 gap-4"}>
                    <Title text={props.film.title}></Title>
                    <div className={"flex gap-1 "}>
                        <span>{days[new Date().getDay()]}</span>
                        <span>{new Date().getDate()}</span>
                        <span>{month[new Date().getMonth()]}</span>
                        <span>{new Date().getFullYear()}</span>
                    </div>
                    <DayPicker key={props.film.id}></DayPicker>
                    <div className={"pt-20 "}>
                        <p className={"text-lg font-bold"}>2D :  </p>
                        <div className={"flex gap-2 pb-8 items-center"}>
                            {repertoire2d.map((el) => {
                                return (
                                    <Button type={ButtonType.ORANGE} onClick={() => navigate("/select-tickets")}>
                                        <TimeTile text={el.time} tag={"2D"} key={el.time}></TimeTile>
                                    </Button>
                                )
                            })}
                        </div>
                        <p className={"text-lg font-bold"}>3D :  </p>
                        <div className={"flex gap-2 items-center"}>
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
        </div>
    )
}