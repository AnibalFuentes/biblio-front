import React from "react";
import { Libro } from "@/types/libro";
import Button from "@/components/UI/Button";

interface LibroCardProps {
  libro: Libro;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const LibroCard: React.FC<LibroCardProps> = ({ libro, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{libro.titulo}</h3>
        <p className="text-gray-600 mb-1">
          <span className="font-semibold">Autor:</span> {libro.autor}
        </p>
        {libro.editorial && (
          <p className="text-gray-600 mb-1">
            <span className="font-semibold">Editorial:</span> {libro.editorial}
          </p>
        )}
        {libro.apublicacion && (
          <p className="text-gray-600 mb-1">
            <span className="font-semibold">Año:</span> {libro.apublicacion}
          </p>
        )}
        {libro.categoria && (
          <p className="text-gray-600 mb-1">
            <span className="font-semibold">Categoría:</span> {libro.categoria}
          </p>
        )}
        {libro.sede && (
          <p className="text-gray-600 mb-3">
            <span className="font-semibold">Sede:</span> {libro.sede}
          </p>
        )}

        <div className="flex space-x-2 mt-4">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onEdit(libro.id)}
          >
            Editar
          </Button>
          <Button variant="danger" size="sm" onClick={() => onDelete(libro.id)}>
            Eliminar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LibroCard;
