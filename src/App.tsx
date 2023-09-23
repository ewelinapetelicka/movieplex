import {Navigate, Route, Routes} from "react-router";
import {Dashboard} from "./pages/dashboard/Dashboard";

export function App() {
    return (
     <div>
         <Routes>
             <Route path={"/dashboard"} element={<Dashboard></Dashboard>}/>
             <Route path={"*"} element={<Navigate to={'/dashboard'}></Navigate>}></Route>
         </Routes>
     </div>

    );
}
