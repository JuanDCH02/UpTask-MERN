import { useState } from "react";

export default function NavMenu() {
    const [open, setOpen] = useState(false);

    return (
    <div className="relative">
        {/* Botón hamburguesa */}
        <button
            className="bg-purple-500 cursor-pointer flex flex-col justify-center items-center w-10 h-10 rounded focus:outline-none group"
            onClick={() => setOpen(!open)}
            aria-label="Abrir menú">
            <span
                className={`block h-1 w-8 bg-white rounded transition-all duration-300 ${
                open ? "rotate-45 translate-y-2" : ""
                }`}
            />
            <span
                className={`block h-1 w-8 bg-white rounded transition-all duration-300 my-1 ${
                open ? "opacity-0" : ""
                }`}
            />
            <span
                className={`block h-1 w-8 bg-white rounded transition-all duration-300 ${
                open ? "-rotate-45 -translate-y-2" : ""
                }`}
            />
        </button>

        {/* Menú desplegable */}
        <div
            className={`absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 z-50
            ${
              open
                ? "opacity-100 scale-100 translate-y-0"
                : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
            }
            sm:w-60 w-screen rounded-none sm:rounded-lg  left-1/2 -translate-x-1/2 sm:translate-x--5
            `}
        >
            <div className="p-4 border-b">
                <p className="text-gray-700 font-semibold">¡Hola, Usuario!</p>
            </div>
            <ul className="text-center">
                <li className="px-4 py-2 hover:bg-purple-100 cursor-pointer transition-colors">
                    Elemento 1
                </li>
                <li className="px-4 py-2 hover:bg-purple-100 cursor-pointer transition-colors">
                    Elemento 2
                </li>
                <li className="px-4 py-2 hover:bg-purple-100 cursor-pointer transition-colors">
                    Elemento 3
                </li>
            </ul>
        </div>
    </div>
)}
