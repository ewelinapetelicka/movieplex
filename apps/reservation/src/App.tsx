import {Navigate, Route, Routes} from "react-router";
import {DashboardPage} from "./pages/dashboard/DashboardPage";
import {Header} from "./componetns/core/header/Header";
import {FilmPage} from "./pages/film/FilmPage";
import {ErrorBoard} from "./pages/error/ErrorBoard";
import {SelectTickets} from "./pages/select-tickets/SelectTickets";
import {Payment} from "./pages/payment/Payment";
import {UpcomingFilmPage} from "./pages/upcoming-film/UpcomingFilmPage";

export function App() {
    return (
        <div className={'h-1 min-h-screen w-full flex flex-col '}>
            <Header></Header>
            <div className={"h-full grow pt-20"}>
                <Routes>
                    <Route path={"/dashboard-page"} element={<DashboardPage></DashboardPage>}/>
                    <Route path={"/film/:id"} element={<FilmPage></FilmPage>}/>
                    <Route path={"/teasers/:id"} element={<UpcomingFilmPage></UpcomingFilmPage>}/>
                    <Route path={"/error"} element={<ErrorBoard></ErrorBoard>}/>
                    <Route path={"/select-tickets/:id/:date"} element={<SelectTickets></SelectTickets>}/>
                    <Route path={"/payment"} element={<Payment></Payment>}/>
                    <Route path={"*"} element={<Navigate to={'/dashboard-page'}></Navigate>}></Route>
                </Routes>
            </div>
        </div>
    );
}
