import React, { useState, useEffect } from "react";
import axios from "axios";

const DataComponent = () => {
  const [data, setData] = useState([]);

  const lmao = encodeURIComponent("Interstellar");

  useEffect(() => {
    axios
      .get(`/api/recommend/${lmao}`)
      .then((response) => {
        setData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div>
      <h1>Data from Python API: {data.message}</h1>
    </div>
  );
};

export default DataComponent;
