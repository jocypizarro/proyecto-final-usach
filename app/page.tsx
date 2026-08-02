import Slider from "./components/Slider";
import Bienvenida from "./components/Bienvenida";
import Destacados from "./components/Destacados/Destacados";

export default function Home() {
  return (
    <>
      <Slider />
      <Destacados />
      <Bienvenida />
    </>
  );
}
