import React, { useEffect, useState } from "react"
import * as F7 from "framework7-react"
import { HugeiconsIcon } from "@hugeicons/react"
import * as HI from "@hugeicons/core-free-icons"
import * as U from "../../utils/lib/utils"

export default ({ config, children, setConfig, add, icons, widthAdd }) => {
	const [searchTimeout, setSearchTimeout] = useState(null)

	const handleSearchInputChange = e => {
		clearTimeout(searchTimeout)
		const value = e.target.value
		setSearchTimeout(
			setTimeout(() => {
				search(value)
			}, 600)
		)
	}

	const search = async _query => {
		if (_query === "") {
			config.load()
		} else {
			U.LOADING(true, `Cargando ${config.plural}...`)
			console.log("config", config)
			const filter = config.searchFilter()
			filter.where.like = ["searchText", `%${_query.toLowerCase()}%`]

			const data = await config.service.search(filter)
			if (data.length) config.onSearch(data)

			setTimeout(() => {
				if (!data.length)
					U.TOAST("No se encontraron resultados para " + _query)

				U.LOADING(false)
			}, 500)
		}
	}

	return (
		<>
			<F7.Block className="boxed-view">
				<div className="header-control-view">
					<div className="title">
						{config.plural} &nbsp;
						<F7.Chip
							text={config.total.toString()}
							mediaTextColor="white"
							mediaBgColor="green"
						>
							<HugeiconsIcon slot="media" icon={icons.total} />
						</F7.Chip>
					</div>

					<div className="actionButtons">
						<F7.Button
							className="withIcon"
							onClick={() => add()}
							fill
							style={{ width: widthAdd }}
						>
							<HugeiconsIcon icon={icons.add} />
							Agregar {config.singular}
						</F7.Button>
					</div>
				</div>

				<div className="table-control" id={config.id}>
					<div className="table-control-header">
						<div className="table-search">
							<div className="icon-table-search">
								<HugeiconsIcon icon={HI.Search01Icon} />
							</div>
							<input
								className="input-search"
								type="search"
								placeholder={"Buscar " + config.plural}
								onChange={handleSearchInputChange}
							/>
						</div>
					</div>
					<div className="table-body-row-first">
						<div className="title-body-table">
							Lista de {config.plural}
						</div>
					</div>
					<div className="table-body-content">{children}</div>
				</div>
			</F7.Block>
		</>
	)
}
