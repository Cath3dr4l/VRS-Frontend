import { createContext, useReducer, useEffect } from "react";

export const StaffContext = createContext();

export const staffReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        isAuthenticated: true,
        staff: action.payload,
      };
    case "LOGOUT":
      return {
        isAuthenticated: false,
        staff: null,
      };
    default:
      return state;
  }
};

export const StaffContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(staffReducer, {
    staff: null,
  });

  useEffect(() => {
    const staff = JSON.parse(localStorage.getItem("staff"));
    if (staff) {
      dispatch({ type: "LOGIN", payload: staff });
    }
  }, []);

  console.log("StaffContext state:", state);

  return (
    <StaffContext.Provider value={{ ...state, dispatch }}>
      {children}
    </StaffContext.Provider>
  );
};
