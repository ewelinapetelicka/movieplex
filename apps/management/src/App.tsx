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
import {UserContext} from "./context/user/user-context";
import {User} from "./models/user/user";
import {LoginPage} from "./pages/login-page/LoginPage";

export function App() {
    const divStyle = {height: 'calc(100vh - 5rem)'}
    const routesStyle = {width: 'calc(100vw - 10rem)'}

    const [user, setUser] = React.useState<User | null>(/*{
        name: "Jan",
        surname: "Kowalski",
        avatar: "data:image/jpeg;base64,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",
    }*/ null as any)
    return (
        <PrimeReactProvider>
            {!user && <LoginPage></LoginPage>}
            {user && (
                <UserContext.Provider value={user!}>
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
                </UserContext.Provider>
            )}
        </PrimeReactProvider>
    )
}
