import axios from "axios"
import { encrypt, decrypt } from "./CryptoService.js"
import $ from "jquery"
import { TOKEN } from "./utils.js"
import { xorEncrypt, SECRET_KEY } from "./utils.js"
import { api_url } from "./constants.js"

const secret_key = "P1P3_L34D5"
const debug = false
const getFilter = "_GET&filter="
const getTableFilter = "_TABLE&filter="
const patchFilter = "_PATCH&filter="
const postFilter = "_POST&filter="
const totalFilter = "_TOTAL&filter="
const fileFilter = "_FILE"
const cloudFunction = "cloudFunction="
const cacheTables = {}

window.xorEncrypt = xorEncrypt

export default class ApiService {
	constructor(tableName, withToken = true) {
		const TKN = TOKEN.get()
		this.token64 = TKN ? TKN.token64 : null

		this.withToken = withToken
		this.debug = debug
		this.table = tableName
		this.filter = { table: this.table }
	}

	/**
	 * Helper para agregar headers con token si aplica
	 */
	_getHeaders() {
		if (this.withToken && this.token64) {
			return {
				Authorization: `Bearer ${this.token64}`,
			}
		}
		return {}
	}

	buildSearchText(data) {
		const usedKeys = []
		const result = Object.entries(data)
			.filter(([key]) => {
				const isValid =
					!key.endsWith("At") &&
					!key.endsWith("URL") &&
					!key.endsWith("Id") &&
					key !== "isBanned" &&
					key !== "accessToken" &&
					key !== "status" &&
					key !== "searchText" &&
					key !== "uid" &&
					key !== "id"

				if (isValid) {
					usedKeys.push(key)
				}
				return isValid
			})
			.map(([_, value]) =>
				(value !== undefined && value !== null ? value : "")
					.toString()
					.toLowerCase()
			)
			.join(" ")

		return result
	}

	// * Consultar un registro por filtro
	async get(filter = {}) {
		let endpoint = ""

		if (this.debug) {
			const jsonify = JSON.stringify({ ...this.filter, ...filter })
			const encrypted = xorEncrypt(jsonify, SECRET_KEY)
			endpoint = encodeURIComponent(encrypted)
		} else {
			endpoint = encodeURIComponent(
				JSON.stringify({ ...this.filter, ...filter })
			)
		}

		const final_url = api_url + getFilter + endpoint
		const response = await $.ajax({
			url: final_url,
			type: "GET",
			dataType: "json",
			headers: this._getHeaders(),
		})
		return response
	}

	async getTable(filter = {}) {
		if (cacheTables[this.table]) {
			return cacheTables[this.table]
		}

		let endpoint = ""
		if (this.debug) {
			const jsonify = JSON.stringify({ ...this.filter, ...filter })
			const encrypted = xorEncrypt(jsonify, SECRET_KEY)
			endpoint = encodeURIComponent(encrypted)
		} else {
			endpoint = encodeURIComponent(
				JSON.stringify({ ...this.filter, ...filter })
			)
		}

		const final_url = api_url + getTableFilter + endpoint
		const response = await $.ajax({
			url: final_url,
			type: "GET",
			dataType: "json",
			headers: this._getHeaders(),
		})

		cacheTables[this.table] = response
		return response
	}

	// * Crear o actualizar un registro
	async post(data) {
		data.searchText = this.buildSearchText(data)

		const response = await $.ajax({
			url:
				api_url +
				postFilter +
				encodeURIComponent(JSON.stringify(this.filter)),
			type: "POST",
			dataType: "json",
			data,
			headers: this._getHeaders(),
		})

		return response
	}

	async removeFile(nameFile) {
		const response = await $.ajax({
			url: api_url + fileFilter + "&name=" + nameFile,
			type: "GET",
			dataType: "json",
			headers: this._getHeaders(),
		})

		return response
	}

	// * Insertar un archivo
	async image(data) {
		try {
			const formData = new FormData()
			formData.append("file", data, "image.png")

			const response = await $.ajax({
				url: api_url + fileFilter,
				type: "POST",
				data: formData,
				processData: false,
				contentType: false,
				dataType: "json",
				headers: this._getHeaders(),
			})

			return response
		} catch (error) {
			console.error("Error uploading file:", error)
			throw error
		}
	}

	async cloudFunction(cFunction, data) {
		const response = await $.ajax({
			url: api_url + cloudFunction + cFunction,
			type: "POST",
			dataType: "json",
			data,
			headers: this._getHeaders(),
		})

		return response
	}

	// * Consultar el total de registros con filtro
	async total(filter = {}) {
		const endpoint = encodeURIComponent(
			JSON.stringify({ ...this.filter, ...filter })
		)

		const final_url = api_url + totalFilter + endpoint
		const response = await $.ajax({
			url: final_url,
			type: "GET",
			dataType: "json",
			headers: this._getHeaders(),
		})
		return response
	}

	// * Eliminar registros de array de ids
	async delete(ids = []) {
		// Puedes implementar algo similar con PATCH o DELETE
	}
}
