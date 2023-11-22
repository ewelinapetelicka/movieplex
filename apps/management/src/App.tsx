import React from 'react';
import {PrimeReactProvider} from 'primereact/api';
import {Button} from "primereact/button";
import {Route, Routes} from "react-router";

export function App() {
    return (
        <PrimeReactProvider>
            <Routes>
                <Route path={"/dashboard"} element={<Button></Button>}/>
            </Routes>
        </PrimeReactProvider>

    );
}
