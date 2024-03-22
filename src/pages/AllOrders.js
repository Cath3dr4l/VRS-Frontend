import { useEffect, useState } from "react";
import { useStaffContext } from "../hooks/useStaffContext";
import { format, add } from "date-fns";

const AllOrders = () => {
  const { staff } = useStaffContext();
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await fetch("/api/staffs/orders", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${staff.token}`,
        },
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error);
      }
      if (response.ok) {
        setOrders(data);
        setError(null);
        console.log(data);
      }
    };

    if (staff) {
      fetchOrders();
    }
  }, [staff]);
  return (
    <div style={{ color: "white " }}>
      <div className="Orders">
        <br />
        <div className="due-orders">
          <h2>Due Orders</h2>
          {orders &&
            orders
              .filter((order) => order.status === "rented")
              .map((order) => (
                <div key={order._id}>
                  <p>Movie: {order.videoID.name}</p>
                  <p>Customer: {order.customerID.name}</p>
                  <p>Price: {order.price}</p>
                  <p>
                    Due Date:
                    {format(
                      add(new Date(order.createdAt), { weeks: order.duration }),
                      "dd/MM/yyyy"
                    )}
                  </p>
                </div>
              ))}
        </div>
        <br />
        <div className="bought-orders">
          <h2>Bought Orders</h2>
          {orders &&
            orders
              .filter((order) => order.status === "bought")
              .map((order) => (
                <div key={order._id}>
                  <p>Movie: {order.videoID.name}</p>
                  <p>Customer: {order.customerID.name}</p>
                  <p>Price: {order.price}</p>
                </div>
              ))}
        </div>
        <br />
        <div className="returned-orders">
          <h2>Returned Orders</h2>
          {orders &&
            orders
              .filter((order) => order.status === "returned")
              .map((order) => (
                <div key={order._id}>
                  <p>Movie: {order.videoID.name}</p>
                  <p>Customer: {order.customerID.name}</p>
                  <p>Price: {order.price}</p>
                </div>
              ))}
        </div>
      </div>
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default AllOrders;
