import React, { useEffect } from "react";
import {
  Page,
  Navbar,
  NavLeft,
  NavTitle,
  NavTitleLarge,
  NavRight,
  BlockTitle,
  Block,
  Button,
  List,
  ListItem,
  Link,
  Searchbar,
  Icon,
  f7,
  theme,
} from "framework7-react";

export default ({ f7router }) => {
  const onResize = () => {
    const $el = f7.$(".page-home");
    if (f7.width >= 768) {
      $el.find(".list:not(.searchbar-not-found)").addClass("menu-list");
    } else {
      $el.find(".list:not(.searchbar-not-found)").removeClass("menu-list");
    }
  };

  const onPageAfterIn = () => {
    if (!theme.aurora) return;
    if (f7.width >= 768) {
      f7router.navigate("/about/", { reloadDetail: true });
    }
  };
  useEffect(() => {
    if (theme.aurora) {
      const $el = f7.$(".page-home");
      onResize();

      f7.on("resize", onResize);

      f7router.on("routeChange", (route) => {
        const url = route.url;
        if (!$el) return;
        const $linkEl = $el.find(`a[href="${url}"]`);
        if (!$linkEl.length) return;
        $el.find(".item-selected").removeClass("item-selected");
        $linkEl.addClass("item-selected");
      });
    }
  }, []);

  return (
    <Page className="" onPageAfterIn={onPageAfterIn}>
      <Navbar large sliding={false}>
        <NavLeft>
          <Link
            panelOpen="left"
            iconIos="f7:menu"
            iconAurora="f7:menu"
            iconMd="material:menu"
          />
        </NavLeft>
        <NavTitle sliding>Framework7 React</NavTitle>
        <NavRight>
          <Link
            searchbarEnable=".searchbar-components"
            iconIos="f7:search"
            iconAurora="f7:search"
            iconMd="material:search"
          />
        </NavRight>
        <NavTitleLarge>
          <img
            src="/images/circulo_inmobiliario_light-removebg-preview.png"
            className="display-block"
            style={{ height: "45px", justifySelf: "center"}}
          />
        </NavTitleLarge>
        <Searchbar
          className="searchbar-components"
          searchContainer=".components-list"
          searchIn="a"
          expandable
          disableButton={!theme.aurora}
        />
      </Navbar>

      <div className="content-home">
        <BlockTitle medium style={{justifyItems: "center"}}>
          Bienvenido a SISTEMA
        </BlockTitle>
        <div className="txt-center color-2">
          Hola <strong className="color-2">Nombre</strong> 👋, ¿Qué deseas hacer
          hoy?
        </div>
        <Block strong className="menu-home">
          <p>Navegación</p>
          <div className="options-grid">
            <div
              className="buttonOption"
            >
              <img src="images/reports.png" />
              Reportes
            </div>

            
            <div
              className="buttonOption"
            >
              <img src="images/archived.png" />
              Archivero
            </div>
            
          </div>

          <>
            <p>Más Opciones</p>
            <div className="options-grid">
                <div
                  className="buttonOption"
                >
                  <img src="images/users.png" />
                  Usuarios
                </div>
              <div
                className="buttonOption"
              >
                <img src="images/account.png" />
                Mi Cuenta
              </div>
            </div>
          </>
        </Block>

        <Block>
          <Button
            className="button-logout black-button"
            style={{justifySelf:"center", padding: "20px"}}
            fill
          >
            Cerrar sesión
          </Button>
        </Block>
      </div>
    </Page>
  );
};
