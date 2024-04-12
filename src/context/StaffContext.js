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

    const checkAuth = async () => {
      const response = await fetch(`/api/staffs/auth`, {
        headers: {
          Authorization: `Bearer ${staff.token}`,
        },
      });
      const data = await response.json();
      if (data.error) {
        dispatch({ type: "LOGOUT" });
      } else {
        dispatch({ type: "LOGIN", payload: staff });
      }
    };

    if (staff) {
      checkAuth();
    }
  }, []);

  console.log("StaffContext state:", state);

  return (
    <StaffContext.Provider value={{ ...state, dispatch }}>
      {children}
    </StaffContext.Provider>
  );
};
