import React from "react";
import * as F7 from "framework7-react";
import { HugeiconsIcon } from "@hugeicons/react";
import * as HI from "@hugeicons/core-free-icons";

export default ({ config, popup, doodle }) => {
  return (
    <>
      <F7.Block strong>
        <div className="empty-view">
          <strong>No se encontraron resultados</strong>
          <br />
          <img src={"./images/" + doodle} />
          <br />
          <br />
        </div>
      </F7.Block>

      <F7.Block>
        <F7.Button
          className="withIcon"
          fill
          style={{ width: "245px" }}
          onClick={() => popup.open()}
        >
          <HugeiconsIcon icon={HI.Add01Icon} />
          Agregar {config.grammar == "MALE" ? "Nuevo" : "Nueva"}{" "}
          {config.singular}
        </F7.Button>
      </F7.Block>
    </>
  );
};
