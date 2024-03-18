import { useCartContext } from "../hooks/useCartContext";

export const useCart = () => {
  const { dispatch } = useCartContext();

  const addToCart = (movieID, quantity) => {
    const item = {
      movieID,
      quantity,
    };
    dispatch({ type: "ADD_TO_CART", payload: item });
  };

  const removeFromCart = (movieID) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: movieID });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  const updateCart = (movieID, quantity) => {
    const item = {
      movieID,
      quantity,
    };
    dispatch({ type: "UPDATE_CART", payload: item });
  };

  return { addToCart, removeFromCart, clearCart, updateCart };
};
