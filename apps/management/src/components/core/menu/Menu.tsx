import {ListBox, ListBoxChangeEvent} from 'primereact/listbox';
import React, {useState} from "react";
import {useLocation, useNavigate} from "react-router";

const options = [
    {name: 'Film', nav: '/film'},
    {name: 'Repertoire', nav: '/repertoire'},
    {name: 'Hall', nav: '/hall'},
    {name: 'Voucher', nav: '/voucher'}
];

export function Menu() {
    const location = useLocation();
    const [selectedOption, setSelectedOption] = useState<any>(options.find((el) => el.nav === location.pathname));
    const navigate = useNavigate();

    function changeRoute(e: ListBoxChangeEvent) {
        if (e.value) {
            setSelectedOption(e.value);
            navigate(e.value.nav);
        }
    }

    return (
        <div className="card flex justify-content-center">
            <ListBox value={selectedOption} onChange={(e) => changeRoute(e)} options={options} optionLabel="name"
                     className="w-full md:w-10rem"/>
        </div>
    )
}
