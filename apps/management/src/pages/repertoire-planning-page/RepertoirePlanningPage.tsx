import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import {useEffect, useState} from "react";
import {Hall} from "../../models/hall/hall";
import {useHttp} from "../../hooks/http/use-http";
import {useParams} from "react-router";

export function RepertoirePlanningPage() {
    const params = useParams();
    const [hall, setHall] = useState<Hall>();
    const http = useHttp();

    useEffect(() => {
        if (params.id) {
            getHall();
        }
    }, []);

    function getHall() {
        http.get('halls/' + params.id)
            .then((data) => {
                setHall(data)
            })
    }

    return (
        <div>
            <h2>Plan the repertoire of {hall?.name}</h2>
            <FullCalendar
                allDaySlot={false}
                headerToolbar={false}
                height={"700px"}
                plugins={[timeGridPlugin]}
                initialView="timeGridWeek"
                events={[
                    {title: 'event 1', date: '2023-12-20T10:30:00', end: '2023-12-20T12:30:00'},
                    {title: 'event 2', date: '2023-12-20T12:00:00', end: '2023-12-20T13:30:00'},
                    {title: 'event 3', date: '2023-12-20T14:00:00', end: '2023-12-20T15:30:00'}
                ]}
                slotMinTime={"09:00:00"}
                slotMaxTime={"23:00:00"}
            />
        </div>
    )
}