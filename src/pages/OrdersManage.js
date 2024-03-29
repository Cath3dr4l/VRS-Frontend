import { useEffect, useState } from "react";
import { useManagerContext } from "../hooks/useManagerContext";
import { format, add } from "date-fns";

const OrdersManage = () => {
  const { manager } = useManagerContext();
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await fetch("/api/managers/orders", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${manager.token}`,
        },
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error);
      }
      if (response.ok) {
        setOrders(data.filter((order) => order.videoID && order.customerID));
        setError(null);
        console.log(data);
      }
    };

    if (manager) {
      fetchOrders();
    }
  }, [manager]);

  const handleReturn = async (orderID) => {
    const response = await fetch(`/api/managers/orders/${orderID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${manager.token}`,
      },
      body: JSON.stringify({ status: "returned" }),
    });
    const data = await response.json();
    if (!response.ok) {
      setError(data.error);
    }
    if (response.ok) {
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderID ? { ...order, status: "returned" } : order
        )
      );
      setError(null);
    }
  };
  return (
    <div className="pt-16 text-white">
      <h2 className="text-xl font-semibold mb-4 mx-2">Due Orders</h2>
      <div className="grid grid-cols-3 gap-4 mx-2">
        {orders &&
          orders
            .filter((order) => order.status === "rented")
            .map((order) => (
              <div
                key={order._id}
                className="flex flex-col justify-between border p-4 rounded shadow space-y-2"
              >
                <div className="space-y-2">
                  <p className="font-bold text-lg">{order.videoID.name}</p>
                  <p>Customer: {order.customerID.name}</p>
                  <p>Price: {order.price}</p>
                  <p>
                    Due Date:
                    {format(
                      add(new Date(order.createdAt), {
                        weeks: order.duration,
                      }),
                      "dd/MM/yyyy"
                    )}
                  </p>
                </div>
                <div>
                  <button
                    onClick={() => handleReturn(order._id)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Mark as Returned
                  </button>
                </div>
              </div>
            ))}
      </div>
      <br />
      <h2 className="text-xl font-semibold mb-4 mx-2">Bought Orders</h2>
      <div className="grid grid-cols-3 gap-4 mx-2">
        {orders &&
          orders
            .filter((order) => order.status === "bought")
            .map((order) => (
              <div
                key={order._id}
                className="flex flex-col justify-between border p-4 rounded space-y-2"
              >
                <p>Movie: {order.videoID.name}</p>
                <p>Customer: {order.customerID.name}</p>
                <p>Price: {order.price}</p>
              </div>
            ))}
      </div>
      <br />
      <h2 className="text-xl font-semibold mb-4 mx-2">Returned Orders</h2>
      <div className="grid grid-cols-3 gap-4 mx-2">
        {orders &&
          orders
            .filter((order) => order.status === "returned")
            .map((order) => (
              <div
                key={order._id}
                className="flex flex-col justify-between border p-4 rounded space-y-2"
              >
                <p>Movie: {order.videoID.name}</p>
                <p>Customer: {order.customerID.name}</p>
                <p>Price: {order.price}</p>
                {order.returnHandledBy && (
                  <p>Return processed by: {order.returnHandledBy.name}</p>
                )}
              </div>
            ))}
      </div>
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default OrdersManage;
