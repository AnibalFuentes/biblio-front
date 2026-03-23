"use client";

import React from "react";
import { Libro } from "@/types/libro";
import LibroCard from "./LibroCard";

interface LibroListProps {
  libros: Libro[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  loading?: boolean;
}

const LibroList: React.FC<LibroListProps> = ({
  libros,
  onEdit,
  onDelete,
  loading = false,
}) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (libros.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No hay libros registrados</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {libros.map((libro) => (
        <LibroCard
          key={libro.id}
          libro={libro}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default LibroList;
