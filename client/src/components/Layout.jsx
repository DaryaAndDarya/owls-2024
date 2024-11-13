import React from "react";
import NavBar from "./ui/NavBar";
import { Outlet } from "react-router-dom";
import Container from "react-bootstrap/esm/Container";
import Loader from "../HOCs/Loader";

export default function Layout({ logoutHandler, user }) {
  return (
    <>
      <Container>
        <Loader isLoading={user.status === "logging"}>
          <NavBar logoutHandler={logoutHandler} user={user} />
          <Outlet />
        </Loader>
      </Container>
    </>
  );
}
