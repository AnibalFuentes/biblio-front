import api from "@/utils/api";
import { Libro, LibroCreate, ApiResponse } from "@/types/libro";

export const libroService = {
  // Obtener todos los libros
  async listarLibros(): Promise<Libro[]> {
    const response = await api.get<ApiResponse>("/libros");
    if (response.data.success && response.data.libros) {
      return response.data.libros;
    }
    return [];
  },

  // Obtener un libro por ID
  async obtenerLibro(id: string): Promise<Libro | null> {
    const response = await api.get<ApiResponse>(`/libros/${id}`);
    if (response.data.success && response.data.libro) {
      return response.data.libro;
    }
    return null;
  },

  // Crear nuevo libro
  async crearLibro(libro: LibroCreate): Promise<Libro> {
    const response = await api.post<ApiResponse>("/libros", libro);
    if (!response.data.success || !response.data.libro) {
      throw new Error(response.data.msg || "Error al crear el libro");
    }
    return response.data.libro;
  },

  // Actualizar libro
  async actualizarLibro(
    id: string,
    libro: Partial<LibroCreate>,
  ): Promise<Libro> {
    const response = await api.put<ApiResponse>(`/libros/${id}`, libro);
    if (!response.data.success || !response.data.libro) {
      throw new Error(response.data.msg || "Error al actualizar el libro");
    }
    return response.data.libro;
  },

  // Eliminar libro
  async eliminarLibro(id: string): Promise<void> {
    const response = await api.delete<ApiResponse>(`/libros/${id}`);
    if (!response.data.success) {
      throw new Error(response.data.msg || "Error al eliminar el libro");
    }
  },
};
