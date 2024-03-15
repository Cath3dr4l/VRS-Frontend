import React from "react";
import { Card, Button } from "react-bootstrap";

const CardComponent = () => {
  return (
    <Card style={{ width: "18rem", backgroundColor: "white" }}>
      <Card.Img
        variant="top"
        src="https://via.placeholder.com/150"
        alt="Card image cap"
      />
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  );
};

export default CardComponent;
