"use client";
 
import { useEffect, useMemo, useState } from "react";
import styles from "./Tienda.module.css";
 
// --- Tipos que vienen de https://fakestoreapi.com/products ---
interface Producto {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}
 
const PRODUCTOS_POR_PAGINA = 12;
const CATEGORIA_TODAS = "todas";
 
// Formateador de precio (la API entrega los precios en USD)
const formatearPrecio = (precio: number) =>
  new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(precio);
 
export default function Tienda() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [categorias, setCategorias] = useState<string[]>([]);
  const [categoriaActiva, setCategoriaActiva] = useState<string>(CATEGORIA_TODAS);
  const [paginaActual, setPaginaActual] = useState(1);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);
 
  // Trae categorías una sola vez
  useEffect(() => {
    const obtenerCategorias = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products/categories");
        if (!res.ok) throw new Error("No se pudieron cargar las categorías");
        const data: string[] = await res.json();
        setCategorias(data);
      } catch (err) {
        console.error(err);
      }
    };
 
    obtenerCategorias();
  }, []);
 
  // Trae productos cada vez que cambia la categoría seleccionada
  useEffect(() => {
    const obtenerProductos = async () => {
      setCargando(true);
      setError(null);
 
      const url =
        categoriaActiva === CATEGORIA_TODAS
          ? "https://fakestoreapi.com/products"
          : `https://fakestoreapi.com/products/category/${encodeURIComponent(
              categoriaActiva
            )}`;
 
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error("No se pudieron cargar los productos");
        const data: Producto[] = await res.json();
        setProductos(data);
        setPaginaActual(1); // resetea la paginación al cambiar de categoría
      } catch (err) {
        setError("Ocurrió un error al cargar los productos. Intenta nuevamente.");
        console.error(err);
      } finally {
        setCargando(false);
      }
    };
 
    obtenerProductos();
  }, [categoriaActiva]);
 
  const totalPaginas = Math.max(
    1,
    Math.ceil(productos.length / PRODUCTOS_POR_PAGINA)
  );
 
  const productosPagina = useMemo(() => {
    const inicio = (paginaActual - 1) * PRODUCTOS_POR_PAGINA;
    return productos.slice(inicio, inicio + PRODUCTOS_POR_PAGINA);
  }, [productos, paginaActual]);
 
  const handleComprar = (producto: Producto) => {
    // TODO: conectar con el carrito de compras
    console.log("Agregar al carrito:", producto.title);
  };
 
  return (
    <section className={styles.tienda}>
      <div className={styles.encabezado}>
        <h2 className={styles.titulo}>Nuestros Productos</h2>
        <p className={styles.subtitulo}>
          Explora nuestro catálogo y encuentra lo que estás buscando.
        </p>
      </div>
 
      <div className={styles.filtros}>
        <button
          className={`${styles.filtroBtn} ${
            categoriaActiva === CATEGORIA_TODAS ? styles.filtroActivo : ""
          }`}
          onClick={() => setCategoriaActiva(CATEGORIA_TODAS)}
        >
          Todas
        </button>
 
        {categorias.map((categoria) => (
          <button
            key={categoria}
            className={`${styles.filtroBtn} ${
              categoriaActiva === categoria ? styles.filtroActivo : ""
            }`}
            onClick={() => setCategoriaActiva(categoria)}
          >
            {categoria}
          </button>
        ))}
      </div>
 
      {error && <p className={styles.error}>{error}</p>}
 
      {cargando ? (
        <div className={styles.grid}>
          {Array.from({ length: PRODUCTOS_POR_PAGINA }).map((_, i) => (
            <div key={i} className={`${styles.card} ${styles.cardSkeleton}`}>
              <div className={styles.imagenSkeleton} />
              <div className={styles.textoSkeletonLinea} />
              <div className={styles.textoSkeletonLinea} />
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.grid}>
          {productosPagina.map((producto) => (
            <article key={producto.id} className={styles.card}>
              <div className={styles.imagenContenedor}>
                <img
                  src={producto.image}
                  alt={producto.title}
                  className={styles.imagen}
                  loading="lazy"
                />
              </div>
              <h3 className={styles.nombreProducto}>{producto.title}</h3>
              <p className={styles.precio}>{formatearPrecio(producto.price)}</p>
              <button
                className={styles.comprarBtn}
                onClick={() => handleComprar(producto)}
              >
                Comprar
              </button>
            </article>
          ))}
        </div>
      )}
 
      {!cargando && totalPaginas > 1 && (
        <div className={styles.paginacion}>
          {Array.from({ length: totalPaginas }).map((_, i) => {
            const numeroPagina = i + 1;
            return (
              <button
                key={numeroPagina}
                className={`${styles.puntoPagina} ${
                  paginaActual === numeroPagina ? styles.puntoActivo : ""
                }`}
                onClick={() => setPaginaActual(numeroPagina)}
                aria-label={`Ir a la página ${numeroPagina}`}
              />
            );
          })}
        </div>
      )}
    </section>
  );
}