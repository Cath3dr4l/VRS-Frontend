import { createContext, useReducer, useEffect } from "react";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        isAuthenticated: true,
        customer: action.payload,
      };
    case "LOGOUT":
      return {
        isAuthenticated: false,
        customer: null,
      };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    customer: null,
  });

  useEffect(() => {
    const customer = JSON.parse(localStorage.getItem("customer"));

    const checkAuth = async () => {
      const response = await fetch(`/api/customers/auth`, {
        headers: {
          Authorization: `Bearer ${customer.token}`,
        },
      });
      const data = await response.json();
      if (data.error) {
        dispatch({ type: "LOGOUT" });
      } else {
        dispatch({ type: "LOGIN", payload: customer });
      }
    };

    if (customer) {
      checkAuth();
    }
  }, []);

  console.log("AuthContext state:", state);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
