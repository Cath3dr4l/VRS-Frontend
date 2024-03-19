import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const CardComponent = ({ item }) => {
  return (
    <Link to={`/movie/${item._id}`} style={{ textDecoration: "none"}}>
      <Card
        style={{
          width: "200px",
          // boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
          // backdropFilter: "blur(10px)",
          margin: "5px",
          backgroundColor: "white",
          borderRadius: "7px",
        }}
      >
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
            style={{
              color: "black",
              fontSize: "20px",
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
