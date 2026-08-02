import Slider from "./components/Slider";
import Testimonios from "./components/Testimonios";
import Bienvenida from "./components/Bienvenida";
import Destacados from "./components/Destacados/Destacados";

export default function Home() {
  return (
    <>
      <Slider />
      <Destacados />
      <Testimonios />
      <Bienvenida />
    </>
  );
}
