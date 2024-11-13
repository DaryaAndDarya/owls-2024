import axios from "axios";
import React, { useEffect, useState } from "react";
import * as Icon from "react-bootstrap-icons";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import { Link, useParams } from "react-router-dom";

export default function CraftOneCard() {
  const [craft, setCraft] = useState({ title: "", desc: "", url: "" });
  const { craftId } = useParams();
  useEffect(() => {
    axios.get(`/api/craft/${craftId}`).then((res) => setCraft(res.data));
  }, []);

  return (
    <Col className="d-flex justify-content-center">
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={`/img/${craft.url}`} />
        <Card.Body>
          <Card.Title>{craft.title}</Card.Title>
          <Card.Text>{craft.desc}</Card.Text>
          <Button variant="light">
            <Link to={"/craft"}><Icon.ArrowLeft /></Link>
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
}
