import { useUI } from "context/UIContext"

export default function Game() {
    const { selectedCircuit, selectedCar } = useUI();

    return (
        <>
            <div>
                <img src={selectedCircuit?.img || "/assets/404.png"} alt={selectedCircuit?.name || "Circuito no disponible"} />
            </div>
            <div>
                <img src={selectedCar?.img || "/assets/404.png"} alt={selectedCar?.name || "Coche no disponible"} />
            </div>
        </>
    )
}