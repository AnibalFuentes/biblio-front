import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-white rounded-lg shadow-lg p-8 text-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        Sistema de Gestión de Libros
      </h1>
      <p className="text-xl text-gray-600 mb-8">
        Administra tu biblioteca de manera fácil y eficiente
      </p>
      <div className="space-x-4">
        <Link
          href="/libros"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Ver Libros
        </Link>
        <Link
          href="/libros/nuevo"
          className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
        >
          Agregar Libro
        </Link>
      </div>
    </div>
  );
}
