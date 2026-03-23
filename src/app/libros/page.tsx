"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import LibroList from "@/components/Libros/LibroList";
import { libroService } from "@/services/libroService";
import { Libro } from "@/types/libro";

export default function LibrosPage() {
  const router = useRouter();
  const [libros, setLibros] = useState<Libro[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    cargarLibros();
  }, []);

  const cargarLibros = async () => {
    try {
      setLoading(true);
      const data = await libroService.listarLibros();
      setLibros(data);
    } catch (error: any) {
      toast.error(error.msg || "Error al cargar los libros");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (id: string) => {
    router.push(`/libros/editar/${id}`);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("¿Estás seguro de eliminar este libro?")) {
      try {
        setDeletingId(id);
        await libroService.eliminarLibro(id);
        toast.success("Libro eliminado exitosamente");
        await cargarLibros();
      } catch (error: any) {
        toast.error(error.msg || "Error al eliminar el libro");
      } finally {
        setDeletingId(null);
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Lista de Libros</h1>
        <button
          onClick={() => router.push("/libros/nuevo")}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Agregar Libro
        </button>
      </div>

      <LibroList
        libros={libros}
        onEdit={handleEdit}
        onDelete={handleDelete}
        loading={loading}
      />

      {deletingId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6">
            <p className="text-gray-700">Eliminando libro...</p>
          </div>
        </div>
      )}
    </div>
  );
}
