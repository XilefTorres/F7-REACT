import React from "react"
import { Button, List, ListItem, Chip } from "framework7-react"
import SearchIcon from "../Icons/SearchIcon"
import { HugeiconsIcon } from "@hugeicons/react"
import * as HI from "@hugeicons/core-free-icons"

export const F7PTable = ({
	id,
	children,
	singular,
	plural,
	onChange,
	total,
	dataLength,
	selected,
	query,
	searchDone,
	onMainCheckboxChange,
	isIndeterminate,
}) => (
	<div className="table-control" id={id}>
		<div className="table-control-header">
			<div className="table-search">
				<div className="icon-table-search">
					<SearchIcon />
				</div>
				<input
					className="input-search"
					type="search"
					placeholder={"Buscar " + singular}
					onChange={onChange}
				/>
			</div>
		</div>
		<div className="table-body-row-first">
			{/* <div className="check-row">
        <List noHairlines>
          <ListItem
            checkbox
            indeterminate={isIndeterminate}
            checked={selected.length === dataLength && dataLength > 0}
            onChange={onMainCheckboxChange}
          />
        </List>
      </div> */}

			<div className="title-body-table">
				&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
				{selected.length ? (
					<div className="selected">
						<Button fill popoverOpen=".popover-actions-leads">
							( {selected.length} )
							{selected.length > 1 ? plural : singular}{" "}
							Seleccionado
							{selected.length > 1 ? "s" : ""}
						</Button>
					</div>
				) : searchDone ? (
					<>
						<div className="title-body-table">
							( {dataLength} ) Resultado
							{dataLength > 1 ? "s" : ""} para {query}
						</div>
					</>
				) : (
					<>Lista de {plural}</>
				)}
			</div>
		</div>

		{children}

		{/* <div className="table-footer">
			<div className="leftSection">
				<strong>
					Total &nbsp; <span>{total}</span>
				</strong>
			</div>
			<div className="rightSection">
				<div className="quantity">
					<List noChevron noHairlines>
						<ListItem
							title=" "
							smartSelect
							smartSelectParams={{
								openIn: "popover",
								closeOnSelect: true,
							}}
						>
							<select defaultValue={"50"}>
								<option value="50">50</option>
								<option value="100">100</option>
								<option value="200">200</option>
							</select>

							<SwitchIcon />
						</ListItem>
					</List>
				</div>
				<div className="arrowsPages">
					<Button>
						<LeftChevronIcon />
					</Button>
					<Button>
						<RightChevronIcon />
					</Button>
				</div>
			</div>
		</div> */}
	</div>
)

// {React.Children.map(children, child =>
// 	React.isValidElement(child)
// 		? React.cloneElement(child, { singular })
// 		: child
// )}

export const F7PBody = ({ children }) => (
	<>
		<div className="table-body-content">{children}</div>
	</>
)

export const F7PTitle = ({ text, total, icon }) => (
	<>
		<div className="title">
			{text} &nbsp;
			<Chip
				text={total.toString()}
				mediaTextColor="white"
				mediaBgColor="green"
			>
				<HugeiconsIcon slot="media" icon={icon} />
			</Chip>
		</div>
	</>
)
