import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";

export default function SignUpPage({ signUpHandler }) {
  return (
    <Form onSubmit={signUpHandler}>
      <Form.Group>
        <Form.Label> Name</Form.Label>
        <Form.Control type="text" name="name" placeholder="Name" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          name="email"
          placeholder="name@example.com"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formPlaintextPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" name="password" placeholder="Password" />
        <Button type="submit" variant="dark">
          Подтвердить
        </Button>
      </Form.Group>
    </Form>
  );
}
