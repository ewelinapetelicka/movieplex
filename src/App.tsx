import {Navigate, Route, Routes} from "react-router";
import {DashboardPage} from "./pages/dashboard/DashboardPage";
import {Header} from "./componetns/header/Header";
import {FilmPage} from "./pages/film/FilmPage";
import {ErrorBoard} from "./pages/error/ErrorBoard";

export function App() {
    return (
        <div className={'h-screen w-full flex flex-col'}>
            <Header></Header>
            <div className={"grow bg-gray-900 pt-20"}>
                <Routes>
                    <Route path={"/dashboard"} element={<DashboardPage></DashboardPage>}/>
                    <Route path={"/film/:id"} element={<FilmPage></FilmPage>}/>
                    <Route path={"/error"} element={<ErrorBoard></ErrorBoard>}/>
                    <Route path={"*"} element={<Navigate to={'/dashboard'}></Navigate>}></Route>
                </Routes>
            </div>
        </div>
    );
}
