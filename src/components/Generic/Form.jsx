import React, { useEffect, useState } from "react"
import * as F7 from "framework7-react"
import { HugeiconsIcon } from "@hugeicons/react"
import * as HI from "@hugeicons/core-free-icons"
import * as U from "../../utils/lib/utils"
import $ from "jquery"

export default ({
	config,
	isOpen,
	keyPopup,
	uiInputs = [],
	initialValues = {},
}) => {
	const [popupConfig, setPopupConfig] = useState({})
	const [body, setBody] = useState({})
	const [Sections, setSections] = useState([])

	const buildForm = async () => {
		const _sections = []
		const table = await config.service.config(popupConfig.tableConfig)

		for (const field of table) {
			if (
				["status", "createdAt", "updatedAt", "searchText"].includes(
					field.Field
				)
			)
				continue

			if (field.Field === "id") {
				const cfg =
					typeof field.Comment === "string"
						? JSON.parse(field.Comment || "{}")
						: field.Comment || {}
				for (const section of cfg.sections) {
					_sections.push({ name: section, fields: [] })
				}
				continue
			}

			const fieldConfig =
				typeof field.Comment === "string"
					? JSON.parse(field.Comment || "{}")
					: field.Comment || {}
			if (fieldConfig.ignore) continue

			if ("section" in fieldConfig) {
				try {
					const s = _sections[fieldConfig.section]
					s.fields.push({
						...fieldConfig,
						name: field.Field,
						value: "",
					})
				} catch (err) {}
			}
		}

		setSections(_sections)
	}

	const submit = async e => {
		e.preventDefault()

		if ("onSubmit" in popupConfig) {
			if (!popupConfig.onSubmit(body)) return
		}

		U.LOADING(true, `Guardando ${config.singular}...`)
		const response = await config.service.post(
			popupConfig.tableConfig,
			body
		)
		U.LOADING(false)
		setBody({})

		if (config.lists[keyPopup].length) {
			if (popupConfig.onSubmited)
				popupConfig.onSubmited(response, "id" in body)
		} else {
			config.load()
		}
		popupConfig.close()
	}

	useEffect(() => {
		const popupConfig = config.popups[keyPopup]
		setPopupConfig(popupConfig)
		$(`#form-${config.id}`)[0].reset()

		if (popupConfig.isOpen) {
			console.log("initialValues", initialValues)
			if (!("id" in body)) {
				setBody({ ...initialValues, ...popupConfig.data })
			}
		} else {
			setBody({})
		}
	}, [isOpen])

	useEffect(() => {
		if (isOpen) buildForm()
	}, [body])

	const onOpen = () => {
		try {
			popupConfig.onOpen(body)
		} catch (error) {}
	}

	return (
		<>
			<F7.Popup
				id={"popup-" + config.id}
				opened={popupConfig.isOpen}
				onPopupClosed={popupConfig.close}
				onPopupOpen={onOpen}
				closeOnEscape
				className={
					popupConfig.fullscreen ? "popup-tablet-fullscreen" : ""
				}
			>
				<F7.View>
					<F7.Page>
						<F7.Navbar className="navbar-aside asideNavbar">
							<img
								className="logo-center"
								src="images/logo-h.png"
							/>
						</F7.Navbar>

						<F7.Block>
							<form id={"form-" + config.id} onSubmit={submit}>
								<div className="head-form">
									<F7.BlockTitle
										className="backIcon m0"
										medium
									>
										<F7.Button popupClose>
											<HugeiconsIcon
												icon={HI.ArrowLeft01Icon}
											/>
										</F7.Button>
										<div>
											{U.IS_NEW(popupConfig.data)
												? `Agregar Nuevo ${config.singular}`
												: `Editar ${config.singular}`}
										</div>
									</F7.BlockTitle>

									<div className="ml8 mb0 mt10 color-2">
										{U.IS_NEW(popupConfig.data) ? (
											<>
												👋{"\u00A0\u00A0"}Vamos a
												registrar tu {config.singular}.
											</>
										) : (
											<>
												✏️{"\u00A0\u00A0"}Edita la
												información de tu{" "}
												{config.singular}.
											</>
										)}
									</div>
								</div>

								{Sections.map((s, index_section) => (
									<div className="section-form">
										<div className="section-form-title">
											{s.name}
										</div>

										<F7.List noHairlinesMd>
											{s.fields.map((f, index_field) => (
												<F7.ListInput
													key={f.name}
													label={f.label}
													type={f.type || "text"}
													placeholder={
														f.placeholder || ""
													}
													maxlength={
														parseInt(f.maxlength) ||
														""
													}
													minlength={
														parseInt(f.minlength) ||
														""
													}
													value={
														body[f.name] ||
														f.value ||
														""
													}
													required={
														f.required || false
													}
													info={
														!f.required
															? "Opcional"
															: ""
													}
													readOnly={
														f.readOnly || false
													}
													onInput={e =>
														setBody({
															...body,
															[f.name]:
																e.target.value,
														})
													}
													floatingLabel
													outline
													clearButton
												/>
											))}

											{uiInputs[index_section] !==
											undefined
												? uiInputs[index_section].map(
														f => {
															return f(
																body,
																setBody
															)
														}
												  )
												: ""}
										</F7.List>
									</div>
								))}

								<F7.Button
									className="button-logout"
									fill
									type="submit"
								>
									Guardar {config.singular}
								</F7.Button>
								<br />
								<br />
								<br />
							</form>
						</F7.Block>
					</F7.Page>
				</F7.View>
			</F7.Popup>
		</>
	)
}
