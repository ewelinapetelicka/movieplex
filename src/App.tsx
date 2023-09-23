import {Navigate, Route, Routes} from "react-router";
import {Dashboard} from "./pages/dashboard/Dashboard";
import {Header} from "./componetns/header/Header";

export function App() {
    return (
        <div className={'h-screen w-screen flex flex-col'}>
            <Header></Header>
            <div className={"grow bg-gray-900"}
            ><Routes>
                <Route path={"/dashboard"} element={<Dashboard></Dashboard>}/>
                <Route path={"*"} element={<Navigate to={'/dashboard'}></Navigate>}></Route>
            </Routes>
            </div>
        </div>
    );
}
