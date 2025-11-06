import $ from "jquery";
import * as U from "./utils.js";
import { api_url } from "./constants.js";

const ajaxFilter = "ajax=";
const configFilter = "config=";
const cacheTables = {};

export default class AjaxService {
  constructor(withToken = true) {
    const TKN = U.TOKEN.get();
    this.token64 = TKN ? TKN.token64 : null;
    this.withToken = withToken;
  }

  /**
   * Helper para agregar headers con token si aplica
   */
  _getHeaders() {
    if (this.withToken && this.token64) {
      return {
        Authorization: `Bearer ${this.token64}`,
      };
    }
    return {};
  }

  buildSearchText(data) {
    const usedKeys = [];
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
          key !== "token" &&
          key !== "token64" &&
          key !== "id";

        if (isValid) {
          usedKeys.push(key);
        }
        return isValid;
      })
      .map(([_, value]) =>
        (value !== undefined && value !== null ? value : "")
          .toString()
          .toLowerCase()
      )
      .join(" ");

    return result;
  }

  async get(endpoint) {
    const getter = endpoint.charAt(0).toUpperCase() + endpoint.slice(1);
    const response = await $.ajax({
      url: api_url + ajaxFilter + "get" + getter,
      type: "GET",
      dataType: "json",
      headers: this._getHeaders(),
    });

    return response;
  }

  async cmd(endpoint, cmd, body = {}) {
    const response = await $.ajax({
      url: api_url + ajaxFilter + endpoint + "&cmd=" + cmd,
      type: "POST",
      dataType: "json",
      data: body,
      headers: this._getHeaders(),
    });

    return response;
  }

  async search(query) {
    const response = await $.ajax({
      url:
        api_url +
        ajaxFilter +
        "search&ctx=" +
        encodeURIComponent(JSON.stringify(query)),
      headers: this._getHeaders(),
      dataType: "json",
      type: "GET",
    });

    return response;
  }

  async post(table, data) {
    data.searchText = this.buildSearchText(data);

    // 🔴 limpiar si existe isTrusted
    if ("isTrusted" in data) {
      delete data.isTrusted;
    }

    const response = await $.ajax({
      url: api_url + ajaxFilter + "post&ctx=" + table,
      headers: this._getHeaders(),
      dataType: "json",
      type: "POST",
      data,
    });

    return response;
  }

  async config(endpoint) {
    if (cacheTables[endpoint]) {
      return cacheTables[endpoint];
    }
    U.LOADING("Cargando");

    const response = await $.ajax({
      url: api_url + configFilter + endpoint,
      type: "GET",
      dataType: "json",
      headers: this._getHeaders(),
    });

    cacheTables[endpoint] = response;

    U.LOADING(false);
    return response;
  }

  async file(data, name = "") {
    try {
      const formData = new FormData();
      formData.append("file", data, "image.png");

      let url =
        api_url + ajaxFilter + "file" + (name.length ? "&name=" + name : "");

      const response = await $.ajax({
        url,
        type: "POST",
        data: formData,
        processData: false,
        contentType: false,
        dataType: "json",
        headers: this._getHeaders(),
      });

      return response;
    } catch (error) {
      console.error("Error uploading file:", error);
      throw error;
    }
  }
}
