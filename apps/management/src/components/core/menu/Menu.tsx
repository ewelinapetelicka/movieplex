import {ListBox, ListBoxChangeEvent} from 'primereact/listbox';
import {useLocation, useNavigate} from "react-router";

const options = [
    {name: 'Dashboard', nav: '/dashboard-page'},
    {name: 'Film', nav: '/films-page'},
    {name: 'Teaser', nav: '/teasers-page'},
    {name: 'Repertoire', nav: '/repertoire'},
    {name: 'Voucher', nav: '/voucher-page'}
];

export function Menu() {
    const location = useLocation();
    const navigate = useNavigate();

    function changeRoute(e: ListBoxChangeEvent) {
        if (e.value) {
            navigate(e.value.nav);
        }
    }

    return (
        <div className="card flex justify-content-center">
            <ListBox value={options.find((el) => el.nav === location.pathname)} onChange={(e) => changeRoute(e)}
                     options={options} optionLabel="name"
                     className="w-full md:w-10rem"/>
        </div>
    )
}
