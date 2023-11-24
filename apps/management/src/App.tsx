import React from 'react';
import {PrimeReactProvider} from 'primereact/api';
import {Button} from "primereact/button";
import {Route, Routes} from "react-router";
import {Header} from "./components/core/header/Header";

export function App() {
    return (
        <PrimeReactProvider>
            <Header></Header>
                <Routes>
                    <Route path={"/dashboard"} element={<Button label={'test'}></Button>}/>
                </Routes>
        </PrimeReactProvider>
    );
}
