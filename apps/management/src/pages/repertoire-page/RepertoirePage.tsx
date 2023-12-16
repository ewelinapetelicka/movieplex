import {Button} from "primereact/button";
import {Repertoire} from "../../models/repertoire/repertoire";
import React, {useEffect, useState} from "react";
import {Hall} from "../../models/hall/hall";
import {useHttp} from "../../hooks/http/use-http";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {Dropdown} from "primereact/dropdown";
import {useNavigate} from "react-router";

export function RepertoirePage() {
    const [repertoire, setRepertoire] = useState<Repertoire[]>([]);
    const [halls, setHalls] = useState<Hall[]>([]);
    const http = useHttp();
    const [selectedDay, setSelectedDay] = useState(new Date().getDay());
    const navigate = useNavigate();

    const days = [
        {name: "Monday", value: 0},
        {name: "Tuesday", value: 1},
        {name: "Wednesday", value: 2},
        {name: "Thursday", value: 3},
        {name: "Friday", value: 4},
        {name: "Saturday", value: 5},
        {name: "Sunday", value: 6}
    ];

    useEffect(() => {
        getHalls();
        getRepertoire();
    }, []);

    function getHalls() {
        http.get('halls')
            .then((data) => {
                setHalls(data)
            })
    }

    function getRepertoire() {
        http.get('repertoire', {_expand: 'film'})
            .then((data) => {
                setRepertoire(data)
            })
    }

    function openHall(hallId: number) {
        navigate("/repertoire-planning/" + hallId);
    }

    return (
        <div className={"w-12 flex flex-column justify-content-center align-items-center"}>
            <div className={"w-10 flex justify-content-between align-items-center"}>
                <h1>Repertoire creator</h1>
                <Dropdown value={selectedDay} onChange={(e) => setSelectedDay(e.value)}
                          optionLabel="name"
                          optionValue={'value'}
                          scrollHeight={"500px"}
                          options={days} placeholder={"Choose day"}></Dropdown>
            </div>
            <div className={"w-10 flex justify-content-evenly pt-5 gap-3"}>
                {halls.map((hall) => {
                    return (
                        <div key={hall.id} className={"w-3"}>
                            <Button label={hall.name} className={"w-12"} onClick={() => openHall(hall.id)}/>
                            <DataTable
                                value={repertoire.filter((r) => r.hallId === hall.id).filter((e) => e.days.includes(selectedDay))}
                                className={"w-12"}>
                                <Column field="film.title" header="now playing"></Column>
                                <Column field="time" header="time"></Column>
                            </DataTable>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}