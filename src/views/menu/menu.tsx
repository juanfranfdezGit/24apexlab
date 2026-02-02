import cars from "../../datas/cars.json";
import circuits from "../../datas/circuits.json";

export default function Menu() {
  return (
    <section>
      <img src="/assets/logo.png" alt="logo" />
      <h1></h1>
      <div>
        <h2>Elige Coche</h2>
        {cars.map((car) => (
          <div key={car.id}>
            <h3>{car.name}</h3>
            <img src={car.img} alt={car.name} />
          </div>
        ))}
      </div>
      <div>
        <h2>Elige Circuito</h2>
        <div>
          {circuits.map((circuit) => (
            <div key={circuit.id}>
              <h3>{circuit.name}</h3>
              <img src={circuit.img} alt={circuit.name} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
