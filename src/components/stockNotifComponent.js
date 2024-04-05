import React from "react";
import { useState } from "react";
import { useStaffContext } from "../hooks/useStaffContext";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";

const StockNotif = ({ movie }) => {
  const { staff } = useStaffContext();
  const [editing, setEditing] = useState(false);
  const [stock, setStock] = useState(movie.stock);

  const saveStock = async (id) => {
    const response = await fetch(`/api/staffs/movie/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${staff.token}`,
      },
      body: JSON.stringify({ stock }),
    });
    const data = await response.json();
    if (response.ok) {
      alert("Stock updated successfully");
    } else {
      alert(`An error occured: ${data.error}`);
    }
  };
  return (
    <Card className="mr-6 my-4 ml-0 h-[240px] flow-root bg-white/25 rounded-md">
      <Link
        to={`/management/moviestaff/${movie._id}`}
        style={{ textDecoration: "none" }}
      >
        <div className="float-left mx-2 py-2 w-[200px]">
          <Card.Img
            className="my-[5px] mx-auto h-[190px] w-[150px] object-cover overflow-hidden"
            variant="top"
            src={movie.poster_url}
            alt="Poster"
          />
          <Card.Title
            className="text-white m-auto font-semibold text-xl"
            style={{
              textAlign: "center",
              textOverflow: "ellipsis",
              overflow: "hidden",
              whiteSpace: "nowrap",
            }}
          >
            {movie.name}
          </Card.Title>
        </div>
      </Link>
      <Card.Body className="float-right flex flex-col p-4 mt-12">
        <div>
          <label className="text-white text-xl font-semibold mr-2">
            Stock:
          </label>
          <input
            disabled={!editing}
            defaultValue={movie.stock}
            className={`w-16 ${
              editing
                ? "border-2 text-black text-xl text-right font-semibold bg-text focus:outline-none focus:ring-2 focus:ring-blue"
                : "text-white text-right text-xl font-semibold bg-transparent border-none"
            }`}
            onInput={(e) => {
              e.target.value = e.target.value.replace(/[^0-9]/g, "");
              setStock(e.target.value);
            }}
          ></input>
          <div
            className="flex justify-center items-center"
            style={{ gap: ".5rem" }}
          >
            <button
              className="bg-blue-500 w-32 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 mr-4 rounded"
              onClick={() => {
                if (editing) {
                  setEditing(false);
                  saveStock(movie._id);
                } else {
                  setEditing(true);
                }
              }}
            >
              {editing ? "Save" : "Resolve"}
            </button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default StockNotif;
