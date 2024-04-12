import { createContext, useReducer, useEffect } from "react";

export const ManagerContext = createContext();

export const managerReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        isAuthenticated: true,
        manager: action.payload,
      };
    case "LOGOUT":
      return {
        isAuthenticated: false,
        manager: null,
      };
    default:
      return state;
  }
};

export const ManagerContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(managerReducer, {
    manager: null,
  });

  useEffect(() => {
    const manager = JSON.parse(localStorage.getItem("manager"));

    const checkAuth = async () => {
      const response = await fetch(`/api/managers/auth`, {
        headers: {
          Authorization: `Bearer ${manager.token}`,
        },
      });
      const data = await response.json();
      if (data.error) {
        dispatch({ type: "LOGOUT" });
      } else {
        dispatch({ type: "LOGIN", payload: manager });
      }
    };

    if (manager) {
      checkAuth();
    }
  }, []);

  console.log("ManagerContext state:", state);

  return (
    <ManagerContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ManagerContext.Provider>
  );
};
