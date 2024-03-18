import { createContext, useReducer, useEffect } from "react";

export const CartContext = createContext();

export const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        cart: [...state.cart, action.payload],
      };

    case "REMOVE_FROM_CART":
      return {
        cart: state.cart.filter((item) => item.movieID !== action.payload),
      };

    case "CLEAR_CART":
      return {
        cart: null,
      };

    case "UPDATE_CART":
      if (action.payload.quantity === 0) {
        return {
          cart: state.cart.filter(
            (item) => item.movieID !== action.payload.movieID
          ),
        };
      }
      const exists = false;
      state.cart.map((item) => {
        if (item.movieID === action.payload.movieID) {
          item.quantity = action.payload.quantity;
          exists = true;
        }
      });

      if (!exists) {
        return {
          cart: [...state.cart, action.payload],
        };
      }

      return {
        cart: state.cart,
      };
  }
};

export const CartContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    cart: null,
  });

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart"));
    if (cart) {
      cart.map((item) => {
        dispatch({ type: "ADD_TO_CART", payload: item });
      });
    }
  }, []);

  console.log("CartContext state:", state);

  return (
    <CartContext.Provider value={{ ...state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};
