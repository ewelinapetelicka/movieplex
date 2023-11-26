import React from 'react';
import {PrimeReactProvider} from 'primereact/api';
import {Route, Routes} from "react-router";
import {Header} from "./components/core/header/Header";
import {Menu} from "./components/core/menu/Menu";
import {Dashboard} from "./components/pages/dashboard/Dashboard";

export function App() {
    const divStyle = {height: 'calc(100vh - 5rem)'}
    const routesStyle = {width: 'calc(100vw - 14rem)'}

    return (
        <PrimeReactProvider>
            <Header></Header>
            <div className={"flex"} style={divStyle}>
                <Menu></Menu>
                <div style={routesStyle} className={"overflow-y-auto"}>
                    <Routes>
                    <Route path={"/dashboard"} element={<Dashboard></Dashboard>}/>
                </Routes>
                </div>
            </div>
        </PrimeReactProvider>
    );
}
