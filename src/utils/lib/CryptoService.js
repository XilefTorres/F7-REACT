// Función para convertir una clave de texto a un ArrayBuffer de 128 bits (16 bytes)
function stringToArrayBuffer(str) {
	const arr = new TextEncoder().encode(str) // Convierte la clave a bytes
	const buffer = new Uint8Array(16) // 128 bits = 16 bytes
	buffer.set(arr.slice(0, 16)) // Asegura que la clave tenga exactamente 16 bytes
	return buffer
}

// Cifrado con AES-128-CBC
export async function encrypt(data, key) {
	const iv = crypto.getRandomValues(new Uint8Array(16)) // IV aleatorio de 16 bytes
	const keyBuffer = stringToArrayBuffer(key) // Convertir la clave a ArrayBuffer de 16 bytes

	// Importar la clave para su uso en el cifrado
	const cryptoKey = await crypto.subtle.importKey(
		"raw",
		keyBuffer,
		{ name: "AES-CBC" },
		false,
		["encrypt"]
	)

	// Cifrado de los datos
	const encryptedData = await crypto.subtle.encrypt(
		{ name: "AES-CBC", iv: iv },
		cryptoKey,
		new TextEncoder().encode(data)
	)

	// Combina IV y texto cifrado en un solo array
	const combined = new Uint8Array(iv.length + encryptedData.byteLength)
	combined.set(iv, 0)
	combined.set(new Uint8Array(encryptedData), iv.length)

	// Convierte el resultado a base64 para facilitar la transmisión
	return btoa(String.fromCharCode(...combined))
}

// Descifrado con AES-128-CBC
export async function decrypt(data, key) {
	const combined = new Uint8Array(
		atob(data)
			.split("")
			.map(char => char.charCodeAt(0))
	)

	const iv = combined.slice(0, 16) // Extraer IV
	const ciphertext = combined.slice(16) // Extraer texto cifrado

	const keyBuffer = stringToArrayBuffer(key) // Convertir la clave a ArrayBuffer de 16 bytes

	// Importar la clave para su uso en el descifrado
	const cryptoKey = await crypto.subtle.importKey(
		"raw",
		keyBuffer,
		{ name: "AES-CBC" },
		false,
		["decrypt"]
	)

	// Descifrado de los datos
	const decryptedData = await crypto.subtle.decrypt(
		{ name: "AES-CBC", iv: iv },
		cryptoKey,
		ciphertext
	)

	// Convertir el resultado de vuelta a texto
	return new TextDecoder().decode(decryptedData)
}

// // Ejemplo de uso
// const key = "clave_secreta_12" // 16 caracteres (128 bits)
// const message = "Mensaje sencillo"

// encrypt(message, key).then(encrypted => {
// 	console.log("Texto cifrado:", encrypted)

// 	decrypt(encrypted, key).then(decrypted => {
// 		console.log("Texto descifrado:", decrypted)
// 	})
// })
