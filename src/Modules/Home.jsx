import React, { useEffect } from "react";
import { Page, Block, Button } from "framework7-react";
import * as F7 from "framework7-react";
import NavBar from "../pages/NavBar";
import { TOKEN, TOAST, uniqid, SET_IN, DATE_TIME, ALLOW_ROLE, LOGOUT } from "../utils/lib/utils";

export default () => {
  const TKN = TOKEN.get();

  return (
    <>
      <NavBar title="Inicio" />
      <Page>
        <F7.BlockTitle className="txt-center color-2" medium>
          Bienvenido a SISTEMA
        </F7.BlockTitle>
        <div className="txt-center color-2">
          Hola <strong className="color-2">Nombre</strong> 👋, ¿Qué deseas hacer
          hoy?
        </div>
        <Block strong className="menu-home">
          <p>Navegación</p>
          <div className="options-grid">
            {ALLOW_ROLE(["ADMIN"], "ADMIN") ? (
              <div
                className="buttonOption"
                onClick={() => {
                  alert("En Construcción");
                  // U.NAVIGATE("reports")
                }}
              >
                <img src="images/reports.png" />
                Reportes
              </div>
            ) : null}

            {ALLOW_ROLE(["ADMIN", "MANAGER"], "ADMIN") ? (
              <div
                className="buttonOption"
                onClick={() => {
                  alert("En Construcción");
                  // U.NAVIGATE("archived")
                }}
              >
                <img src="images/archived.png" />
                Archivero
              </div>
            ) : null}
          </div>

          {["ADMIN"].includes("ADMIN") && (
            <>
              <p>Más Opciones</p>
              <div className="options-grid">
                {["ADMIN"].includes("ADMIN") && (
                  <div
                    className="buttonOption"
                    onClick={() => {
                      NAVIGATE("users");
                    }}
                  >
                    <img src="images/users.png" />
                    Usuarios
                  </div>
                )}
                <div
                  className="buttonOption"
                  onClick={() => {
                    alert("En Construcción");
                    // U.NAVIGATE("account")
                  }}
                >
                  <img src="images/account.png" />
                  Mi Cuenta
                </div>
              </div>
            </>
          )}
        </Block>

        <Block>
          <Button
            className="button-logout black-button"
            style={{justifySelf:"center", padding: "20px"}}
            onClick={() => {
              LOGOUT();
            }}
            fill
          >
            Cerrar sesión
          </Button>
        </Block>
      </Page>
    </>
  );
};
