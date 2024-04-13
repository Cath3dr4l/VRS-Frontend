import React, { useEffect, useState } from "react";
import { useManagerContext } from "../hooks/useManagerContext";
import StaffProfileCard from "../components/StaffProfileCard";
import Loader from "../components/Loader";

const ListStaffs = () => {
  const { manager } = useManagerContext();
  const [staffs, setStaffs] = useState(null);
  const [error, setError] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const fetchStaffs = async () => {
      setIsFetching(true);
      const response = await fetch("/api/managers/staffs", {
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
        setStaffs(data);
        setError(null);
        setIsFetching(false);
      }
    };
    if (manager) {
      fetchStaffs();
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
            {staffs &&
              staffs.map((staff) => (
                <StaffProfileCard key={staff._id} user={staff} />
              ))}
          </div>
          {error && <div className="text-red-500 text-center">{error}</div>}
        </div>
      )}
    </>
  );
};

export default ListStaffs;
