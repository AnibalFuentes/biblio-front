"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import toast from "react-hot-toast";
import LibroForm from "@/components/Libros/LibroForm";
import { libroService } from "@/services/libroService";
import { Libro } from "@/types/libro";

export default function EditarLibroPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [libro, setLibro] = useState<Libro | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    cargarLibro();
  }, [id]);

  const cargarLibro = async () => {
    try {
      setIsFetching(true);
      const data = await libroService.obtenerLibro(id);
      if (!data) {
        toast.error("Libro no encontrado");
        router.push("/libros");
        return;
      }
      setLibro(data);
    } catch (error: any) {
      toast.error(error.msg || "Error al cargar el libro");
      router.push("/libros");
    } finally {
      setIsFetching(false);
    }
  };

  const handleSubmit = async (data: any) => {
    try {
      setIsLoading(true);
      await libroService.actualizarLibro(id, data);
      toast.success("Libro actualizado exitosamente");
      router.push("/libros");
    } catch (error: any) {
      toast.error(error.msg || "Error al actualizar el libro");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    router.push("/libros");
  };

  if (isFetching) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Cargando libro...</p>
      </div>
    );
  }

  if (!libro) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Editar Libro</h1>
      <LibroForm
        initialData={libro}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isLoading={isLoading}
      />
    </div>
  );
}
