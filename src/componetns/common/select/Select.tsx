import {useRef, useState} from "react";
import {useClickOutside} from "../../../hooks/click-outside/click-outside";

interface SelectProps {
    initValue: string;
    options: string[];
}

export function Select(props: SelectProps) {
    const [currentValue, setCurrentValue] = useState(props.initValue);
    const [isVisible, setIsVisible] = useState(false);

    const wrapperRef = useRef(null);

    useClickOutside(wrapperRef, () => {
        setIsVisible(false)
    });

    function changeValue(newValue: string) {
        setCurrentValue(newValue);
        setIsVisible(false);
    }

    return (
        <div className={"relative"} ref={wrapperRef}>
            <span onClick={() => {
                setIsVisible(true)
            }}>{currentValue}</span>
            {isVisible ? <div className={"absolute z-20 mt-3 bg-amber-100"}>
                {props.options.map((el) => {
                    return (
                        <div onClick={() => {
                            changeValue(el)
                        }}
                             className={"text-cyan-950 " + (currentValue === el ? "bg-amber-400" : "")}
                        >{el}
                        </div>)
                })}
            </div> : null}
        </div>
    )
}