import {useEffect, useState} from "react";
import {Repertoire} from "../../models/repertoire/repertoire";
import {useNavigate} from "react-router-dom";
import {useParams} from "react-router";
import {Loader} from "../../componetns/common/loader/Loader";
import {ErrorBoard} from "../error/ErrorBoard";
import {Film} from "../../models/film/film";
import {Hall} from "../../models/hall/hall";

export function SelectTickets() {
    const params = useParams();
    const [repertoire, setRepertoire] = useState<Repertoire>();
    const [film, setFilm] = useState<Film>();
    const [hall, setHall] = useState<Hall>();
    const [isError, setIsError] = useState(false);
    const navigate = useNavigate();

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
        if (!repertoire){
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
        if (!repertoire){
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
        <div className={"text-blue-50"}>

            <p>{film.title}</p>
            <p>{film.duration}</p>
            <p>{film.title}</p>
            <p>{repertoire.time}</p>
            <p>{repertoire.showingIn}</p>
            <p>{repertoire.language}</p>
            <p>{hall.name}</p>
            <p className={"text-blue-50"}>{repertoire.time}</p>
            <p>TICKETS</p>

        </div>
    )
}