import {useEffect, useState} from "react";
import {Film} from "../../models/film/film";
import {useNavigate} from "react-router-dom";
import {Teaser} from "../../models/teaser/teaser";

interface PanelProps {
    header: string;
    isAvailable: boolean;
}

export function Panel(props: PanelProps) {
    const [films, setFilms] = useState<Film[]>([]);
    const [teasers, setTeasers] = useState<Teaser[]>([]);
    const navigate = useNavigate()

    useEffect(() => {
        if (props.isAvailable) {
            fetch('http://localhost:8000/films')
                .then(response => response.json())
                .then((data: Film[]) => {
                    setFilms(data)
                })
                .catch(error => console.error(error));
        } else {
            fetch('http://localhost:8000/teasers')
                .then(response => response.json())
                .then((data: Teaser[]) => {
                    setTeasers(data)
                })
                .catch(error => console.error(error));
        }

    }, [])

    return (
        <div>
            <div className={"w-full h-10 bg-orange-400 text-gray-900 font-bold flex items-center pl-4 mb-2"}>{props.header}</div>
            <div className={"flex justify-evenly"}>
                {
                    (props.isAvailable ? films : teasers).map((el) => {
                return <img src={"/posters/" + el.poster} className={"w-[240px] " + (props.isAvailable? "cursor-pointer" : '')} key={el.id} onClick={()=>{
                    if (props.isAvailable){
                        navigate("/film/" + el.id)
                    }
                }}></img>
            })
                }</div>
        </div>
    )
}
