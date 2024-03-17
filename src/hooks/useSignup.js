import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const signup = async (username, password, name, email, phone, address) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch("/api/customers/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        password,
        name,
        email,
        phone,
        address,
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      setIsLoading(false);
      setError(data.error);
    }
    if (response.ok) {
      // save the user in local storage
      localStorage.setItem("customer", JSON.stringify(data));

      // update the auth context
      dispatch({ type: "LOGIN", payload: data });

      setIsLoading(false);
    }
    return response.ok;
  };

  return { signup, isLoading, error };
};
