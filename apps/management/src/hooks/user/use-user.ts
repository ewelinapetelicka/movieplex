import {useContext} from "react";
import {UserContext} from "../../context/user/user-context";

export const useUser = () => {
    const user = useContext(UserContext);
    if (!user) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return user;
};
