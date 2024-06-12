import { createContext, useContext, useState, useEffect } from "react";
import {getCurrentUser} from "../lib/apperite"
const GlobalContext = createContext();
export const UseGlobalContext = () => useContext(GlobalContext);

export default GlobalProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getCurrentUser()
    .then((res) => {
      if (res) {
        setIsLoggedIn(true);
        setUser(res);
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      setIsLoading(false);
    });
  }, []);

  return <GlobalContext.Provider value={{
    isLoggedIn,
    setIsLoggedIn,
    user,
    setUser,
    isLoading
  }}>{children}
  </GlobalContext.Provider>;
};
