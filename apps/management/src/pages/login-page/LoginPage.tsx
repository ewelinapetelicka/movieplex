import {Card} from "primereact/card";
import {Password} from "primereact/password";
import {useState} from "react";
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import {useHttp} from "../../hooks/http/use-http";

export function LoginPage(){
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const http= useHttp();

    function log(){
        http.get("users", {
            email:email,
            password: password,
        }).then((data) => {
            console.log(data)
        })
    }

    return(
        <div className={"h-screen w-full flex justify-content-center align-items-center"}>
            <Card className={"w-8 h-30rem pl-4 gap-2 pr-4"} title={"Login"}>
                <div className={"flex flex-column w-10 h-30rem gap-4"}>
                    <InputText type="text" placeholder="email" className={"w-12"} value={email} onChange={(e)=>setEmail(e.target.value)}/>
                    <Password value={password} onChange={(e) => setPassword(e.target.value)} inputClassName={"w-12"}
                              toggleMask placeholder={"password"} />
                    <Button label={"log in"} onClick={()=>log()} />
                </div>
            </Card>
        </div>
    )
}