import React, { useState } from "react";
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

  const disableItem = (id) => {
    confirmAlert({
      title: "Confirm to disable",
      message: "Are you sure you want to disable this movie?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            const response = await fetch(`/api/managers/video/${id}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${manager.token}`,
              },
              body: JSON.stringify({ disabled: true }),
            });
            const data = await response.json();
            if (response.ok) {
              alert("Movie disabled successfully");
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

  const enableItem = async (id) => {
    const response = await fetch(`/api/managers/video/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${manager.token}`,
      },
      body: JSON.stringify({ disabled: false }),
    });
    const data = await response.json();
    if (response.ok) {
      alert("Movie enabled successfully");
      navigate("/management/manager");
    } else {
      alert(`An error occured: ${data.error}`);
    }
  };

  const [editing, setEditing] = useState(false);
  const [stock, setStock] = useState(item.stock);

  const saveStock = async (id) => {
    const response = await fetch(`/api/staffs/video/${id}`, {
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
            <>
              {item.disabled ? (
                <Button
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 m-2 rounded"
                  onClick={() => {
                    enableItem(item._id);
                  }}
                >
                  Enable
                </Button>
              ) : (
                <Button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 m-2 rounded"
                  onClick={() => {
                    disableItem(item._id);
                  }}
                >
                  Disable
                </Button>
              )}
            </>
          </div>
        ) : (
          <>
            {item.disabled ? (
              <div className="text-white text-xl font-semibold">
                This movie is disabled
              </div>
            ) : (
              <div>
                <label className="text-white text-xl font-semibold mr-2">
                  Stock:
                </label>
                <input
                  disabled={!editing}
                  defaultValue={item.stock}
                  className="text-black w-20"
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
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => {
                      if (editing) {
                        setEditing(false);
                        saveStock(item._id);
                      } else {
                        setEditing(true);
                      }
                    }}
                  >
                    {editing ? "Save" : "Edit"}
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </Card.Body>
    </Card>
  );
};

export default StaffCardComponent;
