import React, { useEffect, useReducer } from "react";
import { AuthContext } from "../auth/AuthContext";
import { authReducer } from "../auth/authReducer";
import { AppRoute } from "../routes/AppRoute";
import { types } from "../types/types";

const init = () => {
  return JSON.parse(localStorage.getItem("user")) || { logged: false };
};

export const App = () => {
  const [user, dispatch] = useReducer(authReducer, {}, init);

   useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
    /* const time = setInterval(()=> handlelogoutTime(), 6000)
    return () => {
        clearInterval(time)
    }; */
  }, [user]);
  

   const handlelogoutTime = () => {
    const sesion = localStorage.getItem("dateSesion");
    if (sesion) {
      const date1 = new Date(sesion);
      const date2 = new Date();
      if (date1.getTime() <= date2.getTime()) {
        dispatch({
          type: types.logout,
        });
        localStorage.removeItem("dateSesion");
      }
    }
  }; 

  return (
    <AuthContext.Provider value={{ user, dispatch }}>
      <AppRoute />
    </AuthContext.Provider>
  );
};
