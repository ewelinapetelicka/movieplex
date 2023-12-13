import {createContext} from "react";
import {User} from "../../models/user/user";

export const UserContext = createContext<User>({} as User);

