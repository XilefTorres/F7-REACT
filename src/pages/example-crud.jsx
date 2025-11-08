import React, { useState } from "react";
import * as F7 from "framework7-react";

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
              searchIn="a"
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
              <F7.Link rippleColor="white" tooltip="Página 1" children={"3"} />
              <F7.Link rippleColor="white" tooltip="Página 1" children={"4"} />
              <F7.Link rippleColor="white" tooltip="Página 1" children={"5"} />
              <F7.Link
                rippleColor="white"
                tooltip="Página 6"
                children={"6"}
                className="active-page-number"
              />
              <F7.Link rippleColor="white" tooltip="Página 1" children={"7"} />
              <F7.Link rippleColor="white" tooltip="Página 8" children={"8"} />
              <F7.Link rippleColor="white" tooltip="Página 1" children={"9"} />
              <F7.Link rippleColor="white" tooltip="Página 1" children={"10"} />
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
                        />

                        <F7.List
                          className="medium-only"
                          noChevron
                          menuList
                          children={
                            <>
                              <F7.ListItem
                                smartSelect
                                smartSelectParams={{
                                  openIn: "popover",
                                  on: {
                                    closed: function (e) {},
                                  },
                                }}
                                children={
                                  <>
                                    <F7.Icon
                                      slot="media"
                                      md="material:keyboard_arrow_down"
                                    />
                                    <span className="item-title">Estatus</span>
                                    <select
                                      multiple
                                      // defaultValue={}
                                    >
                                      <optgroup label="Estatus">
                                        <option value="LEADS">Activos</option>
                                        <option value="PROJECTS">
                                          Archivados
                                        </option>
                                      </optgroup>
                                    </select>
                                  </>
                                }
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
                              <F7.ListItem
                                smartSelect
                                smartSelectParams={{
                                  openIn: "popover",
                                  on: {
                                    closed: function (e) {},
                                  },
                                }}
                                children={
                                  <>
                                    <F7.Icon
                                      slot="media"
                                      md="material:keyboard_arrow_down"
                                    />
                                    <span className="item-title">Columnas</span>
                                    <select
                                      multiple
                                      // defaultValue={}
                                    >
                                      <optgroup label="Columnas">
                                        <option value="1">Foto</option>
                                        <option value="2">Nombre</option>
                                        <option value="3">Whatsapp</option>
                                        <option value="4">Solo Pc</option>
                                        <option value="5">Rol</option>
                                        <option value="6">
                                          Fecha Registro
                                        </option>
                                        <option value="7">Estatus</option>
                                      </optgroup>
                                    </select>
                                  </>
                                }
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
                              <F7.ListItem
                                smartSelect
                                smartSelectParams={{
                                  openIn: "popover",
                                  on: {
                                    closed: function (e) {},
                                  },
                                }}
                                children={
                                  <>
                                    <F7.Icon
                                      slot="media"
                                      md="material:keyboard_arrow_down"
                                    />
                                    <span className="item-title">Ordenar</span>
                                    <select
                                    // defaultValue={}
                                    >
                                      <optgroup label="Ordenar">
                                        <option value="2">
                                          Por Fecha Registro
                                        </option>
                                        <option value="1">Por Nombre</option>
                                        <option value="7">Por Estatus</option>
                                      </optgroup>
                                    </select>
                                  </>
                                }
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
                                <th
                                  className="checkbox-cell"
                                  children={
                                    <label className="checkbox">
                                      <input type="checkbox" />
                                      <i className="icon-checkbox"></i>
                                    </label>
                                  }
                                />
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

                                <th></th>
                              </>
                            }
                          />
                        }
                      />

                      <tbody
                        className="components-list searchbar-found"
                        children={people.map((person, index) => (
                          <tr key={index}>
                            {/* Checkbox */}
                            <td className="checkbox-cell">
                              <label className="checkbox">
                                <input type="checkbox" />
                                <i className="icon-checkbox"></i>
                              </label>
                            </td>

                            {/* Image */}
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
                            <td
                              className="actions-cell"
                              children={
                                <>
                                  <F7.Link
                                    tooltip="Editar Usuario"
                                    link
                                    iconSize={26}
                                    iconMd="material:edit"
                                  />

                                  <F7.Link
                                    tooltip="Archivar Usuario"
                                    link
                                    iconSize={26}
                                    iconColor="red"
                                    iconMd="material:inventory_2"
                                  />
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
        className="popover-options-more-actions"
        children={
          <>
            <F7.List
              children={
                <>
                  <F7.ListItem
                    id="modulesUser"
                    title="Apps asignadas:"
                    smartSelect
                    smartSelectParams={{
                      openIn: "popover",
                      on: {
                        closed: function (e) {},
                      },
                    }}
                  >
                    <select
                      multiple
                      // defaultValue={}
                    >
                      <optgroup label="Estatus">
                        <option value="LEADS">👤 Leads</option>
                        <option value="PROJECTS">🗂️ Proyectos</option>
                      </optgroup>
                    </select>
                  </F7.ListItem>
                  <F7.ListItem
                    title="Activos"
                    popoverClose
                    link
                    children={
                      <F7.Icon slot="media" md="material:done_outline" />
                    }
                  />
                  <F7.ListItem
                    title="Archivados"
                    popoverClose
                    link
                    children={
                      <F7.Icon
                        color="red"
                        slot="media"
                        md="material:inventory_2"
                      />
                    }
                  />
                </>
              }
            />
          </>
        }
      />
    </F7.Page>
  );
};
