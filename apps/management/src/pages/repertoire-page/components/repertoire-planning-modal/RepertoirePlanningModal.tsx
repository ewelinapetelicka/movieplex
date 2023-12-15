import {Sidebar} from "primereact/sidebar";
import {Hall} from "../../../../models/hall/hall";
import {useEffect, useState} from "react";
import {useHttp} from "../../../../hooks/http/use-http";

interface RepertoirePlanningModalProps {
    visible: boolean;
    onHide: () => void;
    hallId: number;
}

export function RepertoirePlanningModal(props: RepertoirePlanningModalProps) {
    const [hall, setHall] = useState<Hall>();
    const http = useHttp();

    useEffect(() => {
        if (props.hallId) {
            getHall();
        }
    }, [props.hallId]);

    function getHall() {
        http.get('halls/' + props.hallId)
            .then((data) => {
                setHall(data)
            })
    }

    function closeSidebar() {
        props.onHide();
        setHall(undefined);
    }

    return (
        <Sidebar fullScreen position="top" visible={props.visible} onHide={() => closeSidebar()}
                 header={<h2>Plan the repertoire of {hall?.name} </h2>}>
            repertoirePlanningModal
        </Sidebar>
    )
}