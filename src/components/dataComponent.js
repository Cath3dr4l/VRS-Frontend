import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";
import RowComponent from "./RowComponent";
import { PropagateLoader } from "react-spinners";

const DataComponent = () => {
  const { customer } = useAuthContext();
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const [recommendations, setRecommendations] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const promises = orders.map((order) =>
          axios.get(
            `/api/movies/recommend/${encodeURIComponent(order.movieID.name)}`
          )
        );
        const responses = await Promise.all(promises);
        const recommendationsMap = {};
        responses.forEach((response) => {
          response.data.forEach((movie) => {
            recommendationsMap[movie.name] = movie;
          });
        });
        setRecommendations(Object.values(recommendationsMap));
        setIsFetching(false);
        setError(null);
      } catch (error) {
        setError(error);
        setIsFetching(false);
      }
    };

    if (orders.length > 0) {
      fetchRecommendations();
    }
  }, [orders]);

  useEffect(() => {
    const fetchLast5Orders = async () => {
      setIsFetching(true);
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
            .slice(0, 5)
        );
        setError(null);
      }
    };
    if (customer) {
      fetchLast5Orders();
    }
  }, [customer]);

  return (
    <>
      {customer && orders.length > 0 && (
        <>
          {isFetching ? (
            <div className="z-[100] flex h-[250px] w-screen items-center justify-center">
              <div className="flex flex-col items-center justify-center">
                <PropagateLoader color="#fff" size={30} />
                <div className="mt-10 font-poppins text-2xl text-text">
                  Loading Recommendations
                </div>
              </div>
            </div>
          ) : (
            <div>
              {recommendations && (
                <RowComponent
                  title="Recommendations"
                  videosArray={recommendations
                    .filter((video) => video.disabled === false)
                    .sort((a, b) => b.rating - a.rating)}
                />
              )}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default DataComponent;
