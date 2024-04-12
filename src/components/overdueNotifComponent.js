import React from "react";
import { useState } from "react";
import { format, add } from "date-fns";
import { useStaffContext } from "../hooks/useStaffContext";

const OverdueNotif = ({ order }) => {
  const { staff } = useStaffContext();
  const [error, setError] = useState(null);
  const [isReturned, setIsReturned] = useState(false);

  const handleReturn = async (orderID) => {
    const response = await fetch(`/api/staffs/orders/${orderID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${staff.token}`,
      },
      body: JSON.stringify({ status: "returned" }),
    });
    const data = await response.json();
    if (!response.ok) {
      setError(data.error);
    }
    if (response.ok) {
      setIsReturned(true);
      setError(null);
    }
  };

  return (
    <div
      key={order._id}
      className="flow-root text-white justify-between h-[240px] m-4 p-4 bg-white/25 rounded-md shadow space-y-2"
    >
      <div className="float-left space-y-2">
        <p className="font-bold text-lg">{order.movieID.name}</p>
        <p>Customer: {order.customerID.name}</p>
        <p>Email: {order.customerID.email}</p>
        <p>Contact: {order.customerID.phone}</p>
        <p className="h-2"></p>
        <p>Price: {order.price}</p>
        <p>Quantity: {order.quantity}</p>
      </div>
      <div className="float-right flex flex-col gap-4 p-10 mt-12">
        <p className="font-semibold">
          Due Date :
          {format(
            add(new Date(order.createdAt), {
              weeks: order.duration,
            }),
            " dd MMM yyyy"
          )}
        </p>
        <button
          onClick={() => handleReturn(order._id)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-500 disabled:cursor-not-allowed"
          disabled={isReturned}
        >
          {isReturned ? "Returned" : "Mark as Returned"}
        </button>
      </div>
    </div>
  );
};

export default OverdueNotif;
