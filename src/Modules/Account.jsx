import React from "react";
import { Page } from "framework7-react";
import NavBar from "../pages/NavBar";

export default () => {

  return (
    <>
        <NavBar title="Inicio" />
        <Page>
            <h1>Hola cuenta</h1>
        </Page>
    </>
  );
};
