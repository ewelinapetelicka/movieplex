import {Panel} from "../../componetns/panel/Panel";

export function Dashboard(){
    return (
        <div className={"pt-20 h-full flex display justify-between flex-col"}>
            <Panel header={"WHAT`S ON"} isAvailable={true}></Panel>
            <Panel header={"UPCOMING MOVIES"} isAvailable={false}></Panel>
        </div>
    )
}