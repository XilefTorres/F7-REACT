import React from "react"
import * as F7 from "framework7-react"
import { HugeiconsIcon } from "@hugeicons/react"
import * as HI from "@hugeicons/core-free-icons"

export default ({ config, black }) => {
	return (
		<>
			<F7.Button
				className={"button" + (black ? " black-button" : "")}
				tooltip={config.text}
				tooltipPosition="top"
				onClick={config.onClick}
			>
				<HugeiconsIcon icon={config.icon} />
			</F7.Button>
		</>
	)
}
