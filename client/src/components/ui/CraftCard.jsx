import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import * as Icon from "react-bootstrap-icons";
import CraftUpdateForm from "./CraftUpdateForm";
import { Link } from "react-router-dom";
export default function CraftCard({
  craft,
  updateHandler,
  deleteHandler,
  user,
}) {


  const [show, setShow] = useState(false);
  return (
    <Col className="d-flex justify-content-center">
      <Card
        style={{
          width: "18rem",
          display: "flex",
          flexDirection: "center",
          margin: "10px",
        }}
      >
        <Card.Img variant="top" src={`/img/${craft.url}`}  />
        <Card.Body>
          <Card.Title>{craft.title}</Card.Title>
          <Card.Text>Смастерил: {craft?.User?.name}</Card.Text>
          <ButtonGroup size="sm">
            {user.status === "logged" && user.data.id === craft.userId && (
              <>
                <Button
                  onClick={() => setShow((prev) => !prev)}
                  variant="light"
                >
                  {show ? <Icon.X /> : <Icon.Pencil />}
                </Button>
                <Button onClick={() => deleteHandler(craft.id)} variant="light">
                  <Icon.Trash />
                </Button>
              </>
            )}

            <Button variant="light">
              <Link to={`/onecraft/${craft.id}`}>
                <Icon.ArrowRight />
              </Link>
            </Button>
          </ButtonGroup>
          {show && (
            <CraftUpdateForm craft={craft} updateHandler={updateHandler} />
          )}
        </Card.Body>
      </Card>
    </Col>
  );
}
