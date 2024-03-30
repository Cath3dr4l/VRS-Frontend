import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";
import CardComponent from "./cardComponent";

const DataComponent = () => {
  const { customer } = useAuthContext();
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [data, setData] = useState(null);

  let cnt = 0;
  const recommendations = new Set();

  useEffect(() => {
    orders.forEach((order) => {
      axios
        .get(`/api/recommend/${encodeURIComponent(order.movieID.name)}`)
        .then((response) => {
          response.data.movies.forEach((movie) => {
            recommendations.add(movie);
          });
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    });
  }, [orders]);

  useEffect(() => {
    const fetchLast5Orders = async () => {
      const response = await fetch("/api/customers/order", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${customer.token}`,
        },
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error);
        setIsFetching(false);
      }
      if (response.ok) {
        setOrders(
          data
            .filter((order) => order.movieID)
            .reverse()
            .slice(0, 5),
        );
        setIsFetching(false);
        setError(null);
      }
    };
    if (customer) {
      fetchLast5Orders();
    }
  }, [customer]);

  return (
    <div>
      {customer &&
        data &&
        data.movies.map((item) => <CardComponent item={item} key={cnt++} />)}
    </div>
  );
};

export default DataComponent;
