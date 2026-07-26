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
        <a className="menu__logo" href="#">
          <img className="menu__logo-imagen" src="/assets/wabi-white.png" alt="Logo Wabi" />
        </a>

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
            <a className="menu__enlace" href="#" onClick={cerrarMenu}>
              Inicio
            </a>
          </li>

          <li className="menu__item">
            <a className="menu__enlace" href="#" onClick={cerrarMenu}>
              About
            </a>
          </li>

          <li className="menu__item">
            <a className="menu__enlace" href="#" onClick={cerrarMenu}>
              Servicios
            </a>
          </li>

          <li className="menu__item">
            <a className="menu__enlace" href="#" onClick={cerrarMenu}>
              Portafolio
            </a>
          </li>

          <li className="menu__item">
            <a className="menu__enlace" href="#" onClick={cerrarMenu}>
              Blog
            </a>
          </li>

          <li className="menu__item">
            <a className="menu__enlace" href="#" onClick={cerrarMenu}>
              Contacto
            </a>
          </li>

          <li className="menu__item">
            <Link className="menu__enlace" href="/explorar">
              Explorar
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Menu