import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import {useEffect, useState} from "react";
import {Hall} from "../../models/hall/hall";
import {useHttp} from "../../hooks/http/use-http";
import {useParams} from "react-router";
import {Repertoire} from "../../models/repertoire/repertoire";
import {EventSourceInput} from "@fullcalendar/core";
import {addMinutesToStringTime} from "../../utils/time/time.utils";
import {PlanningDetails} from "./components/planning-details/PlanningDetails";
import interactionPlugin from '@fullcalendar/interaction';
import {Button} from "primereact/button";


export function RepertoirePlanningPage() {
    const params = useParams();
    const [hall, setHall] = useState<Hall>();
    const http = useHttp();
    const [events, setEvents] = useState<EventSourceInput>([]);
    const [isVisible, setIsVisible] = useState(false);
    const [repertoireSelected, setRepertoireSelected] = useState<Repertoire>();

    useEffect(() => {
        if (params.id) {
            getHall();
            getRepertoire();
        }
    }, []);

    function getHall() {
        http.get('halls/' + params.id)
            .then((data) => {
                setHall(data)
            })
    }

    function getRepertoire() {
        http.get('repertoire', {hallId: params.id, _expand: 'film'})
            .then((data) => {
                setEvents(data.map((el: Repertoire) => {
                    return {
                        title: el.film?.title,
                        startTime: el.time,
                        endTime: addMinutesToStringTime(el.time, el.film?.duration! + 30),
                        daysOfWeek: el.days,
                        repertoire: el
                    }
                }));
            })
    }

    return (
        <div>
            <div className={" p-2 flex justify-content-between align-items-center"}>
                <h2>Plan the repertoire of {hall?.name}</h2>
                <Button onClick={(e) => {
                    setIsVisible(true);
                    setRepertoireSelected(undefined);
                }}>Add new</Button>
            </div>
            <FullCalendar
                allDaySlot={false}
                headerToolbar={false}
                height={"700px"}
                plugins={[timeGridPlugin, interactionPlugin]}
                initialView="timeGridWeek"
                events={events}
                slotMinTime={"09:00:00"}
                slotMaxTime={"23:00:00"}
                eventClick={(e) => {
                    setIsVisible(true);
                    setRepertoireSelected(e.event.extendedProps.repertoire);
                }}
            />
            <PlanningDetails show={isVisible} onHide={() => setIsVisible(false)} repertoireEdit={repertoireSelected}/>
        </div>
    )
}