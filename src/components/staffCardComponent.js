import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useStaffContext } from "../hooks/useStaffContext";
import { useManagerContext } from "../hooks/useManagerContext";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const StaffCardComponent = ({ item }) => {
  const { staff } = useStaffContext();
  const { manager } = useManagerContext();
  const navigate = useNavigate();

  const deleteItem = (id) => {
    confirmAlert({
      title: "Confirm to delete",
      message: "Are you sure you want to delete this movie?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            const response = await fetch(`/api/managers/video/${id}`, {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${manager.token}`,
              },
            });
            const data = await response.json();
            if (response.ok) {
              alert("Movie deleted successfully");
              navigate("/management/manager");
            } else {
              alert(`An error occured: ${data.error}`);
            }
          },
        },
        {
          label: "No",
          onClick: () => {
            return;
          },
        },
      ],
    });
  };

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
            <Button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-2 rounded"
              onClick={() => {
                navigate(`/management/editmovie/${item._id}`);
              }}
            >
              Edit
            </Button>
            <Button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 m-2 rounded"
              onClick={() => {
                deleteItem(item._id);
              }}
            >
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
