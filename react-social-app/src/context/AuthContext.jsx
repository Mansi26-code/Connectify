import { createContext, useReducer } from "react";
import AuthReducer from "./AuthReducer";

// Initial state
const INITIAL_STATE = {
  user: {
    _id: "66c0e098333d653454f008bd",
    username: "Mansi",
    email: "mansi@gmail.com",

    profilePicture: "person/Mansi.jpg",
    coverPicture: "",
    followers: [], // Followers array
    followings: [], // Followings array
    isAdmin: false,
   
  },
  isFetching: false, // Add isFetching state
  error: false, // Add error state
};

// Context creation
export const AuthContext = createContext(INITIAL_STATE);

// AuthContextProvider component
export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
