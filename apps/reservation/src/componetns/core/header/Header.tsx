import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBars, faTicket} from '@fortawesome/free-solid-svg-icons';
import {useState} from "react";
import {Menu} from "../menu/Menu";
import {useNavigate} from "react-router-dom";

export function Header() {
    const [menu, setMenu] = useState<boolean>(false);
    const navigate = useNavigate();

    return (
        <div className={"bg-sky-700 h-20 flex items-center text-4xl pl-10 pr-10 justify-between fixed w-full"}>
            <div>
                <FontAwesomeIcon icon={faTicket} className={"rotate-45 pr-2 text-blue-50 "}/>
                <button onClick={() => navigate("/dashboard-page")}>
                    <h2 className={"text-blue-50 font-extrabold"}>
                        <span className={"text-orange-400"}>MOVIE</span>
                        PLEX
                    </h2>
                </button>
            </div>
            <button onClick={() => setMenu(!menu)} className={"text-blue-50"}>
                <FontAwesomeIcon icon={faBars}/>
            </button>
            <Menu isVisible={menu}></Menu>
        </div>
    )
}