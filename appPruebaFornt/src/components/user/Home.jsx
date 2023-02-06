import { useEffect, useState } from "react";
import { getCitasDisponiblesUser } from "../../../api/axiosStore";
import ListCitas from "./ListCitas";

export const Home = () => {
  const [datosCitasDisponible, setDatosCitasDisponible] = useState([]);
  console.log(datosCitasDisponible);
  const obtenerCitasDispoonible = async () => {
    setDatosCitasDisponible([]);
    const datos = await getCitasDisponiblesUser();
    console.log(datos);
    setDatosCitasDisponible(datos.data.citasDisponibles);
  };
  useEffect(() => {
    obtenerCitasDispoonible();
  }, []);
  return (
    <>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1>CITAS</h1>
      </div>
      <table
        style={{
          width: "100%",
          height: "auto",
        }}
      >
        <thead style={{ width: "100%" }}>
          <tr
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <th className="thListaConteo">#</th>
            <th className="thLista">FECHA</th>
            <th className="thLista">HORA INICIO</th>
            <th className="thLista">HORA FINAL</th>
            <th className="thLista">DURACION</th>
            <th className="thLista">MEDICO</th>
            <th className="thListaEstado">ESTADO</th>
            <th className="thListaAccione">ACCIONES</th>
          </tr>
        </thead>
        <tbody>
          {datosCitasDisponible.map((citas, i) => (
            <ListCitas citas={citas} key={citas.id} i={i} />
          ))}
        </tbody>
      </table>
    </>
  );
};
