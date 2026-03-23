import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para manejar errores
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Error del servidor
      console.error("Error API:", error.response.data);
      return Promise.reject(error.response.data);
    } else if (error.request) {
      // No hubo respuesta
      console.error("Error de red:", error.message);
      return Promise.reject({ msg: "Error de conexión con el servidor" });
    } else {
      // Error en la configuración
      console.error("Error:", error.message);
      return Promise.reject({ msg: "Error en la solicitud" });
    }
  },
);

export default api;
