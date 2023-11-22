import {useNavigate} from "react-router-dom";
import {Button, ButtonType} from "../../componetns/common/button/Button";

export function ErrorBoard() {
    const navigate = useNavigate();
    return(
        <div className={"h-full w-full flex flex-col items-center justify-center gap-28"}>
            <p className={" text-blue-50 text-3xl "} >ERROR 404</p>
            <Button type={ButtonType.BLUE} onClick={()=>navigate("/dashboard")}>
                <span>BACK TO HOME PAGE</span>
            </Button>
        </div>
    )
}