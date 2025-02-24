import {useNavigate} from "react-router";
import {useContext, useRef} from "react";
import {Avatar} from "primereact/avatar";
import {Menu} from "primereact/menu";
import {ToasterContext} from "../../../context/toaster/toaster-context";
import {MenuItem} from "primereact/menuitem";
import {useStorage} from "../../../hooks/storage/use-storage";
import {useUser} from "../../../hooks/user/use-user";

interface HeaderProps {
    onUserLogOut: () => void;
}

export function Header(props: HeaderProps) {
    const navigate = useNavigate();
    const user = useUser();
    const menuRight = useRef<Menu>(null);
    const toaster = useContext(ToasterContext);
    const storage = useStorage();

    const items: MenuItem[] = [
        {
            label: 'Options',
            items: [
                {
                    label: 'Log out',
                    icon: 'pi pi-times',
                    command: () => {
                        toaster.show({
                            severity: 'success',
                            summary: 'Log out',
                            detail: 'You have been log out',
                            life: 3000
                        });
                        storage.remove('user');
                        props.onUserLogOut();
                    }
                }
            ],
        }
    ]

    return (
        <div
            className={"bg-primary h-5rem  flex justify-content-between align-items-center font-bold text-3xl pl-4 gap-2 pr-4"}>
            <div className={"flex gap-2"}>
                <i className="pi pi-ticket" style={{fontSize: '2rem', rotate: '45deg'}}></i>
                <span onClick={() => {
                    navigate('/dashboard-page')
                }} className={"cursor-pointer"}>MOVIEPLEX</span>
            </div>
            {user.avatar.length > 0 ?
                <Avatar image={user.avatar} size="large" shape="circle"
                        onClick={(event) => menuRight.current!.toggle(event)}
                        aria-controls="popup_menu_left"/> :
                <Avatar icon={"pi pi-user"} size="large" shape="circle" style={{color: 'white'}}
                        onClick={(event) => menuRight.current!.toggle(event)}
                        aria-controls="popup_menu_left"/>}
            <Menu model={items} popup ref={menuRight} id="popup_menu_right" popupAlignment="right"></Menu>

        </div>
    )
}