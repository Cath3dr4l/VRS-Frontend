import React, { useEffect, useState } from "react";
import { useManagerContext } from "../hooks/useManagerContext";
import ProfileCard from "../components/ProfileCard";
import Loader from "../components/Loader";

const ListCustomers = () => {
  const { manager } = useManagerContext();
  const [customers, setCustomers] = useState(null);
  const [error, setError] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const fetchCustomers = async () => {
      setIsFetching(true);
      const response = await fetch("/api/managers/customers", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${manager.token}`,
        },
      });
      const data = await response.json();

      if (!response.ok) {
        setError(data.error);
        setIsFetching(false);
      }
      if (response.ok) {
        setCustomers(data);
        setError(null);
        setIsFetching(false);
      }
    };
    if (manager) {
      fetchCustomers();
    }
  }, [manager]);

  return (
    <>
      {isFetching ? (
        <Loader />
      ) : (
        <div className="pt-20">
          <div className="text-text text-3xl font-bold text-center mb-5">
            Employees
          </div>
          <div className="grid grid-cols-4 gap-4">
            {customers &&
              customers.map((customer) => (
                <ProfileCard
                  key={customer._id}
                  user={customer}
                  role="customer"
                />
              ))}
          </div>
          {error && <div className="text-red-500 text-center">{error}</div>}
        </div>
      )}
    </>
  );
};

export default ListCustomers;
