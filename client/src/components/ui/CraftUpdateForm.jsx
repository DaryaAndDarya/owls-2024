import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import * as Icon from 'react-bootstrap-icons';

export default function CraftUpdateForm({ updateHandler, craft }) {
  return (
    <>
      <Form onSubmit={(event) => updateHandler(event, craft.id)}>
        <Form.Control
          name="title"
          defaultValue={craft?.title}
          type="text"
          placeholder="Title"
        />
        <Form.Control
          name="desc"
          defaultValue={craft?.desc}
          type="text"
          placeholder="Desc"
        />
        <Form.Control
          name="url"
          defaultValue={craft?.url}
          type="text"
          placeholder="URL"
        />
        <Button type="submit" variant="light">
        <Icon.Save />
        </Button>
      </Form>
    </>
  );
}
