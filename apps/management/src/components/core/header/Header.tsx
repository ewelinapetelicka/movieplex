import {useNavigate} from "react-router";

export function Header(){
    const navigate = useNavigate();
    return(
        <div className={"bg-primary h-5rem  flex justify-content-start align-items-center font-bold text-3xl pl-4 gap-2"}>
            <i className="pi pi-ticket" style={{ fontSize: '2rem', rotate:'45deg'}}></i>
            <span onClick={()=>{navigate('/dashboard-page')}} className={"cursor-pointer"}>MOVIEPLEX</span>
        </div>
    )
}