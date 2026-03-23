"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import LibroForm from "@/components/Libros/LibroForm";
import { libroService } from "@/services/libroService";

export default function NuevoLibroPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data: any) => {
    try {
      setIsLoading(true);
      await libroService.crearLibro(data);
      toast.success("Libro creado exitosamente");
      router.push("/libros");
    } catch (error: any) {
      toast.error(error.msg || "Error al crear el libro");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    router.push("/libros");
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        Crear Nuevo Libro
      </h1>
      <LibroForm
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isLoading={isLoading}
      />
    </div>
  );
}
