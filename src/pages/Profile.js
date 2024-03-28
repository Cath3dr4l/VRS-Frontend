import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { formatDistanceToNow, format, add } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faSave } from "@fortawesome/free-solid-svg-icons";

const Profile = () => {
  const { customer } = useAuthContext();
  const [profile, setProfile] = useState(null);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

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
        setName(data.name);
        setAddress(data.address);
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
        setOrders(data.filter((order) => order.videoID));
        console.log(data);
        setError(null);
      }
    };
    if (customer) {
      fetchProfile();
      fetchOrders();
    }
  }, [customer]);

  const updateProfile = async () => {
    const response = await fetch("/api/customers/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${customer.token}`,
      },
      body: JSON.stringify({ name }),
    });
    const data = await response.json();
    if (response.ok) {
      setProfile({ ...profile, name, address });
      setTimeout(() => alert("Profile updated successfully"), 500);
    } else {
      alert(`An error occured: ${data.error}`);
    }
  };

  return (
    <>
      <div className="flex flex-col h-screen">
        <h1 className="text-4xl font-bold text-text text-center py-8">
          Profile
        </h1>
        <div className="text-white flex justify-between flex-grow">
          <div className="w-1/4 bg-gray-900 text-white p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Profile Details</h2>
            {profile && (
              <dl className="space-y-2 text-lg">
                <div>
                  <dt className="font-semibold">Username:</dt>
                  <dd className="font-normal">{profile.username}</dd>
                </div>
                <div>
                  <dt className="font-semibold">Name:</dt>
                  {isEditingName ? (
                    <input
                      className="text-gray-900 w-1/2"
                      type="text"
                      defaultValue={profile.name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  ) : (
                    <span className="font-normal">{profile.name}</span>
                  )}
                  <button
                    className="text-white px-2 py-1 ml-2"
                    onClick={() => {
                      if (isEditingName) {
                        setIsEditingName(false);
                        updateProfile();
                      } else {
                        setIsEditingName(true);
                      }
                    }}
                  >
                    {isEditingName ? (
                      <FontAwesomeIcon icon={faSave} />
                    ) : (
                      <FontAwesomeIcon icon={faEdit} />
                    )}
                  </button>
                </div>
                <div>
                  <dt className="font-semibold">Email:</dt>
                  <dd className="font-normal">{profile.email}</dd>
                </div>
                <div>
                  <dt className="font-semibold">Phone:</dt>
                  <dd className="font-normal">{profile.phone}</dd>
                </div>
                <div>
                  <dt className="font-semibold">Name:</dt>
                  {isEditingAddress ? (
                    <input
                      className="text-gray-900 w-1/2"
                      type="text"
                      defaultValue={profile.address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  ) : (
                    <span className="font-normal">
                      {profile.address ? profile.address : "Not Provided"}
                    </span>
                  )}
                  <button
                    className="text-white px-2 py-1 ml-2"
                    onClick={() => {
                      if (isEditingAddress) {
                        setIsEditingAddress(false);
                        updateProfile();
                      } else {
                        setIsEditingAddress(true);
                      }
                    }}
                  >
                    {isEditingAddress ? (
                      <FontAwesomeIcon icon={faSave} />
                    ) : (
                      <FontAwesomeIcon icon={faEdit} />
                    )}
                  </button>
                </div>
              </dl>
            )}
          </div>
          <div>
            <h2 className="text-2xl font-bold mr-2">Orders</h2>
            {orders &&
              orders.map((order) => (
                <div key={order._id}>
                  <p>{order.videoID.name}</p>
                  <p>Qty: {order.quantity}</p>
                  <p>Status: {order.status}</p>
                  <p>Price: {order.price}</p>
                  {order.status !== "bought" && (
                    <div>
                      <p>Rented for: {order.duration} weeks</p>
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
                  )}
                  <p>
                    Ordered:
                    {formatDistanceToNow(new Date(order.createdAt), {
                      addSuffix: true,
                    })}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>
      {error && <div className="error">{error}</div>}
    </>
  );
};

export default Profile;
