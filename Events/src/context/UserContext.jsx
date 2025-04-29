import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const UserInStorage = JSON.parse(localStorage.getItem("user"));
        if (UserInStorage) setUser(UserInStorage);
    }, []);

    useEffect(() => {
        if (user) {
            localStorage.setItem("user", JSON.stringify(user));
        } else {
            localStorage.removeItem("user");
        }
    }, [user]);

    const login = (username, user_id) => setUser({ username, user_id });
    const otherUserDetails = (userData) => {
        setUser(prevUser => ({
            ...prevUser,  // Keep existing user data
            ...userData   // Add or update with new data
        }));
    };
   
    const logout = () => setUser(null);

    return (
        <UserContext.Provider value={{ user, login, otherUserDetails,logout }}>
            {children}
        </UserContext.Provider>
    );
};