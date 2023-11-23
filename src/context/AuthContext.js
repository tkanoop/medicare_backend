import { createContext, useReducer, useEffect } from "react";
export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { admin: action.payload };
    case "LOGOUT":
      return { admin: null };
    case "CLIENTLOGIN":
      return { client: action.payload };
    case "CLIENTLOGOUT":
      return { client: null };
      case "DOCTORLOGIN":
      return { doctor: action.payload };
    case "DOCTORLOGOUT":
      return { doctor: null };
    default:
      return state;
  }
};
export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    admin: null,
    client: null,
    doctor:null
  });
  useEffect(() => {
    const admin = JSON.parse(localStorage.getItem("admin"));
    const client = JSON.parse(localStorage.getItem("client"));
    const doctor = JSON.parse(localStorage.getItem("doctor"));
    if (admin) {
      dispatch({ type: "LOGIN", payload: admin });
    }
    if (client) {
      dispatch({ type: "CLIENTLOGIN", payload: client });
    }
    if (doctor) {
      dispatch({ type: "DOCTORLOGIN", payload: doctor });
    }
  }, []);
  console.log("AuthContext state", state);
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
