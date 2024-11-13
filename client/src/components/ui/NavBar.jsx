import React from "react";
import * as Icon from "react-bootstrap-icons";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/esm/Button";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";

export default function NavBar({ logoutHandler, user }) {
  console.log(user);

  return (
    <Navbar bg="light" data-bs-theme="light">
      <Container>
        <Navbar.Brand>
          {user.status === "logged" ? user?.data.name : "Гость"}
        </Navbar.Brand>
        <Nav className="me-auto">
          <NavLink className="nav-link" to={"/"}>
            {" "}
            Главная
          </NavLink>
          <NavLink className="nav-link" to={"/craft"}>
            {" "}
            Изделия
          </NavLink>
          <NavLink className="nav-link" to={"/newcraft"}>
            {" "}
            <Icon.PlusCircleDotted />
          </NavLink>
          {user.status !== "logged" && (
            <>
              <NavLink className="nav-link" to={"/signup"}>
                {" "}
                Регистрация
              </NavLink>
              <NavLink className="nav-link" to={"/login"}>
                {" "}
                Вход
              </NavLink>
            </>
          )}
        </Nav>
          {user.status === "logged" && (
            <Button variant="light"  onClick={logoutHandler} >
              {" "}
              Выйти
            </Button>
          )}
      </Container>
    </Navbar>
  );
}
