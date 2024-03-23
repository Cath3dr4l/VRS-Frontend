import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useStaffContext } from "../hooks/useStaffContext";
import { useManagerContext } from "../hooks/useManagerContext";

const StaffCardComponent = ({ item }) => {
  const { staff } = useStaffContext();
  const { manager } = useManagerContext();

  return (
    <Card className="w-screen h-[240px] my-[5px] flow-root bg-white/30 rounded-md">
      <Link
        to={`/management/movie/${item._id}`}
        style={{ textDecoration: "none" }}
      >
        <div className="float-left w-[60%]">
          <Card.Img
            className="mx-[5px] my-[5px] h-[190px] w-[150px] object-cover overflow-hidden"
            variant="top"
            src={item.poster_url}
            alt="Poster"
          />
          <Card.Title
            className="text-white font-semibold text-xl mx-2"
            style={{
              textAlign: "left",
              textOverflow: "ellipsis",
              overflow: "hidden",
              whiteSpace: "nowrap",
            }}
          >
            {item.name}
          </Card.Title>
        </div>
      </Link>
      <Card.Body className="float-right flex flex-col p-4">
        {manager ? (
          <div className="flex flex-row">
            <Link to={`/management/editmovie/${item._id}`}>
              <Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-2 rounded">
                Edit
              </Button>
            </Link>
            <Button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 m-2 rounded">
              Delete
            </Button>
          </div>
        ) : (
          <div
            className="flex justify-center items-center"
            style={{ gap: ".5rem" }}
          >
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => {
                //   decreaseItemQuantity(id);
              }}
            >
              -
            </button>
            <div>
              <span className="text-4x1">{item.stock}</span> in stock
            </div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => {
                //   increaseItemQuantity(id);
              }}
            >
              +
            </button>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default StaffCardComponent;
