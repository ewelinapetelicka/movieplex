import {useEffect, useState} from "react";
import {Film} from "../../models/film/film";
import {Voucher} from "../../models/voucher/voucher";
import {DashboardCardWidget} from "./components/dashboard-card-widget/DashboardCardWidget";
import {useNavigate} from "react-router";
import {Teaser} from "../../models/teaser/teaser";

export function DashboardPage() {
    const [vouchers, setVouchers] = useState<Voucher[]>([]);
    const navigate = useNavigate();
    const [films, setFilms] = useState<Film[]>([]);
    const [teasers, setTeasers] = useState<Teaser[]>([]);

    useEffect(() => {
        getFilms();
        getVouchers();
        getTeasers();
    }, []);

    function getFilms() {
        fetch('http://localhost:8000/films')
            .then(response => response.json())
            .then((data: Film[]) => {
                setFilms(data)
            })
    }

    function getTeasers() {
        fetch('http://localhost:8000/teasers')
            .then(response => response.json())
            .then((data: Teaser[]) => {
                setTeasers(data)
            })
    }

    function getVouchers() {
        fetch('http://localhost:8000/vouchers')
            .then(response => response.json())
            .then((data: Voucher[]) => {
                setVouchers(data)
            })
    }

    return (
        <div className={"flex w-full gap-4 h-12rem justify-content-evenly align-items-center pr-4 pl-4"}>
            <DashboardCardWidget
                title={"Vouchers"}
                value={vouchers.length}
                icon={"pi pi-ticket"}
                onClick={() => navigate('/voucher-page')}/>
            <DashboardCardWidget
                title={"Now playing"}
                icon={"pi pi-video"}
                value={films.length}
                onClick={() => navigate('/films-page')}/>
            <DashboardCardWidget
                title={"Coming soon"}
                icon={"pi pi-calendar"}
                value={teasers.length}
                onClick={() => navigate("/films-page")}/>
        </div>
    )
}