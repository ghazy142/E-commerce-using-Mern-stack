import React from "react";
import { Card } from "react-bootstrap";
import Rating from "./Rating";
import { Link } from "react-router-dom";

export default function Product({ singleItem }) {
  return (
    <div>
      <Card className="my-3 p-3 rounded">
        <Link to={`/product/${singleItem._id}`}>
          <Card.Img src={singleItem.img} variant="top" />
        </Link>

        <Card.Body>
          <Link to={`/product/${singleItem._id}`}>
            <Card.Title as="div">
              <strong>{singleItem.title}</strong>
            </Card.Title>
          </Link>

          <Card.Text as="p">{singleItem.about}</Card.Text>

          <Card.Text as="h3">${singleItem.price}</Card.Text>

          <Rating value={singleItem.rating} />
        </Card.Body>
      </Card>
    </div>
  );
}