import {Card} from "primereact/card";
import {Password} from "primereact/password";
import {useContext, useState} from "react";
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import {useHttp} from "../../hooks/http/use-http";
import {User} from "../../models/user/user";
import {ToasterContext} from "../../context/toaster/toaster-context";

interface LoginPageProps {
    onLogged: (user: User) => void;
}

export function LoginPage(props: LoginPageProps) {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const http = useHttp();
    const toaster = useContext(ToasterContext);

    function log() {
        http.get("users", {
            email: email,
            password: password,
        }).then((data: User[]) => {
            if (data.length > 0) {
                props.onLogged(data[0]);
                toaster.show({severity: 'success', summary: 'Success', detail: 'Logged in'});
            } else {
                toaster.show({severity: 'error', summary: 'Error', detail: 'Wrong credentials'});
            }
        })
    }

    return (
        <div className={"h-screen w-full flex justify-content-center align-items-center"}>
            <div className={' w-8'}>
                <Card className={"w-full h-30rem flex justify-content-center align-items-center"}
                      title={"Login"}>
                    <InputText type="text" placeholder="email" className={"w-12 mb-4"} value={email}
                               onChange={(e) => setEmail(e.target.value)}/>
                    <Password value={password} onChange={(e) => setPassword(e.target.value)} inputClassName={"w-12"}
                              toggleMask feedback={false} placeholder={"password"} className={'w-12 mb-4'}/>
                    <Button label={"log in"} onClick={() => log()}/>
                </Card>
            </div>
        </div>
    )
}