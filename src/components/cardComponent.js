import React from "react";
import { Card, Button } from "react-bootstrap";

const CardComponent = ({ item }) => {
  console.log(item);
  return (
    <Card
      style={{
        width: "200px",
        boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
        backdropFilter: "blur(10px)",
        margin: "5px",
      }}
    >
      <Card.Img
        style={{
          width: "200px",
          height: "300px",
        }}
        variant="top"
        src={item.poster_url}
        alt="Poster"
      />
      <Card.Body style={{ padding: "10px" }}>
        <Card.Title style={{ fontSize: "20px", textAlign: "center" }}>
          {item.name}
        </Card.Title>
        {/* <Card.Text style={{ textAlign: "justify" }}>
          {item.summary_text}
        </Card.Text> */}
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  );
};

export default CardComponent;
