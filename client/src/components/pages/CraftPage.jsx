import React, { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import CraftCard from "../ui/CraftCard";
import Container from "react-bootstrap/esm/Container";
import axios from "axios";
import axiosInstance from "../../api/axiosInstance";
export default function CraftPage({user}) {
  const [currentCraft, setCurrentCraft] = useState([]);
  useEffect(() => {
    try {
      fetch("/api/craft")
        .then((res) => res.json())
        .then((data) => {
          setCurrentCraft(data);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const deleteHandler = async (id) => {
    try {
      const res = await axiosInstance.delete(`/craft/${id}`);
      if (res.status === 200) {
        setCurrentCraft((prev) => prev.filter((el) => el.id !== id));
      }
    } catch (error) {
      console.log(error);
      alert("Что-то пошло не так");
    }
  };

  const updateHandler = async (event, craftId) => {
    try {
      event.preventDefault();
      const dataFromForm = event.target;
      const newDataFromForm = new FormData(dataFromForm);
      const dataForApi = Object.fromEntries(newDataFromForm);
      if (!dataForApi.title || !dataForApi.desc || !dataForApi.url) {
        alert("Необходимо заполнить все поля!");
        return;
      }
      const response = await axiosInstance.put(`/craft/${craftId}`, dataForApi);
      const newCraft = await response.data;
      console.log(newCraft, craftId);
      setCurrentCraft((prev) =>
        prev.map((el) => (el.id === craftId ? newCraft : el))
      );
      event.target.reset();
    } catch (error) {
      console.log(error);
      if (error.response.status === 400) {
        alert("Необходимо заполнить все поля!");
      }
    }
  };
  return (
    <>
      <Container className="d-flex justify-content-center align-items-center mt-5">
        <Row>
          {currentCraft.map((el) => (
            <CraftCard
              key={el.id}
              craft={el}
              updateHandler={updateHandler}
              deleteHandler={deleteHandler}
              user={user}
            />
          ))}
        </Row>
      </Container>
    </>
  );
}
