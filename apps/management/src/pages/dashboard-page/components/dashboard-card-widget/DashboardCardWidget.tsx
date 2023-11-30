import {Card} from "primereact/card";

interface DashboardCardWidgetProps {
    title: string;
    icon: string;
    value: number;
}

export function DashboardCardWidget(props: DashboardCardWidgetProps) {
    return (
        <Card className={"w-full h-10rem"}>
            <div className={"flex gap-5 align-content-center justify-content-start mb-2"}>
                <div className={"bg-primary border-round-xl p-3 "}>
                    <i className={props.icon} style={{fontSize: '3rem'}}></i>
                </div>
                <div className={"flex flex-column gap-2"}>
                    <span className={"text-sm"}>{props.title}</span>
                    <span className={"text-5xl"}>{props.value}</span>
                </div>
            </div>
        </Card>
    )
}