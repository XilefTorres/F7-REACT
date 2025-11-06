import React, { useEffect } from "react";
import { Panel, View } from "framework7-react";
import PanelLeft from "./PanelLeft";
import { TOKEN } from "../../utils/utils";

export default ({ setIsLogged, isLogged }) => {
  const TKN = TOKEN.get();
  useEffect(() => {}, []);

  return (
    <>
      {/* themeDark */}
      <Panel left cover className="panel-left-persistent">
        <PanelLeft
          setIsLogged={setIsLogged}
          company={{}}
          getCompanies={() => {}}
        />
      </Panel>

      {/* Main View */}
      <View
        id="main-view"
        url="/"
        main
        className="safe-areas"
        pushState={true}
        pushStateSeparator={"#"}
        pushStateOnLoad={true}
      />
    </>
  );
};
