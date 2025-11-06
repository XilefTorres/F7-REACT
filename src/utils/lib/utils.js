import $ from "jquery";
export const TOKEN_NAME = "CORONA_token_100";
export const SECRET_KEY = "P1P3_L34D5";

import { f7 } from "framework7-react";
window.$app = { $f7: f7 };
window.$app = $app;

export const TOKEN = {
  get: () => {
    try {
      const encryptedToken = localStorage.getItem(TOKEN_NAME);
      if (!encryptedToken) return null;

      // Desencriptar el token
      const decodedToken = atob(encryptedToken);
      const decryptedToken = xorEncrypt(decodedToken, SECRET_KEY);
      return JSON.parse(decryptedToken);
    } catch (error) {
      console.error("Error al desencriptar el token:", error);
      return null;
    }
  },
  getToken: () => {
    let tkn = TOKEN.get();
    return tkn.token;
  },
  set: (_token) => {
    try {
      // Encriptar el token
      const tokenString = JSON.stringify(_token);
      const encryptedToken = xorEncrypt(tokenString, SECRET_KEY);
      const encodedToken = btoa(encryptedToken);
      localStorage.setItem(TOKEN_NAME, encodedToken);
    } catch (error) {
      console.error("Error al encriptar el token:", error);
    }
  },
  setV1: () => {
    localStorage.setItem("bienes", "true");
  },
  getV1: () => {
    return localStorage.getItem("bienes");
  },
  destroyV1: () => {
    return localStorage.removeItem("bienes");
  },
  destroy: () => {
    localStorage.removeItem(TOKEN_NAME);
  },
  isAuthenticated: () => {
    const tkn = localStorage.getItem(TOKEN_NAME);
    try {
      return tkn && tkn.length > 0;
    } catch (error) {
      return false;
    }
  },
};

const icon = `<div class="icon-notification"><svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
		>
			<path d="M18.5026 3.17701C20.0161 2.6379 21.7292 3.36796 22.3102 4.8711C22.5985 5.61707 22.5531 6.32054 22.1905 6.95252C21.8576 7.53255 21.2932 7.98753 20.6856 8.37814C20.4774 8.51197 20.2634 8.64457 20.0438 8.78059C19.2289 9.28536 18.3377 9.83735 17.3878 10.6752C16.1895 11.7321 15.0093 13.015 13.9509 14.291C12.8983 15.56 12.0022 16.7781 11.3685 17.6811C11.1662 17.9693 10.9217 18.3316 10.7259 18.6246C10.6284 18.7706 10.5438 18.8982 10.4835 18.9893L10.413 19.0962L10.3912 19.1293C9.83814 19.9996 8.85844 20.5124 7.82271 20.4995C6.78447 20.4865 5.8161 19.9472 5.28709 19.0585C4.32936 17.4495 3.62937 16.8805 3.39059 16.72C3.19839 16.5909 2.99364 16.4861 2.74996 16.3614L2.74036 16.3564C2.51219 16.2397 2.23409 16.0973 1.98275 15.9143C1.71837 15.7218 1.46008 15.4689 1.27399 15.1134C1.08816 14.7583 1 14.35 1 13.8833C1 12.2623 2.35983 11 3.97216 11C3.98138 11 3.9906 11.0002 3.99982 11.0005C5.04753 11.0392 5.98685 11.4496 6.77587 11.9798C7.08107 12.1849 7.39294 12.427 7.71005 12.7116C8.19103 12.0746 8.73209 11.3841 9.31973 10.6756C10.4917 9.26276 11.8849 7.73475 13.3888 6.4084C14.86 5.11077 16.6085 3.85167 18.5026 3.17701Z"></path>
		</svg></div>`;

export const IS_NEW = (obj) => {
  // return true
  try {
    return !("id" in obj);
  } catch (error) {
    return true;
  }
};

export const uniqid = (() => {
  const generatedCodes = new Set();

  return (length = 8) => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code;

    do {
      code = "";
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        code += chars[randomIndex];
      }
    } while (generatedCodes.has(code));

    generatedCodes.add(code);
    return code;
  };
})();
export const NOTIFICATION = (title, text, type = "success") => {
  $app.$f7.notification
    .create({
      icon: icon,
      title,
      closeTimeout: 5000,
      // closeButton: true,
      // titleRightText: "now",
      // subtitle: "Notification with close on click",
      text,
      closeOnClick: true,
      on: {
        close: function() {
          // $app.$f7.dialog.alert("Notification closed")
        },
      },
    })
    .open();
};

export const LOADING = (isShow, text = "Cargando...") => {
  isShow ? $app.$f7.dialog.preloader(text) : $app.$f7.dialog.close();
};

