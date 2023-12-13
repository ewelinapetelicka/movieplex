import {createContext} from "react";
import {Toast} from "primereact/toast";

export const ToasterContext = createContext<Toast>({} as Toast)
