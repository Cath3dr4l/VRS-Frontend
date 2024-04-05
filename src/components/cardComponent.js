import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMoneyBillWave,
  faHandHoldingUsd,
} from "@fortawesome/free-solid-svg-icons";

const CardComponent = ({ item }) => {
  return (
    <Link to={`/movie/${item._id}`} style={{ textDecoration: "none" }}>
      <Card
        className="relative bg-white/30 w-[200px] m-[5px] transition-property duration-300 ease-in-out hover:bg-white/50 hover:w-[400px] hover:shadow-lg hover:z-[45]"
        style={{
          // boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
          // backdropFilter: "blur(10px)",
          // margin: "5px",
          borderRadius: "7px",
        }}
      >
        <div className="absolute w-full h-full flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity hover:delay-[200ms] ease-in duration-in-500">
          <div className="flex flex-col items-start w-[50%] h-[300px] translate-x-[100px] text-white text-xl px-4">
            <span className="text-wrap overflow-hidden  line-clamp-6">
              {item.summary_text}
            </span>
            <p className="font-semibold mt-7">
              <FontAwesomeIcon icon={faMoneyBillWave} /> Buy: ₹{item.buy_price}
            </p>
            <p className="font-semibold my-1">
              <FontAwesomeIcon icon={faHandHoldingUsd} /> Rent: ₹
              {item.rent_price}
            </p>
          </div>
        </div>
        <Card.Img
          style={{
            width: "200px",
            height: "300px",
            overflow: "hidden",
            // borderRadius: "7px",
          }}
          variant="top"
          src={item.poster_url}
          alt="Poster"
        />
        <Card.Body style={{ padding: "10px" }}>
          <Card.Title
            className="text-white font-semibold text-xl mx-2"
            style={{
              textAlign: "center",
              textOverflow: "ellipsis",
              overflow: "hidden",
              whiteSpace: "nowrap",
            }}
          >
            {item.name}
          </Card.Title>
        </Card.Body>
      </Card>
    </Link>
  );
};

export default CardComponent;
