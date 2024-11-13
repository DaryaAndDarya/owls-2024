import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import * as Icon from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Container from "react-bootstrap/esm/Container";
import axiosInstance from "../../api/axiosInstance";

export default function CraftAddForm() {
  const navigate = useNavigate();
  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const dataFromForm = event.target;
      const newDataFromForm = new FormData(dataFromForm);
      const dataForApi = Object.fromEntries(newDataFromForm);
      if (!dataForApi.title || !dataForApi.desc || !dataForApi.file) {
        alert("Не все поля заполнены");
        return;
      }
      console.log(dataForApi);
      
      const dataFile = new FormData();
      dataFile.append('title', dataForApi.title);
      dataFile.append('desc', dataForApi.desc);
      dataFile.append('file', dataForApi.file);
      console.log(dataFile);
      
      await axiosInstance.post("/craft", dataFile);
      navigate("/craft");
      event.target.reset(); // очистка формы
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container className="d-flex justify-content-center align-items-center mt-5">
      <Form onSubmit={submitHandler}  className="d-flex flex-column">
        <Form.Control
          name="title"
          type="text"
          placeholder="Название"
          className="mb-3"
        />
        <Form.Control
          name="desc"
          type="text"
          placeholder="Описание"
          className="mb-3"
        />
        <Form.Control
          name="file"
          type="file"
          placeholder="Загрузите изображение"
          className="mb-3"
        />
        <Button type="submit" variant="light" className="mb-3 center ">
        <Icon.Save />
        </Button>
      </Form>
    </Container>
  );
}
