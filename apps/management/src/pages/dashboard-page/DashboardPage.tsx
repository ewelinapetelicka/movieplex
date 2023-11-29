import {useEffect, useState} from "react";
import {Film} from "../../models/film/film";

export function DashboardPage(){
    const [films, setFilms] = useState<Film[]>([]);
    const [availableFilms, setAvailableFilms] = useState<Film[]>([]);
    const [unavailableFilms, setUnavailableFilms] = useState<Film[]>([]);

    useEffect(() => {
        getFilms();
    }, []);

    function getFilms(){
        fetch('http://localhost:8000/films')
            .then(response => response.json())
            .then((data: Film[]) => {
                setAvailableFilms(data.filter((film) => film.isAvailable));
                setUnavailableFilms(data.filter((film) => !film.isAvailable));
            })
        console.log(availableFilms);
        console.log(unavailableFilms);
    }

    function getAvailableFilms(){

    }


    return(
        <div>
            <div>{availableFilms.length}</div>
            <div>{unavailableFilms.length}</div>
        </div>
    )
}