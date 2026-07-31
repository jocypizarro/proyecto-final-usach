"use client";

import { useState } from 'react'
import Link from "next/link";

function Menu() {
    const [menuAbierto, setMenuAbierto] = useState(false)

    const alternarMenu = () => {
    setMenuAbierto((estadoAnterior) => !estadoAnterior)
    }

    const cerrarMenu = () => {
    setMenuAbierto(false)
    }

    return (
    <header className="menu">
        <nav className="menu__contenedor">
        <Link className="menu__logo" href="/">
            <img className="menu__logo-imagen" src="../assets/logo_black.png" alt="Logo Tienda" />
        </Link>

        <button
            className={`menu__boton ${menuAbierto ? 'menu__boton--activo' : ''}`}
            type="button"
            onClick={alternarMenu}
            aria-label="Abrir o cerrar menú"
            aria-expanded={menuAbierto}
            aria-controls="menu-principal"
        >
            <span className="menu__linea"></span>
            <span className="menu__linea"></span>
            <span className="menu__linea"></span>
        </button>

        <ul
            id="menu-principal"
            className={`menu__lista ${menuAbierto ? 'menu__lista--abierta' : ''}`}
        >
            <li className="menu__item">
            <Link className="menu__enlace" href="/" onClick={cerrarMenu}>
                HOME
            </Link>
            </li>

            <li className="menu__item">
            <Link className="menu__enlace" href="/about" onClick={cerrarMenu}>
                QUIÉNES SOMOS
            </Link>
            </li>

            <li className="menu__item">
            <Link className="menu__enlace" href="/tienda">
                TIENDA
            </Link>
            </li>

            <li className="menu__item">
            <Link className="menu__enlace" href="#" onClick={cerrarMenu}>
                CONTACTO
            </Link>
            </li>
{/*
            <li className="menu__item">
            <Link className="menu__enlace" href="/explorar">
                Explorar/Borrar
            </Link>
            </li> -
*/}
        </ul>
        </nav>
    </header>
    )
}

export default Menu