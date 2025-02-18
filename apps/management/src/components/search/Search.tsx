import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import React from "react";

interface SearchProps {
    query: string;
    onChangeSetQuery: (event: string) => void;
    onClickSearch: () => void;
    isAdding: (flag: boolean) => void;
}

export function Search(props: SearchProps) {
    return (
        <div className={"flex w-full gap-4 justify-content-end pb-3"}>
            <span className=" flex p-input-icon-left align-items-center gap-1">
                <InputText placeholder="Search" value={props.query}
                           onChange={(event) => props.onChangeSetQuery(event.target.value)}/>
                <Button onClick={() => props.onClickSearch()}
                        icon={"pi pi-search"}/>
            </span>
            <Button severity="secondary" className={"h-3rem"}
                    label={"Add new"} onClick={() => {
                props.isAdding(true);
            }}/>
        </div>
    )
}