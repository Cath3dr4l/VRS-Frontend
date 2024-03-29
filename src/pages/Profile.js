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
      body: JSON.stringify({ name, address }),
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
        <h1 className="text-4xl font-bold text-text text-center pt-16 py-4">
          Profile
        </h1>
        <div className="text-white flex justify-between flex-grow">
          <div className="w-1/4 bg-gradient-to-t from-text/15 to-text/2 text-white p-6 pt-0 shadow-lg">
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
                  <dt className="font-semibold">Address:</dt>
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
          <div className="w-3/4 ml-2 mr-4">
            <h2 className="text-2xl font-bold m-4">Orders</h2>
            <div className="flex flex-col space-y-4 text-lg">
              {orders &&
                orders.map((order) => (
                  <div
                    key={order._id}
                    className="p-4 border rounded shadow grid grid-cols-3 gap-4"
                  >
                    <div>
                      <h2 className="font-bold text-xl">
                        {order.videoID.name}
                      </h2>
                      <img
                        src={order.videoID.poster_url}
                        alt={order.videoID.name}
                        className="w-24"
                      />
                    </div>
                    <div className="space-y-2">
                      <p>Quantity: {order.quantity}</p>
                      <p>Price: Rs. {order.price}</p>
                    </div>
                    <div className="space-y-2">
                      <p>
                        Status:{" "}
                        <span
                          className={`font-bold ${
                            order.status === "rented"
                              ? "text-red-500"
                              : order.status === "bought"
                              ? "text-green-500"
                              : "text-gray-500"
                          }`}
                        >
                          {order.status.toUpperCase()}
                        </span>
                      </p>
                      <p>
                        Ordered:{" "}
                        {formatDistanceToNow(new Date(order.createdAt), {
                          addSuffix: true,
                        })}
                      </p>
                      {order.status !== "bought" && (
                        <p>
                          Rented for: {order.duration}{" "}
                          {order.duration > 1 ? "weeks" : "week"}
                        </p>
                      )}
                      {order.status === "rented" && (
                        <p className="font-semibold">
                          Due Date:{" "}
                          {format(
                            add(new Date(order.createdAt), {
                              weeks: order.duration,
                            }),
                            "MMMM do, yyyy"
                          )}
                        </p>
                      )}
                      {order.status === "returned" && (
                        <p>
                          Returned:{" "}
                          {formatDistanceToNow(new Date(order.updatedAt), {
                            addSuffix: true,
                          })}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      {error && <div className="error">{error}</div>}
    </>
  );
};

export default Profile;
