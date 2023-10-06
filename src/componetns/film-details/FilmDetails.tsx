import {Film} from "../../models/film/film";
import {Chip} from "../chip/Chip";
import style from "../../pages/film/FilmPage.module.css";

interface FilmDetailsProps{
    film : Film
}
export function FilmDetails(props: FilmDetailsProps) {
    return (
        <div className={"flex items-stretch justify-evenly"} style={{minHeight: "calc(100vh - 80px)"}}>
            <div className={'w-[35%] bg-center bg-cover'}
                 style={{backgroundImage: 'url(/posters/' + props.film?.poster + ')'}}></div>
            <div className={"bg-gray-800 text-blue-50 w-[65%] justify-evenly flex flex-col pl-3"}>
                <p className={"text-3xl"}>{props.film?.title}</p>
                <p className={"pt-2 pb-2"}>{props.film?.description}</p>
                <p className={"flex gap-3 pl-2"}>{props.film?.genre.map((el) => {
                    return (
                        <Chip key={el} text={el}></Chip>
                    )
                })}</p>
                <div className={"flex"}>
                    <table className={style.table}>
                        <tbody>
                        <tr>
                            <td>Release date:</td>
                            <td>{props.film?.releaseDate}</td>
                        </tr>
                        <tr>
                            <td>Running time:</td>
                            <td>{props.film?.duration}</td>
                        </tr>
                        <tr>
                            <td>Age restrictions:</td>
                            <td>{props.film?.ageRestriction}</td>
                        </tr>
                        <tr>
                            <td>Production:</td>
                            <td>{props.film?.production}</td>
                        </tr>
                        <tr>
                            <td>Studio:</td>
                            <td>{props.film?.studio}</td>
                        </tr>
                        <tr>
                            <td>Cast:</td>
                            <td>{props.film?.cast}</td>
                        </tr>
                        <tr>
                            <td>Director:</td>
                            <td>{props.film?.director}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}