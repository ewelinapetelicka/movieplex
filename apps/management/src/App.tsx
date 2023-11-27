import React from 'react';
import {PrimeReactProvider} from 'primereact/api';
import {Route, Routes} from "react-router";
import {Header} from "./components/core/header/Header";
import {Menu} from "./components/core/menu/Menu";
import {DashboardPage} from "./pages/dashboard-page/DashboardPage";
import {VoucherPage} from "./pages/voucher-page/VoucherPage";

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
                </Routes>
                </div>
            </div>
        </PrimeReactProvider>
    );
}
