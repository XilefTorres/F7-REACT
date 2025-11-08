import React, { useState } from "react";
import * as F7 from "framework7-react";
import { TOAST } from "@/utils/utils.js";

import SmartSelectListItem from "../components/SmartSelectListItem.jsx";

export default () => {
  const [people, setPeople] = useState([
    {
      name: "Juan Pérez",
      phone: "+52 668 123 4567",
      role: "Manager",
      registered: new Date().toLocaleDateString("es-ES"),
      avatar: "https://xsgames.co/randomusers/assets/avatars/male/1.jpg",
    },
    {
      name: "María García",
      phone: "+52 668 987 6543",
      role: "Developer",
      registered: new Date().toLocaleDateString("es-ES"),
      avatar: "https://xsgames.co/randomusers/assets/avatars/female/1.jpg",
    },
    {
      name: "José Hernández",
      phone: "+52 668 555 5555",
      role: "Designer",
      registered: new Date().toLocaleDateString("es-ES"),
      avatar: "https://xsgames.co/randomusers/assets/avatars/male/2.jpg",
    },
    {
      name: "Ana López",
      phone: "+52 668 111 2222",
      role: "Tester",
      registered: new Date().toLocaleDateString("es-ES"),
      avatar: "https://xsgames.co/randomusers/assets/avatars/female/2.jpg",
    },
    {
      name: "Carlos Martínez",
      phone: "+52 668 444 3333",
      role: "CEO",
      registered: new Date().toLocaleDateString("es-ES"),
      avatar: "https://xsgames.co/randomusers/assets/avatars/male/3.jpg",
    },
    {
      name: "Juan Pérez",
      phone: "+52 668 123 4567",
      role: "Manager",
      registered: new Date().toLocaleDateString("es-ES"),
      avatar: "https://xsgames.co/randomusers/assets/avatars/male/4.jpg",
    },
    {
      name: "María García",
      phone: "+52 668 987 6543",
      role: "Developer",
      registered: new Date().toLocaleDateString("es-ES"),
      avatar: "https://xsgames.co/randomusers/assets/avatars/female/4.jpg",
    },
    {
      name: "José Hernández",
      phone: "+52 668 555 5555",
      role: "Designer",
      registered: new Date().toLocaleDateString("es-ES"),
      avatar: "https://xsgames.co/randomusers/assets/avatars/male/5.jpg",
    },
    {
      name: "Ana López",
      phone: "+52 668 111 2222",
      role: "Tester",
      registered: new Date().toLocaleDateString("es-ES"),
      avatar: "https://xsgames.co/randomusers/assets/avatars/female/5.jpg",
    },
    {
      name: "Carlos Martínez",
      phone: "+52 668 444 3333",
      role: "CEO",
      registered: new Date().toLocaleDateString("es-ES"),
      avatar: "https://xsgames.co/randomusers/assets/avatars/male/6.jpg",
    },
  ]);

  const estatusOptions = [
    {
      label: "Estatus",
      items: [
        { value: "LEADS", label: "Activos", selected: true },
        { value: "PROJECTS", label: "Archivados" },
      ],
    },
  ];

  const columnasOptions = [
    {
      label: "Columnas",
      items: [
        { value: "1", label: "Foto" },
        { value: "2", label: "Nombre" },
        { value: "3", label: "Whatsapp" },
        { value: "4", label: "Solo Pc" },
        { value: "5", label: "Rol" },
        { value: "6", label: "Fecha Registro" },
        { value: "7", label: "Estatus" },
      ],
    },
  ];

  const ordenarOptions = [
    {
      label: "Ordenar",
      items: [
        { value: "2", label: "Por Fecha Registro" },
        { value: "1", label: "Por Nombre" },
        { value: "7", label: "Por Estatus" },
      ],
    },
  ];

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
    <F7.Page>
      <F7.Navbar
        children={
          <>
            <F7.NavLeft
              children={
                <F7.Link iconMd="material:arrow_back" tooltip="Volver" back />
              }
            />
            <F7.NavTitle
              title="Lista de Usuarios"
              subtitle="344 Usuarios Registrados"
            />

            <F7.NavRight
              children={
                <F7.Link
                  searchbarEnable=".searchbar-users"
                  iconMd="material:search"
                  tooltip="Buscar Usuario"
                />
              }
            />

            <F7.Searchbar
              placeholder="Buscar usuarios..."
              className="searchbar-users"
              searchContainer=".components-list"
              searchIn=".label-cell, .cell-id, .image-cell"
              expandable
            />
          </>
        }
      />
      <F7.Toolbar
        bottom
        children={
          <>
            <F7.Link
              iconMd="material:keyboard_double_arrow_left"
              rippleColor="white"
              tooltip="Página anterior"
            />
            <div className="page-numbers">
              <F7.Link rippleColor="white" tooltip="Página 1" children={"1"} />
              <F7.Link rippleColor="white" tooltip="Página 1" children={"2"} />
              <F7.Link
                rippleColor="white"
                tooltip="Página 1"
                children={". . ."}
              />
              <F7.Link rippleColor="white" tooltip="Página 1" children={"5"} />
              <F7.Link
                rippleColor="white"
                tooltip="Página 6"
                children={"6"}
                className="active-page-number"
              />
              <F7.Link rippleColor="white" tooltip="Página 1" children={"7"} />
              <F7.Link
                rippleColor="white"
                tooltip="Página 1"
                children={". . ."}
              />
              <F7.Link rippleColor="white" tooltip="Página 8" children={"8"} />
              <F7.Link rippleColor="white" tooltip="Página 1" children={"11"} />
            </div>
            <F7.Link
              iconMd="material:keyboard_double_arrow_right"
              rippleColor="white"
              tooltip="Página siguiente"
            />
          </>
        }
      />

      <F7.List className="searchbar-not-found">
        <F7.ListItem title="Nothing found" />
      </F7.List>
      <div
        className="data-table data-table-init card"
        children={
          <>
            <div
              className="card-header"
              children={
                <>
                  <div
                    className="data-table-links"
                    children={
                      <>
                        <F7.Button
                          raised
                          fill
                          link
                          popupOpen=".demo-popup-swipe"
                          iconMd="material:person_add"
                          className="elevation-hover-6 elevation-pressed-1 elevation-transition"
                          text="Nuevo Usuario"
                        />
                      </>
                    }
                  />

                  <div
                    className="data-table-actions"
                    children={
                      <>
                        <F7.Button
                          link
                          className="mobile-only"
                          iconMd="material:more_vert"
                          text="Más Opciones"
                          popoverOpen=".popover-more-actions-mobile"
                        />

                        <F7.List
                          className="medium-only"
                          noChevron
                          menuList
                          children={
                            <>
                              <SmartSelectListItem
                                title="Estatus"
                                options={estatusOptions}
                                multiple
                                smartSelectParams={{
                                  openIn: "popover",
                                  on: {
                                    closed: function (e) {},
                                  },
                                }}
                              />
                            </>
                          }
                        />

                        <F7.List
                          className="medium-only"
                          noChevron
                          menuList
                          children={
                            <>
                              <SmartSelectListItem
                                title="Columnas"
                                options={columnasOptions}
                                multiple
                                smartSelectParams={{
                                  openIn: "popover",
                                  on: {
                                    closed: function (e) {},
                                  },
                                }}
                              />
                            </>
                          }
                        />

                        <F7.List
                          className="medium-only"
                          noChevron
                          menuList
                          children={
                            <>
                              <SmartSelectListItem
                                title="Ordenar"
                                options={ordenarOptions}
                                smartSelectParams={{
                                  openIn: "popover",
                                  on: {
                                    closed: function (e) {},
                                  },
                                }}
                              />
                            </>
                          }
                        />

                        <F7.Button
                          outline
                          link
                          className="medium-only"
                          iconMd="material:cloud_download"
                          // disabled
                          text="Exportar CSV"
                        />
                      </>
                    }
                  />
                </>
              }
            />
            <div
              className="card-content"
              children={
                <table
                  children={
                    <>
                      <thead
                        children={
                          <tr
                            children={
                              <>
                                {/* <th
                                  className="checkbox-cell"
                                  children={
                                    <label className="checkbox">
                                      <input type="checkbox" />
                                      <i className="icon-checkbox"></i>
                                    </label>
                                  }
                                /> */}
                                <th className="label-cell w60-cell">Folio</th>
                                <th className="label-cell w60-cell">Foto</th>
                                <th className="label-cell">Nombre</th>
                                <th className="label-cell">Whatsapp</th>
                                <th className="label-cell medium-only w120-cell">
                                  Solo PC
                                </th>
                                <th className="label-cell">Rol</th>
                                <th className="label-cell">Fecha Registro</th>
                                <th className="label-cell mobile-only w120-cell">
                                  Solo Movil
                                </th>
                                <th className="label-cell">Estatus</th>

                                {/* <th></th> */}
                              </>
                            }
                          />
                        }
                      />

                      <tbody
                        className="components-list searchbar-found"
                        children={people.map((person, index) => (
                          <tr
                            key={index}
                            onClick={(e) => {
                              if (
                                e.target.closest(".image-cell") ||
                                e.target.closest(".checkbox-cell")
                              ) {
                                return;
                              }
                              F7.f7.popover.open(
                                ".popover-actions-row",
                                e.target
                              );
                            }}
                          >
                            {/* Checkbox */}
                            {/* <td className="checkbox-cell">
                              <label className="checkbox">
                                <input type="checkbox" />
                                <i className="icon-checkbox"></i>
                              </label>
                            </td> */}

                            {/* Image */}

                            <td
                              className="image-cell w60-cell cell-id"
                              children={
                                <F7.Chip
                                  iconSize={18}
                                  // iconMd="material:check"
                                  text="# 431"
                                  color="var(--f7-theme-color)"
                                />
                              }
                            />
                            <td
                              className="image-cell w60-cell"
                              children={
                                <F7.Link
                                  popoverOpen=".popover-about"
                                  children={
                                    <img
                                      className="elevation-5"
                                      src={person.avatar}
                                      width="40"
                                    />
                                  }
                                />
                              }
                            />

                            {/* Data */}
                            <td
                              className="label-cell w150-cell"
                              children={person.name}
                            />
                            <td
                              className="label-cell w150-cell"
                              children={person.phone}
                            />
                            <td
                              className="label-cell medium-only w120-cell"
                              children={<strong> Solo PC</strong>}
                            />
                            <td
                              className="label-cell mobile-only w120-cell"
                              children={<strong> Solo Movil</strong>}
                            />
                            <td className="label-cell" children={person.role} />
                            <td
                              className="label-cell"
                              children={person.registered}
                            />
                            <td
                              className="label-cell"
                              children={
                                <>
                                  <F7.Chip
                                    iconSize={18}
                                    iconMaterial="check"
                                    // iconMd="material:check"
                                    text="Activo"
                                    color="green"
                                  />
                                  {/* <F7.Chip
                                    iconSize={18}
                                    iconMaterial="close"
                                    // iconMd="material:check"
                                    text="Inactivo"
                                    color="red"
                                  /> */}
                                </>
                              }
                            />
                          </tr>
                        ))}
                      />
                    </>
                  }
                />
              }
            ></div>
          </>
        }
      />

      <F7.Popover
        className="popover-about"
        children={
          <F7.Block
            style={{ margin: "15px 0px" }}
            children={
              <>
                <F7.BlockTitle small>Foto de Perfil</F7.BlockTitle>
                <img src="https://placehold.co/400x400" width="100%" />
              </>
            }
          />
        }
      />

      <F7.Popover
        className="popover-actions-row"
        children={
          <F7.List>
            <li class="item-divider">#412 - Juan Pérez</li>
            <F7.ListItem
              title="Ver Usuario"
              popoverClose
              link
              onClick={() => {}}
              children={<F7.Icon slot="media" md="material:list_alt" />}
            />
            <F7.ListItem
              title="Editar Usuario"
              popoverClose
              link
              onClick={() => {}}
              children={
                <F7.Icon slot="media" md="material:drive_file_rename_outline" />
              }
            />
            <F7.ListItem
              title="Archivar Usuario"
              popoverClose
              link
              onClick={() => {}}
              children={<F7.Icon slot="media" md="material:inventory_2" />}
            />
            <F7.ListItem
              textColor="red"
              title="Eliminar Usuario"
              popoverClose
              link
              onClick={() => {}}
              children={<F7.Icon slot="media" md="material:delete_outline" />}
            />
          </F7.List>
        }
      />

      <F7.Popover
        className="popover-more-actions-mobile"
        children={
          <F7.List>
            <li class="item-divider">Más Opciones</li>
            <SmartSelectListItem
              title="Estatus"
              options={estatusOptions}
              multiple
              smartSelectParams={{
                openIn: "popover",
                on: {
                  closed: function (e) {},
                },
              }}
            />

            <F7.ListItem
              title="Ver Estatus"
              popoverClose
              link
              onClick={() => {}}
              children={<F7.Icon slot="media" md="material:visibility_off" />}
            />
            <F7.ListItem
              title="Mostrar Columnas"
              popoverClose
              link
              onClick={() => {}}
              children={
                <F7.Icon slot="media" md="material:calendar_view_week" />
              }
            />
            <F7.ListItem
              title="Tipos de Orden"
              popoverClose
              link
              onClick={() => {}}
              children={<F7.Icon slot="media" md="material:swap_vert" />}
            />
          </F7.List>
        }
      />

      <F7.Popup className="demo-popup-swipe" swipeToClose>
          <F7.Page>
            <F7.Navbar title="Agregar usuario" className="modal-title">
              <F7.NavRight>
                <F7.Link popupClose>Cerrar</F7.Link>
              </F7.NavRight>
            </F7.Navbar>

            <F7.BlockTitle medium style={{justifySelf: "center", marginBottom: "-10px"}}>
              Registra tu usuario
            </F7.BlockTitle>
            <div
              className="display-flex justify-content-center"
            >
              <F7.List strongIos outlineIos dividersIos form formStoreData 
                id="user-form" className="modal-form" onSubmit={handleSubmit}>
                <F7.ListInput 
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
                <F7.ListInput
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
                <F7.ListInput 
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
                <F7.ListInput
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
                <F7.Button
                  raised
                  fill
                  link
                  type="submit"
                  popupOpen=".demo-popup-swipe"
                  className="elevation-hover-6 elevation-pressed-1 elevation-transition"
                  text="Guardar usuario"
                />
              </F7.List>
            </div>

          </F7.Page>
        </F7.Popup>
    </F7.Page>
  );
};
