import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white shadow-lg mt-auto">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <p className="text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} Sistema de Gestión de Libros. Todos los
          derechos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
