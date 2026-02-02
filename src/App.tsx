import { useUI } from "context/UIContext";
import Game from "./views/game/game";
import Menu from "./views/menu/menu";
import "./styles/styles.css"

export default function App() {

  const { started } = useUI();

  return (
    <>
      {started ? (
        <section>
          <Game />
        </section>
      ) : (
        <Menu />
      )}
    </>
  );
}
