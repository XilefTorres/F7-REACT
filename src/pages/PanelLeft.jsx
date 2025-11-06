import React, { useEffect, useState, useRef } from "react";
import {
  Page,
  Navbar,
  NavTitle,
  Block,
  BlockTitle,
  List,
  ListItem,
  Link,
  Popover,
  Popup,
} from "framework7-react";
import * as U from "../utils/lib/utils";
import { HugeiconsIcon } from "@hugeicons/react";
import * as HI from "@hugeicons/core-free-icons";

export default function PanelLeftPage({ setIsLogged, company, getCompanies }) {
  const TKN = U.TOKEN.get();
  const [imageClass, setImageClass] = useState("");
  const PopupFormCompany = useRef(null);

  const avaiableUsers = ["martinfs15@gmail.com"];

  useEffect(() => {
    if (company && company.imageURL) {
      const img = new Image();
      img.src = company.imageURL;
      img.onload = () => {
        if (img.width > img.height) {
          setImageClass("width-preview");
        } else if (img.height > img.width) {
          setImageClass("height-preview");
        } else {
          setImageClass(""); // No clase para imágenes cuadradas
        }
      };
    }
  }, [company, company && company.imageURL]);

  return (
    <>
      <Page className="aside-page bg-white">
        <Navbar className="navbar-aside asideNavbar">
          <NavTitle className="logoAside">
            <img src="images/circulo_inmobiliario.jfif" />
          </NavTitle>
        </Navbar>

        <div className="aside-content">
          <Link className="account-info" popoverOpen=".popover-menu">
            <div className={"logo-account " + imageClass}>
              {company && company.imageURL && (
                <img
                  src={
                    "https://ahome.com.mx/pipe-leads/api/public/" +
                    company.imageURL
                  }
                  alt="Company Logo"
                />
              )}
            </div>
            <div className="info-account">
              <div className="info-content-account">
                <div className="title-account">Circulo inmobiliario</div>

                <div className="link-account f12">Root</div>

                <div className="link-account f12">Administrador</div>
              </div>
            </div>
            <div className="icon-change-account">
              <HugeiconsIcon slot="media" icon={HI.SquareArrowUpDownIcon} />
            </div>
          </Link>

          <BlockTitle>CIRCULO INMOBILIARIO</BlockTitle>

          <List className="menu">
            <ListItem
              panelClose
              link="/"
              title="Inicio"
              view="#main-view"
              className="active-option option-home"
            >
              <HugeiconsIcon slot="media" icon={HI.Home03Icon} />
            </ListItem>

            <ListItem
              panelClose
              link="/ownerships"
              title="Propiedades"
              view="#main-view"
              className="option-ownerships"
            >
              <HugeiconsIcon slot="media" icon={HI.Home12Icon} />
            </ListItem>

            <ListItem
              panelClose
              link="/users"
              title="Usuarios"
              view="#main-view"
              className="option-users"
            >
              <HugeiconsIcon slot="media" icon={HI.UserGroupIcon} />
            </ListItem>

            {U.ALLOW_ROLE(["ADMIN", "MANAGER"], "ADMIN") ? (
              <ListItem
                panelClose
                link="/branchoffice"
                title="Sucursales"
                view="#main-view"
                className="option-branchoffice"
              >
                <HugeiconsIcon slot="media" icon={HI.StoreLocation02Icon} />
              </ListItem>
            ) : null}

            {U.ALLOW_ROLE(["ADMIN"], "ADMIN") ? (
              <ListItem
                ListItem
                panelClose
                link="/data"
                title="Fuente de datos"
                view="#main-view"
                className="option-data"
              >
                <HugeiconsIcon slot="media" icon={HI.Database02Icon} />
              </ListItem>
            ) : null}
          </List>

          <BlockTitle>PLAZAS COMERCIALES</BlockTitle>

          <List className="menu">
            <ListItem
              panelClose
              link="/clients"
              title="Clientes"
              view="#main-view"
              className="option-clients"
            >
              <HugeiconsIcon slot="media" icon={HI.ContactBookIcon} />
            </ListItem>

            <ListItem
              panelClose
              link="/squareusers"
              title="Usuarios"
              view="#main-view"
              className="option-squareusers"
            >
              <HugeiconsIcon slot="media" icon={HI.UserGroupIcon} />
            </ListItem>
          </List>

          <BlockTitle>PROYECTOS</BlockTitle>

          <List className="menu">
            <ListItem
              panelClose
              link="/projects"
              title="Proyectos"
              view="#main-view"
              className="option-projects"
            >
              <HugeiconsIcon slot="media" icon={HI.Briefcase02Icon} />
            </ListItem>

            <ListItem
              panelClose
              link="/projUsers"
              title="Usuarios"
              view="#main-view"
              className="option-projUsers"
            >
              <HugeiconsIcon slot="media" icon={HI.UserGroupIcon} />
            </ListItem>
          </List>

          {U.ALLOW_ROLE(["ADMIN"], "ADMIN") ? (
            <BlockTitle>GENERAL</BlockTitle>
          ) : null}

          {U.ALLOW_ROLE(["ADMIN"], "ADMIN") ? (
            <List className="menu">
              {/* <ListItem
                title="Usuarios"
                link="/users"
                view="#main-view"
                className="option-users"
                panelClose
              >
                <HugeiconsIcon slot="media" icon={HI.ComputerUserIcon} />
              </ListItem> */}

              <ListItem
                title="Configuración"
                link="/settings"
                view="#main-view"
                className="option-settings"
                panelClose
              >
                <HugeiconsIcon slot="media" icon={HI.Settings02Icon} />
              </ListItem>

              <ListItem
                title="Mi Cuenta"
                link="/account"
                view="#main-view"
                className="option-account"
                panelClose
              >
                <HugeiconsIcon slot="media" icon={HI.UserAccountIcon} />
              </ListItem>
              {/* {avaiableUsers.includes(TKN.email) ? (
							<ListItem
								panelClose
								link="/customers"
								title="Super Admin"
								view="#main-view"
								className="option-logout"
							>
								<HugeiconsIcon
									slot="media"
									icon={HI.ManagerIcon}
								/>
							</ListItem>
						) : (
							<></>
						)} */}
            </List>
          ) : null}

          <List className="menu">
            <ListItem
              link="/logout"
              title="Cerrar sesión"
              panelClose
              onClick={() => {
                U.LOGOUT();
              }}
            >
              <HugeiconsIcon slot="media" icon={HI.Logout03Icon} />
            </ListItem>
          </List>

          <Block className="logout">
            <p
              className="txt-center"
              style={{ opacity: 0.65, lineHeight: "14px" }}
            >
              <strong>
                <small>SISTEMA</small> <br />
                <small>v 1.0.0-LTS</small>
              </strong>
            </p>
          </Block>
        </div>
      </Page>

      <Popover className="popover-menu">
        <List>
          {/* <ListItem link="#" title="Cambiar de empresa" popoverClose>
						<ChangeIcon slot="content-start" />
					</ListItem>

					<ListItem
						link="/onboard"
						title="Agregar empresa"
						popoverClose
					>
						<AddIcon slot="content-start" />
					</ListItem> */}

          <ListItem link="#" onClick={null} title="Editar empresa" popoverClose>
            <HugeiconsIcon slot="media" icon={HI.StoreManagement02Icon} />
          </ListItem>
          <ListItem link="#" onClick={null} title="COMPRA TOTAL" popoverClose>
            <HugeiconsIcon slot="media" icon={HI.ArrowRightDoubleIcon} />
          </ListItem>
          <ListItem
            link="#"
            onClick={null}
            title="MI OTRA EMPRESA"
            popoverClose
          >
            <HugeiconsIcon slot="media" icon={HI.ArrowRightDoubleIcon} />
          </ListItem>
          <ListItem
            link="#"
            onClick={null}
            title="Agregar empresa"
            popoverClose
          >
            <HugeiconsIcon slot="media" icon={HI.StoreAdd02Icon} />
          </ListItem>
        </List>
      </Popover>
    </>
  );
}
