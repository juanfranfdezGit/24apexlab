import { useUI } from "context/UIContext";
import Circuit from "./views/circuit/circuit";
import Menu from "./views/menu/menu";
import "./styles/styles.css"

export default function App() {

  const { started } = useUI();

  return (
    <>
      {started ? (
        <section>
          <Circuit />
        </section>
      ) : (
        <Menu />
      )}
    </>
  );
}