export const CALENDAR = (at) => {
  const date = new Date(at);
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const diffMonths = Math.floor(diffDays / 30);
  const diffYears = Math.floor(diffDays / 365);

  const formattedDate = date.toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  let timeAgo;
  if (diffDays === 0) {
    timeAgo = "hoy";
  } else if (diffDays === 1) {
    timeAgo = "hace 1 día";
  } else if (diffDays < 30) {
    timeAgo = `hace ${diffDays} días`;
  } else if (diffMonths === 1) {
    timeAgo = "hace 1 mes";
  } else if (diffMonths < 12) {
    timeAgo = `hace ${diffMonths} meses`;
  } else if (diffYears === 1) {
    timeAgo = "hace más de 1 año";
  } else {
    timeAgo = `hace más de ${diffYears} años`;
  }

  return `${timeAgo} - ${formattedDate}`;
};
export const NAVIGATE = (to) => {
  $app.$f7.views.main.router.navigate(to);
};

export const OPEN_POPOVER = (classPopover, targetEl) => {
  return $app.$f7.popover.open(classPopover, $(targetEl));
};

export const OPEN_TIMELINE = (classTM) => {
  return $app.$f7.accordion.open(classTM);
};
export const SEND_TIMELINE = async (type, message, leadId, service) => {
  const TKN = TOKEN.get();
  const adminId = TKN.role == "ADMIN" ? TKN.id : TKN.adminId;
  const companyId = TKN.companyId;
  const managerId =
    TKN.role == "ADMIN" ? 0 : TKN.role == "MANAGER" ? TKN.id : TKN.managerId;
  const advisorId =
    TKN.role == "ADMIN" ? 0 : TKN.role == "ADVISOR" ? TKN.id : 0;
  const displayName = TKN.name;
  const displayRole =
    TKN.role == "ADMIN"
      ? "🔑 Administrador"
      : TKN.role == "MANAGER"
      ? "💼 Gerente"
      : "💬 Asesor";

  const body = {
    adminId,
    companyId,
    managerId,
    advisorId,
    leadId,
    happenedAt: DATE_TIME(),
    type,
    message,
    displayName,
    displayRole,
  };

  const response = await service.post("timeline", body);
  return response;
};

export const CLOSE_TIMELINE = (classTM) => {
  return $app.$f7.accordion.close(classTM);
};

export const TOAST = (msg, isButton = true) => {
  const toast = f7.toast.create({
    text: msg,
    position: "center",
    closeButton: isButton,
    closeButtonText: "Aceptar",
    closeButtonColor: "black",
  });

  toast.open();

  setTimeout(() => {
    toast.close();
  }, 3000);
};

export const CONFIRM = (
  msg,
  title,
  callbackOk = () => {},
  callbackCancel = () => {}
) => {
  $app.$f7.dialog.confirm(msg, title, callbackOk, callbackCancel);
};

export const VALID_INPUT = (id) => {
  // Selecciona el formulario
  const invalid = $app.$f7.input.validateInputs(id);

  const form = document.querySelector(id);

  // Selecciona todos los inputs requeridos
  const inputs = form.querySelectorAll("input[required]");

  let allValid = true;

  inputs.forEach((input) => {
    if (input.value.trim() === "") {
      input.classList.add("input-invalid"); // Agrega la clase de error
      allValid = false;
    } else {
      input.classList.remove("input-invalid"); // Remueve la clase si es válido
    }
  });

  return allValid;
};

export const SET_OPTION = (opt) => {
  $(".active-option").removeClass("active-option");
  $(".option-" + opt).addClass("active-option");
};

export const FULLSCREEN = (isFull) => {
  if (isFull) {
    $("#main-view").css({
      width: "100%",
      "margin-left": 0,
      "z-index": 10000,
    });
  } else {
    $("#main-view").removeAttr("style");
  }
};

// Función de encriptación XOR
export const xorEncrypt = (data, key) => {
  let result = "";
  for (let i = 0; i < data.length; i++) {
    result += String.fromCharCode(
      data.charCodeAt(i) ^ key.charCodeAt(i % key.length)
    );
  }
  return result;
};

export const PROMPT = (
  msg,
  title,
  callbackOk = () => {},
  callbackCancel = () => {}
) => {
  $app.$f7.dialog.prompt(msg, title, callbackOk, callbackCancel);
};

