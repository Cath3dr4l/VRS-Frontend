import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useStaffContext } from "./useStaffContext";
import { useManagerContext } from "./useManagerContext";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch : dispatchCustomer} = useAuthContext();
  const { dispatch : dispatchStaff} = useStaffContext();
  const { dispatch : dispatchManager} = useManagerContext();


  const login = async (username, password, usertype) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch(`/api/${usertype}s/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      setIsLoading(false);
      setError(data.error);
    }
    if (response.ok) {
      // save the user in local storage
      localStorage.setItem(usertype, JSON.stringify(data));

      // update the auth context
      switch (usertype) {
        case "customer":
          dispatchCustomer({ type: "LOGIN", payload: data });
          break;
        case "staff":
          dispatchStaff({ type: "LOGIN", payload: data });
          break;
        case "manager":
          dispatchManager({ type: "LOGIN", payload: data });
          break;
      }

      setIsLoading(false);
    }
    return response.ok;
  };

  return { login, isLoading, error };
};
