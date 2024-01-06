import { createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";

const TrakorpsCreateContext = createContext();

export const TrakorpsCreateContextProvider = ({ children }) => {
  const navigation = useNavigate();

  return <TrakorpsCreateContext.Provider value={{ navigation }}>{children}</TrakorpsCreateContext.Provider>;
};

export const UseTrakorpsCreateContext = () => {
  return useContext(TrakorpsCreateContext);
};
