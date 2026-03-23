"use client";

import React, { useState, useEffect } from "react";
import Input from "@/components/UI/Input";
import Button from "@/components/UI/Button";
import { Libro, LibroCreate } from "@/types/libro";

interface LibroFormProps {
  initialData?: Libro | null;
  onSubmit: (data: LibroCreate) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

const LibroForm: React.FC<LibroFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  isLoading = false,
}) => {
  const [formData, setFormData] = useState<LibroCreate>({
    titulo: "",
    autor: "",
    apublicacion: "",
    editorial: "",
    categoria: "",
    sede: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        titulo: initialData.titulo,
        autor: initialData.autor,
        apublicacion: initialData.apublicacion || "",
        editorial: initialData.editorial || "",
        categoria: initialData.categoria || "",
        sede: initialData.sede || "",
      });
    }
  }, [initialData]);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.titulo.trim()) {
      newErrors.titulo = "El título es obligatorio";
    }

    if (!formData.autor.trim()) {
      newErrors.autor = "El autor es obligatorio";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    await onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Limpiar error del campo cuando se modifica
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Título"
        name="titulo"
        value={formData.titulo}
        onChange={handleChange}
        error={errors.titulo}
        required
      />

      <Input
        label="Autor"
        name="autor"
        value={formData.autor}
        onChange={handleChange}
        error={errors.autor}
        required
      />

      <Input
        label="Año de publicación"
        name="apublicacion"
        value={formData.apublicacion}
        onChange={handleChange}
        placeholder="Ej: 2024"
      />

      <Input
        label="Editorial"
        name="editorial"
        value={formData.editorial}
        onChange={handleChange}
      />

      <Input
        label="Categoría"
        name="categoria"
        value={formData.categoria}
        onChange={handleChange}
        placeholder="Ej: Novela, Ciencia, Historia"
      />

      <Input
        label="Sede"
        name="sede"
        value={formData.sede}
        onChange={handleChange}
        placeholder="Ej: Biblioteca Central"
      />

      <div className="flex space-x-3 pt-4">
        <Button type="submit" variant="primary" isLoading={isLoading}>
          {initialData ? "Actualizar" : "Crear"} Libro
        </Button>
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          disabled={isLoading}
        >
          Cancelar
        </Button>
      </div>
    </form>
  );
};

export default LibroForm;
