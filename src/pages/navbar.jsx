import React, { useEffect, useState, useRef } from "react";
import {
  Navbar,
  NavRight,
  NavLeft,
  NavTitle,
  Link,
  Button,
  Popup,
} from "framework7-react";

export default (props) => {
  const newLeands = useRef(null);
  const [closePopupRef, setClosePopupRef] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 1024); // Estado para el tamaño de la pantalla

  const addLeads = () => {
    setClosePopupRef(false);
    newLeands.current.open();
  };

  const closePopup = () => {
    setClosePopupRef(true);
    newLeands.current.close();
  };

  // Manejar el cambio de tamaño de la ventana
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 1024);
    };

    window.addEventListener("resize", handleResize);

    // Limpieza del evento al desmontar el componente
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <Navbar>
        {isSmallScreen && ( // Mostrar NavLeft solo si la pantalla es menor a 1024px
          <>
            <NavLeft>
              <Link iconIos="f7:menu" iconMd="material:menu" panelOpen="left" />
            </NavLeft>
            <NavTitle className="logoAside logo-header-root">
              <img src="images/circulo_inmobiliario_light-removebg-preview.png" />
            </NavTitle>
          </>
        )}
        <NavRight className="right-section-navbar">
          <Link panelOpen="left" className="iconProfileHeader">
            X
          </Link>
        </NavRight>
      </Navbar>
    </>
  );
};