export const UPDATE_STATE = (input, SET) => {
  if (input && input.target) {
    const { name, value } = input.target;
    SET((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  } else if (typeof input === "object" && input !== null) {
    // Modo clave-valor
    const entries = Object.entries(input);
    SET((prevData) => {
      const updated = { ...prevData };
      entries.forEach(([key, value]) => {
        updated[key] = value;
      });
      return updated;
    });
  }
  return true;
};
export function GET_INITIALS(str) {
  if (!str) return "";
  const words = str.trim().split(/\s+/);

  return words
    .slice(0, 2) // primeras dos palabras
    .map((word) => {
      const char = [...word][0]; // primer caracter (emoji o letra)
      return typeof char === "string" && char.toUpperCase
        ? char.toUpperCase()
        : char;
    })
    .join("");
}

export const VALIDATE_IMAGE = (e, setPreview, toggleClass) => {
  let file = null;
  let fullFunction = true;

  if (setPreview === undefined && toggleClass === undefined) {
    file = e;
    fullFunction = false;
  } else {
    file = e.target.files[0];
  }
  const validate = (file) => {
    const validTypes = ["image/jpeg", "image/png"];
    if (!validTypes.includes(file.type)) {
      alert("Usa png o jpg");
      return false;
    }
    return true;
  };

  if (file && validate(file)) {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        if (fullFunction) {
          if (img.width > img.height) {
            toggleClass("width-preview");
          } else if (img.height > img.width) {
            toggleClass("height-preview");
          } else {
            toggleClass(""); // No clase para imágenes cuadradas
          }
          setPreview(event.target.result); // Actualiza la vista previa
        }
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
    return true;
  } else {
    e.target.value = "";
    setPreview("");
    toggleClass("");
    return false;
  }
};

export const RESIZE_IMAGE = (file, maxSize, callback) => {
  const reader = new FileReader();
  reader.onload = (event) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      let width = img.width;
      let height = img.height;

      if (width > maxSize || height > maxSize) {
        if (width > height) {
          height *= maxSize / width;
          width = maxSize;
        } else {
          width *= maxSize / height;
          height = maxSize;
        }
      }

      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        (blob) => {
          callback(blob);
        },
        "image/png", // Cambia el formato a PNG
        1.0 // Calidad máxima para PNG
      );
    };
    img.src = event.target.result;
  };
  reader.readAsDataURL(file);
};

export const UID = () => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const array = new Uint8Array(12);
  crypto.getRandomValues(array);
  return Array.from(array, (byte) => chars[byte % chars.length]).join("");
};

export const CONVERT_OBJ = (e) => {
  const formData = new FormData(e.target);
  const dataObject = {};
  for (const [key, value] of formData.entries()) {
    dataObject[key] = value;
  }
  return dataObject;
};

export const IS_EMPTY_OBJ = (obj) => {
  if (obj === null || obj === undefined) {
    return true;
  }

  try {
    return Object.entries(obj).length > 0 ? false : true;
  } catch (e) {
    return false;
  }
};

export const UPLOAD_DATA = async (body, service) => {
  if (!("id" in body)) {
    body.createdAt = new Date().getTime();
  }

  const response = await service.post(body);
  return response;
};

export const DATE_TIME = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  return formattedDate;
};

export const DATE = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
};

export const CLOSE_POPUP = (setClosePopupRef, PopupForm) => {
  setClosePopupRef(true);
  PopupForm.current.close();
};

export const COPY = async (text) => {
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
    } else {
      // Fallback para navegadores antiguos
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed"; // evita scroll hasta el final
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }
    return true;
  } catch (err) {
    console.error("Error al copiar:", err);
    return false;
  }
};

export function SET_IN(obj, path, values) {
  const keys = path.split(".");
  const lastKey = keys.pop();
  let nested = { ...obj };

  let current = nested;
  for (const key of keys) {
    current[key] = { ...current[key] };
    current = current[key];
  }

  // Si values es un objeto, mergea, si no asigna directo
  current[lastKey] =
    typeof values === "object" && !Array.isArray(values)
      ? { ...current[lastKey], ...values }
      : values;

  return nested;
}

export const GET_ADMIN_ID = (TKN) => {
  if (TKN.role == "ADMIN") {
    return TKN.id;
  } else {
    return TKN.adminId;
  }
};

export const UPDATE_CONFIG_LIST = (list, updatedData, setConfig) => {
  setConfig((prev) =>
    SET_IN(
      prev,
      "lists." + list,
      (() => {
        console.log("list", list);
        console.log("updatedData", updatedData);
        const currentList = prev.lists[list] || []; // 👈 dinámico y con fallback []
        const exists = currentList.some((row) => row.id === updatedData.id);
        return exists
          ? currentList.map((row) =>
              row.id === updatedData.id ? updatedData : row
            )
          : [updatedData, ...currentList];
      })()
    )
  );
};

export const STR_TO_ARRAY = (array) => {
  try {
    return [...array.split(",")];
  } catch (e) {
    return [];
  }
};

export const ALLOW_ROLE = (allow, role) => {
  return allow.includes(role);
};

export const LOGOUT = (setIsLogged) => {
  LOADING(true, "Cerrando sesión...");
  setTimeout(async () => {
    TOKEN.destroy();
    LOADING(false);
    window.location.reload();
  }, 2000);
};
