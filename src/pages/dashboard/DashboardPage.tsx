import {Panel} from "../../componetns/panel/Panel";

export function DashboardPage(){
    return (
        <div className={"h-full flex display justify-between flex-col bg-gray-900 "}>
            <Panel header={"WHAT`S ON"} isAvailable={true}></Panel>
            <Panel header={"UPCOMING MOVIES"} isAvailable={false}></Panel>
        </div>
    )
}