import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

const Profile = () => {
  const { customer } = useAuthContext();
  const [profile, setProfile] = useState(null);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const response = await fetch("/api/customers/profile", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${customer.token}`,
        },
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error);
      }
      if (response.ok) {
        setProfile(data);
        setError(null);
      }
    };

    const fetchOrders = async () => {
      const response = await fetch("/api/customers/order", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${customer.token}`,
        },
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error);
      }
      if (response.ok) {
        setOrders(data);
        console.log(data);
        setError(null);
      }
    };
    if (customer) {
      fetchProfile();
      fetchOrders();
    }
  }, [customer]);

  return (
    <div style={{ color: "white " }}>
      <h2>Profile</h2>
      <div className="customer-details">
        {profile && (
          <div>
            <h3>{profile.name}</h3>
            <p>{profile.email}</p>
            <p>{profile.phone}</p>
          </div>
        )}
      </div>
      <h2>Orders</h2>
      <div className="orders">
        {orders &&
          orders.map((order) => (
            <div key={order._id}>
              <p>{order.video.name}</p>
              <p>Qty: {order.quantity}</p>
              <p>Status: {order.status}</p>
              {order.status !== "bought" && (
                <p>Rented for: {order.duration} weeks</p>
              )}
            </div>
          ))}
      </div>
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default Profile;
