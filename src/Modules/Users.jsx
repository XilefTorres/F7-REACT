// -------
import React, { useEffect, useState } from "react";
import {
  Page,
  Button,
  Chip,
  Icon,
  Searchbar,
  List as F7List,
  ListItem,
  Block,
  BlockTitle,
  Popup,
  Navbar,
  NavRight,
  Link,
  ListInput,
  f7,
} from "framework7-react";
import * as HI from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import NavBar from "../pages/NavBar";
import AjaxService from "../utils/lib/AjaxService.js";
import { TOKEN, TOAST, uniqid, SET_IN, DATE_TIME } from "../utils/lib/utils";
// -------

import EmptyDoodle from "../components/Generic/EmptyDoodle.jsx";
import List from "../components/Generic/List.jsx";
import ListButton from "../components/Generic/ListButton.jsx";
import Form from "../components/Generic/Form.jsx";

export default () => {
  const TKN = TOKEN.get();
  console.log("TKN", TKN);
  const [config, setConfig] = useState({
    id: uniqid(),
    singular: "Usuario",
    plural: "Usuarios",
    grammar: "MALE", // "MALE" | "FEMALE"
    service: new AjaxService(true),
    isLoading: true,
    total: 0,
    lists: {
      users: [],
    },
    searchFilter: () => {
      // FN por roles en este caso no aplica
      return {
        table: "users",
        where: { status: 1 },
        orderBy: "id desc",
      };
    },
    onSearch: (searchedData) => {
      setConfig((prev) => SET_IN(prev, "lists.users", searchedData));
    },
    popups: {
      users: {
        id: uniqid(),
        isOpen: false,
        tableConfig: "users",
        data: {},
        open: (data = {}) =>
          setConfig((p) =>
            SET_IN(p, "popups.users", {
              isOpen: true,
              data: data,
            })
          ),
        close: () =>
          setConfig((p) =>
            SET_IN(p, "popups.users", {
              isOpen: false,
              data: {},
            })
          ),
        onSubmit: (body) => {
          if (body.allowPipes === "") {
            TOAST("Asigna un Pipe para continuar");
            return false;
          }
          return true;
        },
        onOpen: (data) => {},
        onSubmited: (updatedData, isUpdate) => {
          if (isUpdate) {
            setConfig((prev) => ({
              ...prev,
              lists: {
                ...prev.lists,
                users: prev.lists.users.map((user) =>
                  user.id === updatedData.id ? updatedData : user
                ),
              },
            }));
          } else {
            setConfig((prev) => ({
              ...prev,
              lists: {
                ...prev.lists,
                users: [updatedData, ...prev.lists.users],
              },
            }));
          }
        },
      },
    },
    load: async () => {
      return
      LOADING(true, `Cargando ${config.plural}...`);

      await config.service.cmd("orders", "updateStatus", {
        idOrder: 5,
        status: 2,
      });

      const response = await config.service.get("users");

      console.log("response", response);
      const users = response.users;
      const total = response.count;

      const newData = {
        total,
        isLoading: false,
        lists: {
          users,
        },
      };
      setConfig((prev) => ({
        ...prev,
        ...newData,
      }));

      setTimeout(() => {
        LOADING(false);
      }, 500);
    },
  });

  useEffect(() => {
    config.load();
  }, []);

  async function login(user, password, email, phone) {
    console.log(user, password, email, phone)
    if (!user || !password || !email || !phone) {
      throw new Error("Todos los campos son obligatorios.");
    }

    try {
      const response = await fetch("", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          user,
          password,
          email,
          phone
        })
      });

      if (!response.ok) {
        throw new Error("Error al iniciar sesión. Verifica tus datos.");
      }

      const data = await response.json();
      return data;

    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  
  async function handleSubmit(e) {
    e.preventDefault();
    
    const form = document.querySelector('#user-form');
    const formData = new FormData(form);
    
    const nombre = formData.get('name');
    const contraseña = formData.get('password');
    const correo = formData.get('email');
    const telefono = formData.get('phone');
    
    try {
      await login(nombre, contraseña, correo, telefono );
    } catch (err) {
      TOAST("Algo salió mal")
    }
  }

  return (
    <>
      <NavBar />
      <Page>
        <>
          <div className="header-users">
            <div className="header-left">
              <h1>Usuarios</h1>

              <div className="counter">
                <Chip text="11" mediaBgColor="green">
                  <Icon slot="media" ios="f7:person" md="material:person" />
                </Chip>
              </div>
            </div>

            <div>
              <Button className="add-user-btn" popupOpen=".demo-popup-swipe">
                <Icon material="person_add" style={{marginRight: "7px"}}></Icon>
                Agregar usuario
              </Button>
            </div>
          </div>

          <br/>

          <div className="user-list">
            <Searchbar
              className="searchbar-users"
              searchContainer=".search-list"
              searchIn=".item-title"
              placeholder="Buscar"
              disableButton={false}
              inline
            ></Searchbar>
            <F7List>
              <ListItem title="Lista de usuarios" className="list-label"></ListItem>
            </F7List>
            <F7List className="searchbar-not-found">
              <ListItem title="No se encontró"></ListItem>
            </F7List>
            <F7List className="search-list searchbar-found">
              <ListItem title="Acura"></ListItem>
              <ListItem title="Audi"></ListItem>
              <ListItem title="BMW"></ListItem>
            </F7List>
          </div>

        </>
        {!config.isLoading ? (
          <>
            {config.lists.users.length > 0 ? (
              <List
                key="list-users"
                config={config}
                setConfig={setConfig}
                add={config.popups.users.open}
                icons={{
                  add: HI.UserAdd02Icon,
                  total: HI.UserIcon,
                }}
                widthAdd={180}
              >
                {config.lists.users.map((data, index) => (
                  <div className="table-body-row link" key={data.id}>
                    <div className="title-body-table">
                      <div
                        className="cell-1"
                        style={{
                          width: "30px",
                        }}
                      >
                        # {data.id}
                      </div>

                      <div
                        className="cell-1"
                        style={{
                          width: "120px",
                        }}
                      >
                        {data.name}
                      </div>

                      <div
                        className="cell-1"
                        style={{
                          width: "80px",
                        }}
                      >
                        {data.code}
                      </div>

                      <div className="button-actions-row">
                        <ListButton
                          config={{
                            text: "Copiar Código de Acceso",
                            onClick: () => {
                              //   copy(data);
                            },
                            icon: HI.LockPasswordIcon,
                          }}
                        />

                        <ListButton
                          config={{
                            text: "Editar " + config.singular,
                            onClick: () => {
                              //   config.popups.users.open(data);
                            },
                            icon: HI.Edit02Icon,
                          }}
                        />

                        <ListButton
                          config={{
                            text: "⚠️ Eliminar " + config.singular + " ⚠️",
                            onClick: () => {
                              //   alert("En Construcción");
                            },
                            icon: HI.Delete02Icon,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </List>
            ) : (
              <>
                <Block className="p0">
                  <EmptyDoodle
                    config={config}
                    popup={config.popups.users}
                    doodle="users.svg"
                  />
                </Block>
              </>
            )}
          </>
        ) : null}

        <Form
          config={config}
          isOpen={config.popups.users.isOpen}
          keyPopup={"users"}
          uiInputs={{
            0: [
              (body, setBody) => (
                <ListInput
                  label={"Sucursale asignada:"}
                  type={"select"}
                  floatingLabel
                  required
                  outline
                  value={body.companyId}
                  onInput={(e) =>
                    setBody({
                      ...body,
                      companyId: e.target.value,
                    })
                  }
                >
                  <option value=""></option>
                  <option value="COMPANY_1">COMPAÑIA 1</option>
                  <option value="COMPANY_1">COMPAÑIA 2</option>
                </ListInput>
              ),
            ],
          }}
          initialValues={{
            createdAt: DATE_TIME(),
            code: uniqid(),
            // companyId: TKN.companyId,
          }}
        />

        <Popup className="demo-popup-swipe" swipeToClose>
          <Page>
            <Navbar title="Agregar usuario" className="modal-title">
              <NavRight>
                <Link popupClose>Cerrar</Link>
              </NavRight>
            </Navbar>

            <BlockTitle className="txt-center color-2" medium>
              Registra tu usuario
            </BlockTitle>
            <div
              className="display-flex justify-content-center align-items-center"
            >
              <F7List strongIos outlineIos dividersIos form formStoreData 
                id="user-form" className="modal-form" onSubmit={handleSubmit}>
                <ListInput 
                  label="Nombre" 
                  name="name" 
                  type="text" 
                  clearButton 
                  validate
                  required
                  floatingLabel={true}
                  outline={true}
                  placeholder="Su nombre" 
                  ignoreStoreData/>
                <ListInput
                  label="Contraseña"
                  name="password"
                  type="password"
                  validate
                  required
                  floatingLabel={true}
                  outline={true}
                  minlength={6}
                  placeholder="Su contraseña"
                  ignoreStoreData
                />
                <ListInput 
                  label="Correo electronico" 
                  name="email" 
                  type="email" 
                  clearButton
                  validate
                  required
                  floatingLabel={true}
                  outline={true}
                  placeholder="Su correo electronico" 
                  ignoreStoreData/>
                <ListInput
                  label="Telefono"
                  name="phone"
                  type="tel"
                  clearButton
                  validate
                  required
                  floatingLabel={true}
                  outline={true}
                  maxlength={15}
                  minlength={10}
                  pattern="[0-9]*"
                  placeholder="Numero telefonico"
                  ignoreStoreData
                />
                <br />
                <Button className="add-user-btn" type="submit">
                  Guardar usuario
                </Button>
              </F7List>
            </div>

          </Page>
        </Popup>
      </Page>
    </>
  );
};
