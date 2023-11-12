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
        <div className={"relative text-gray-200 bg-gray-800 cursor-pointer rounded-lg border-2 border-gray-600 p-1"} ref={wrapperRef}>
            <span onClick={() => {
                setIsVisible(true)
            }}>{currentValue}</span>
            {isVisible ? <div className={"absolute z-20 mt-3 bg-gray-800 text-gray-200"}>
                {props.options.map((el) => {
                    return (
                        <div onClick={() => {
                            changeValue(el)
                        }}
                             className={"text-gray-200 " + (currentValue === el ? "bg-gray-700" : "")}
                        >{el}
                        </div>)
                })}
            </div> : null}
        </div>
    )
}