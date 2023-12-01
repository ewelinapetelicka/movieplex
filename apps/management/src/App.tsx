import React from 'react';
import {PrimeReactProvider} from 'primereact/api';
import {Route, Routes} from "react-router";
import {Header} from "./components/core/header/Header";
import {Menu} from "./components/core/menu/Menu";
import {DashboardPage} from "./pages/dashboard-page/DashboardPage";
import {VoucherPage} from "./pages/voucher-page/VoucherPage";
import {FilmsPage} from "./pages/films-page/FilmsPage";
import {RepertoirePage} from "./pages/repertoire-page/RepertoirePage";
import {TeasersPage} from "./pages/teasers-page/TeasersPage";

export function App() {
    const divStyle = {height: 'calc(100vh - 5rem)'}
    const routesStyle = {width: 'calc(100vw - 10rem)'}

    return (
        <PrimeReactProvider>
            <Header></Header>
            <div className={"flex"} style={divStyle}>
                <Menu></Menu>
                <div style={routesStyle} className={"overflow-y-auto"}>
                    <Routes>
                        <Route path={"/dashboard-page"} element={<DashboardPage></DashboardPage>}/>
                        <Route path={"/hall-page"} element={<DashboardPage></DashboardPage>}/>
                        <Route path={"/voucher-page"} element={<VoucherPage></VoucherPage>}/>
                        <Route path={"/films-page"} element={<FilmsPage></FilmsPage>}/>
                        <Route path={"/teasers-page"} element={<TeasersPage></TeasersPage>}/>
                        <Route path={"/repertoire"} element={<RepertoirePage></RepertoirePage>}/>
                    </Routes>
                </div>
            </div>
        </PrimeReactProvider>
    )
}
