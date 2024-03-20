import { createContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useAuthContext } from "../hooks/useAuthContext";
import { useEffect } from "react";

export const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useLocalStorage("videodog-cart", []);
  const { customer } = useAuthContext();

  const cartQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const fetchCart = async () => {
      const response = await fetch("/api/customers/cart", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${customer.token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setCartItems(data);
      }
    };

    if (customer) {
      fetchCart();
    }
  }, [customer]);

  useEffect(() => {
    const updateCart = async () => {
      const response = await fetch("/api/customers/cart", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${customer.token}`,
        },
        body: JSON.stringify({ cart: cartItems }),
      });
    };
    if (customer) {
      updateCart();
    }
  }, [cartItems]);

  const getItemQuantity = (id) => {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  };

  const increaseItemQuantity = (id) => {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === id) == null) {
        return [...currItems, { id, quantity: 1 }];
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  };

  const decreaseItemQuantity = (id) => {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === id)?.quantity === 1) {
        return currItems.filter((item) => item.id !== id);
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  };

  const setDuration = (id, duration) => {
    setCartItems((currItems) => {
      return currItems.map((item) => {
        if (item.id === id) {
          return { ...item, duration };
        } else {
          return item;
        }
      });
    });
  };

  const getDuration = (id) => {
    return cartItems.find((item) => item.id === id)?.duration || 1;
  };

  const removeItem = (id) => {
    setCartItems((currItems) => currItems.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        getItemQuantity,
        increaseItemQuantity,
        decreaseItemQuantity,
        setDuration,
        getDuration,
        removeItem,
        clearCart,
        cartItems,
        cartQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
