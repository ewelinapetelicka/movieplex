import React, {createRef, useEffect, useRef, useState} from 'react';
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
import {useStorage} from "./hooks/storage/use-storage";
import {Toast} from "primereact/toast";
import {ToasterContext} from "./context/toaster/toaster-context";

export function App() {
    const divStyle = {height: 'calc(100vh - 5rem)'}
    const routesStyle = {width: 'calc(100vw - 10rem)'}
    const storage = useStorage();
    const [user, setUser] = useState<User | null>(null);
    const toast = useRef<Toast>(null);

    function logIn(user: User) {
        setUser(user);
        storage.set('user', JSON.stringify(user));
    }

    useEffect(() => {
        if (storage.get('user')) {
            setUser(JSON.parse(storage.get('user')!));
        }
    }, []);

    return (
        <PrimeReactProvider>
            <Toast ref={toast}/>
            <ToasterContext.Provider value={toast.current!}>
                {!user && <LoginPage onLogged={(user: User) => logIn(user)}></LoginPage>}
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
            </ToasterContext.Provider>
        </PrimeReactProvider>
    )
}
