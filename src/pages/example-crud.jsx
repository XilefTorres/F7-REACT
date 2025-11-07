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
              className="searchbar-users"
              placeholder="Buscar usuarios..."
              expandable
              searchContainer=".search-list"
              searchIn=".item-title"
            />
          </>
        }
      />
      <F7.Toolbar
        bottom
        children={
          <>
            <F7.Link>Anterior</F7.Link>
            <F7.Link popoverOpen=".popover-about">Siguiente</F7.Link>
          </>
        }
      />

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
                        <F7.Button
                          link
                          className="medium-only"
                          iconMd="material:keyboard_arrow_down"
                          text="Estatus"
                        />
                        <F7.Button
                          link
                          className="medium-only"
                          iconMd="material:keyboard_arrow_down"
                          text="Columnas"
                        />
                        <F7.Button
                          link
                          className="medium-only"
                          iconMd="material:keyboard_arrow_down"
                          text="Ordenar"
                        />
                        <F7.Button
                          outline
                          link
                          className="medium-only"
                          iconMd="material:inventory_2"
                          disabled
                          text="Archivar"
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
                                <th></th>
                              </>
                            }
                          />
                        }
                      />

                      <tbody
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
                                    <img src={person.avatar} width="40" />
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
                              className="actions-cell"
                              children={
                                <>
                                  <F7.Link
                                    tooltip="Editar Usuario"
                                    link
                                    iconMd="material:edit"
                                  />

                                  <F7.Link
                                    tooltip="Archivar Usuario"
                                    link
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
    </F7.Page>
  );
};
