import {useNavigate} from "react-router";
import {useContext} from "react";
import {UserContext} from "../../../context/user/user-context";
import {Avatar} from "primereact/avatar";

export function Header(){
    const navigate = useNavigate();
    const user = useContext(UserContext)
    return(
        <div className={"bg-primary h-5rem  flex justify-content-between align-items-center font-bold text-3xl pl-4 gap-2 pr-4" }>
            <div>
                <i className="pi pi-ticket" style={{fontSize: '2rem', rotate: '45deg'}}></i>
                <span onClick={() => {
                    navigate('/dashboard-page')
                }} className={"cursor-pointer"}>MOVIEPLEX</span>
            </div>
            <Avatar image={user.avatar} size="xlarge" shape="circle"  />
        </div>
    )
}