import React, { useEffect, useState } from "react";
import * as F7 from "framework7-react";
import ApiService from "../../utils/ApiService";
import * as HI from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import AjaxService from "../../utils/AjaxService.js";

const usersService = new ApiService("users", false);

export default ({ setIsLogged }) => {
  const [state, setState] = useState({
    username: "",
    password: "",
  });

  const login = async (e) => {
    e.preventDefault();
    U.LOADING(true, "Iniciando sesión...");
    try {
      const authResult = {
        data : {
          id : 1,
          password : ""
        }
      }
      if (authResult.status === 201) {
        U.LOADING(false);
        return U.TOAST(authResult.msg, false);
      } else {
        U.TOKEN.set(authResult.data);
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const loginCode = () => {
    U.$app.$f7.dialog.prompt(
      "🔒 Ingresa tu código de acceso",
      "",
      async (value) => {
        if (value.length === 8 && /^[A-Z0-9]{8}$/.test(value)) {
          U.LOADING(true, "Iniciando sesión...");
          const authResult = await usersService.cloudFunction("authCode", {
            code: value,
          });
          if (authResult.status === 201) {
            U.LOADING(false);
            return U.TOAST(authResult.msg, false);
          } else {
            U.TOKEN.set(authResult.data);
            window.location.reload();
          }
        } else {
          U.TOAST("Ingresa un código de acceso válido para continuar");
        }
      }
    );
  };

  return (
    <F7.LoginScreen id="login-screen" opened>
      <F7.View>
        <F7.Navbar className="navbar-aside asideNavbar">
          <F7.NavTitle className="logoAside logoAsideCenter">
            <img src="images/circulo_inmobiliario.jfif" />
          </F7.NavTitle>
        </F7.Navbar>
        <F7.Page>
          <F7.Block className="boxed center-xy">
            <div>
              <F7.BlockTitle className="txt-center" medium>
                Iniciar Sesión
              </F7.BlockTitle>

              <form onSubmit={login}>
                <F7.List>
                  <F7.ListInput
                    label="Usuario"
                    type="text"
                    placeholder="Ingresa tu Usuario"
                    value={state.username}
                    required
                    onInput={(e) => {
                      setState({ ...state, username: e.target.value });
                    }}
                  />
                  <F7.ListInput
                    label="Contraseña"
                    type="password"
                    placeholder="Ingresa tu Contraseña"
                    value={state.password}
                    required
                    onInput={(e) => {
                      setState({ ...state, password: e.target.value });
                    }}
                  />
                </F7.List>
                <F7.List>
                  <button
                    className="button button-fill withIcon"
                    type="submit"
                    style={{ width: "100%", "max-width": "320px" }}
                  >
                    <HugeiconsIcon icon={HI.SentIcon} />
                    Iniciar Sesión
                  </button>
                  <br />
                </F7.List>
              </form>

              <F7.BlockHeader className="txt-center">
                ó mediante tu código de acceso
              </F7.BlockHeader>
              <F7.Button
                className="withIcon button-white ripple-color-black no-shadow hueIcon"
                white
                onClick={loginCode}
                fill
                style={{
                  width: "178px",
                }}
              >
                <>
                  <HugeiconsIcon slot="media" icon={HI.LockPasswordIcon} />
                </>
                Entrar con código
              </F7.Button>
              <br />

              <F7.BlockFooter>
                © 2025 SISTEMA | Todos los derechos reservados.
              </F7.BlockFooter>
            </div>
          </F7.Block>
        </F7.Page>
      </F7.View>
    </F7.LoginScreen>
  );
};
