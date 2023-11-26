import { ListBox } from 'primereact/listbox';
import React, { useState } from "react";

const options = [
    { name: 'Film', code: 'NY' },
    { name: 'Repertoire', code: 'RM' },
    { name: 'Hall', code: 'LDN' },
    { name: 'Voucher', code: 'IST' }
];

export function Menu(){
    const [selectedOption, setSelectedOption] = useState(null);
    return(
        <div className="card flex justify-content-center">
            <ListBox value={selectedOption} onChange={(e) => setSelectedOption(e.value)} options={options} optionLabel="name" className="w-full md:w-14rem" />
        </div>
    )
}
