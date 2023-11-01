import {useEffect, useState} from "react";
import {Repertoire} from "../../models/repertoire/repertoire";
import {useNavigate} from "react-router-dom";
import {useParams} from "react-router";
import {Loader} from "../../componetns/common/loader/Loader";
import {ErrorBoard} from "../error/ErrorBoard";
import {Film} from "../../models/film/film";
import {Hall} from "../../models/hall/hall";
import {useMonths} from "../../hooks/use-months/use-months";
import {Title} from "../../componetns/common/title/Title";
import {Recap} from "../../componetns/recap/Recap";
import {SeatPicker} from "../../componetns/seat-picker/SeatPicker";
import {Seat} from "../../models/seat/seat";

export function SelectTickets() {
    const params = useParams();
    const [repertoire, setRepertoire] = useState<Repertoire>();
    const [film, setFilm] = useState<Film>();
    const [hall, setHall] = useState<Hall>();
    const [isError, setIsError] = useState(false);
    const navigate = useNavigate();
    const months = useMonths();
    const [seatPicked, setSeatPicked] = useState<Seat[]>([]);

    useEffect(() => {
        fetch('http://localhost:8000/repertoire/' + params.id)
            .then(response => response.json())
            .then((data: Repertoire) => {
                if (!data) {
                    navigate("/error")
                }
                setRepertoire(data)
            })
            .catch(error => setIsError(true))
    }, []);

    useEffect(() => {
        if (!repertoire) {
            return;
        }
        fetch('http://localhost:8000/films/' + repertoire.filmId)
            .then(response => response.json())
            .then((data: Film) => {
                if (!data) {
                    navigate("/error")
                }
                setFilm(data)
            })
            .catch(error => setIsError(true))
    }, [repertoire]);

    useEffect(() => {
        if (!repertoire) {
            return;
        }
        fetch('http://localhost:8000/halls/' + repertoire.hallId)
            .then(response => response.json())
            .then((data: Hall) => {
                if (!data) {
                    navigate("/error")
                }
                setHall(data)
            })
            .catch(error => setIsError(true))
    }, [repertoire]);

    if (!repertoire || !film || !hall) {
        return <Loader></Loader>
    }

    if (isError) {
        return <ErrorBoard></ErrorBoard>
    }

    return (
        <div className={" h-full text-blue-50 pl-8"}>
            <div className={"h-full flex flex-row justify-between"}>
                <div>
                    <div>
                        <Title text={film.title} key={film.id}></Title>
                        <div className={"flex gap-4"}>
                            <span>{film.duration} min</span>
                            <span>{repertoire.showingIn}</span>
                            <span>{repertoire.language}</span>
                        </div>
                        <div className={"flex gap-2 pt-12"}>
                            <span>{params.date!.slice(8, 10)}</span>
                            <span>{months[parseInt(params.date!.slice(5, 7))]}</span>
                            <span>{params.date!.slice(0, 4)}</span>
                        </div>
                        <div>
                            <span>{repertoire.time}</span>
                            <span>{hall.name}</span>
                        </div>
                    </div>
                    <Recap></Recap>
                </div>
                <SeatPicker seatPicked={seatPicked}
                            onSetSeat={(seat: Seat) => {
                                const isPicked = !!seatPicked.find((el)=>{
                                    return el.row === seat.row && el.col === seat.col
                                })

                                if (isPicked) {
                                    setSeatPicked(seatPicked.filter((el) => {
                                        return el.row !== seat.row || el.col !== seat.col
                                    }))
                                } else {
                                    setSeatPicked([
                                        ...seatPicked,
                                        seat
                                    ])
                                }
                            }}
                            hall={hall}
                            key={film.id}></SeatPicker>
            </div>
        </div>
    )
}